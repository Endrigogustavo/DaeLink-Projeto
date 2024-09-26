import os
from flask import Flask, request, jsonify
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, firestore

app = Flask(__name__)
CORS(app)

# Configurar o Firebase
cred_path = os.path.join(os.path.dirname(__file__), 'Database/FirebaseDaeLink.json')

if not os.path.exists(cred_path):
    print("Arquivo de credenciais não encontrado. Verifique o caminho.")
else:
    print("Arquivo de credenciais encontrado.")


cred = credentials.Certificate(cred_path)
firebase_admin.initialize_app(cred)

db = firestore.client()

collection_name = 'PCD'


collections = db.collections()
collection_exists = any(collection.id == collection_name for collection in collections)

if collection_exists:
    # Recupera todos os documentos da coleção
    docs = db.collection(collection_name).get()

    # Itera sobre os documentos e imprime os dados
    for doc in docs:
        print(f'{doc.id} => {doc.to_dict()}')
else:
    print(f'A coleção "{collection_name}" não foi encontrada.')
    
    
def get_jobs_from_firestore():
    jobs_ref = db.collection('PCD')
    docs = jobs_ref.stream()
    jobs = []
    for doc in docs:
        job = doc.to_dict()
        job['id'] = doc.id  
        jobs.append(job)
    return jobs

jobs = get_jobs_from_firestore()

for job in jobs:
    if 'descrição' not in job:
        print(f"Documento sem 'descrição': {job}")
    else:
        print(f"Descrição encontrada")
        
descriptions = [job['descrição'] for job in jobs]
tfidf = TfidfVectorizer().fit_transform(descriptions)

# Função para encontrar o índice do trabalho pelo título
def find_job_index_by_title(description):
    for index, job in enumerate(jobs):
        if job.get('descrição', '').lower() == description.lower():
            return index
    return None


def find_job_index_by_similar_description(description):
    # Crie uma lista com todas as descrições de trabalho
    job_descriptions = [job.get('descrição', '') for job in jobs]

    # Adicione a descrição recebida à lista (será usada como referência)
    job_descriptions.append(description)

    # Crie a matriz TF-IDF para todas as descrições
    tfidf_vectorizer = TfidfVectorizer()
    tfidf_matrix = tfidf_vectorizer.fit_transform(job_descriptions)

    # Calcule a similaridade cosseno entre a descrição recebida e todas as vagas
    cosine_similarities = linear_kernel(tfidf_matrix[-1:], tfidf_matrix[:-1]).flatten()

    # Encontre o índice da vaga mais similar
    most_similar_job_index = cosine_similarities.argmax()

    # Retorne o índice da vaga mais similar se a similaridade for suficiente
    if cosine_similarities[most_similar_job_index] > 0.1:  # Defina um limiar de similaridade
        return most_similar_job_index

    return None

# Rota para recomendação de vagas
@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.json
    job_title = data.get('descrição')
    print(f"Recebido título da vaga: {job_title}")

    job_index = find_job_index_by_similar_description(job_title)

    if job_index is None:
        return jsonify({"error": "Esta vaga não existe"}), 404

    # Calcular similaridades com base no TF-IDF
    cosine_similarities = linear_kernel(tfidf[job_index:job_index+1], tfidf).flatten()
    related_docs_indices = cosine_similarities.argsort()[:-20:-1]

    # Preparar recomendações
    recommendations = [jobs[i] for i in related_docs_indices if i != job_index]

    # Colocar a vaga solicitada no início das recomendações
    recommendations.insert(0, jobs[job_index]) 
    
    return jsonify(recommendations)


@app.route('/profile', methods=['POST'])
def recommend_profile():
    data = request.json
    job_id = data.get('id')
    print(f"Recebido título da vaga: {job_id}")

    job_index = next(index for (index, job) in enumerate(jobs) if job["id"] == job_id)

    # Calcular similaridades com base no TF-IDF
    cosine_similarities = linear_kernel(tfidf[job_index:job_index+1], tfidf).flatten()
    related_docs_indices = cosine_similarities.argsort()[:-5:-1]

    # Preparar recomendações
    recommendations = [jobs[i] for i in related_docs_indices if i != job_index]

     # Colocar a vaga solicitada no início das recomendações
    recommendations.insert(0, jobs[job_index]) 

    return jsonify(recommendations)

if __name__ == '__main__':
    app.run(debug=True)
