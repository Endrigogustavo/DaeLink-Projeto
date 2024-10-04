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
cred_path = os.path.join(os.path.dirname(__file__), 'Database/daelink-projeto-firebase-adminsdk-knxeu-2c9cee419b.json')

if not os.path.exists(cred_path):
    print("Arquivo de credenciais não encontrado. Verifique o caminho.")
else:
    print("Arquivo de credenciais encontrado.")

cred = credentials.Certificate(cred_path)
firebase_admin.initialize_app(cred)

db = firestore.client()

collection_name = 'PCD'

def get_jobs_from_firestore():
    jobs_ref = db.collection(collection_name)
    docs = jobs_ref.stream()
    jobs = []
    for doc in docs:
        job = doc.to_dict()
        job['id'] = doc.id  
        jobs.append(job)
    return jobs

def find_job_index_by_similar_description(description, jobs):
    # Verificação se a descrição fornecida é válida
    if not description:
        return None

    # Crie uma lista com todas as descrições de trabalho
    job_descriptions = [job.get('descrição', '') for job in jobs]
    
    # Adicione a descrição recebida à lista
    job_descriptions.append(description)

    # Crie a matriz TF-IDF
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
    jobs = get_jobs_from_firestore()  # Chama a função aqui para obter os dados mais recentes
    data = request.json
    job_title = data.get('trabalho')

    if job_title is None:
        return jsonify({"error": "O campo 'trabalho' é necessário."}), 400

    print(f"Recebido título da vaga: {job_title}")

    job_index = find_job_index_by_similar_description(job_title, jobs)  # Passa 'jobs' como argumento

    if job_index is None:
        return jsonify({"error": "Nenhuma vaga correspondente encontrada."}), 404

    # Crie a matriz TF-IDF para as vagas
    job_descriptions = [job.get('descrição', '') for job in jobs]
    tfidf_vectorizer = TfidfVectorizer()
    tfidf = tfidf_vectorizer.fit_transform(job_descriptions)

    cosine_similarities = linear_kernel(tfidf[job_index:job_index + 1], tfidf).flatten()
    related_docs_indices = cosine_similarities.argsort()[:-20:-1]

    recommendations = [jobs[i] for i in related_docs_indices if i != job_index]
    recommendations.insert(0, jobs[job_index])  # Colocar a vaga solicitada no início

    return jsonify(recommendations)

@app.route('/profile', methods=['POST'])
def recommend_profile():
    jobs = get_jobs_from_firestore()  # Chama a função aqui para obter os dados mais recentes
    data = request.json
    job_id = data.get('id')

    print(f"Recebido ID da vaga: {job_id}")

    job_index = next((index for (index, job) in enumerate(jobs) if job["id"] == job_id), None)

    if job_index is None:
        return jsonify({"error": "Nenhuma vaga encontrada com o ID fornecido."}), 404

    cosine_similarities = linear_kernel(tfidf[job_index:job_index + 1], tfidf).flatten()
    related_docs_indices = cosine_similarities.argsort()[:-5:-1]

    recommendations = [jobs[i] for i in related_docs_indices if i != job_index]
    recommendations.insert(0, jobs[job_index])  # Colocar a vaga solicitada no início

    return jsonify(recommendations)

if __name__ == '__main__':
    app.run(debug=True)
