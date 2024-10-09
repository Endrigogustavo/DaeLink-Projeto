import os
from flask import Flask, request, jsonify
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, firestore
import logging

app = Flask(__name__)
CORS(app)

# Configuração de logging de erros
logging.basicConfig(filename='error.log', level=logging.ERROR)

# Configurar o Firebase
cred_path = os.path.join(os.path.dirname(__file__), 'Database/daelink-producao-firebase-adminsdk-y99vm-e1d8c6c010.json')

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

def combine_title_and_description(job):
    """Combina o título do trabalho e a descrição em um único campo de texto."""
    title = job.get('trabalho', '')  # Campo 'trabalho' que representa o título
    description = job.get('descrição', '')  # Campo 'descrição'
    return f"{title} {description}"

def find_job_index_by_similar_description_and_title(title, description, jobs, threshold=0.2):
    """Busca a vaga mais semelhante pela combinação do título e da descrição, com base em um limiar de similaridade."""

    # Se o título e a descrição estiverem vazios, retorna None
    if not title and not description:
        return None

    # Lista de combinações de título e descrição das vagas
    job_texts = [combine_title_and_description(job) for job in jobs]
    
    # Adiciona a combinação do título e descrição fornecidos à lista de textos
    combined_input = f"{title} {description}"
    job_texts.append(combined_input)

    # Cria a matriz TF-IDF
    tfidf_vectorizer = TfidfVectorizer()
    tfidf_matrix = tfidf_vectorizer.fit_transform(job_texts)

    # Calcula a similaridade cosseno entre a combinação fornecida e as vagas no banco
    cosine_similarities = linear_kernel(tfidf_matrix[-1:], tfidf_matrix[:-1]).flatten()

    # Encontra o índice da vaga mais similar
    most_similar_job_index = cosine_similarities.argmax()

    # Verifica se a similaridade excede o limiar configurado
    if cosine_similarities[most_similar_job_index] >= threshold:
        return most_similar_job_index, cosine_similarities[most_similar_job_index]  # Retorna índice e valor de similaridade

    return None, None

# Rota para recomendação de vagas
@app.route('/recommend', methods=['POST'])
def recommend():
    try:
        jobs = get_jobs_from_firestore()  # Obtem todas as vagas do Firestore
        data = request.json
        job_title = data.get('trabalho', '')  # O título da vaga
        job_description = data.get('trabalho', '')  # A descrição da vaga

        if not job_title and not job_description:
            return jsonify({"error": "Os campos 'trabalho' ou 'descrição' são necessários."}), 400

        print(f"Recebido título da vaga: {job_title}")
        print(f"Recebida descrição da vaga: {job_description}")

        # Busca por similaridade, com um limiar configurado
        job_index, similarity = find_job_index_by_similar_description_and_title(job_title, job_description, jobs, threshold=0.2)

        if job_index is None:
            return jsonify({"error": "Nenhuma vaga correspondente encontrada."}), 404  # Retorna erro 404 se não encontrar

        print(f"Vaga encontrada com similaridade: {similarity}")

        # Cria a matriz TF-IDF para as vagas
        job_texts = [combine_title_and_description(job) for job in jobs]
        tfidf_vectorizer = TfidfVectorizer()
        tfidf = tfidf_vectorizer.fit_transform(job_texts)

        cosine_similarities = linear_kernel(tfidf[job_index:job_index + 1], tfidf).flatten()
        related_docs_indices = cosine_similarities.argsort()[:-20:-1]

        recommendations = [jobs[i] for i in related_docs_indices if i != job_index]
        recommendations.insert(0, jobs[job_index])  # Coloca a vaga encontrada no início da lista

        return jsonify(recommendations)

    except Exception as e:
        logging.error(f"Error in /recommend route: {e}")
        return jsonify({"error": "Ocorreu um erro ao recomendar vagas."}), 500

# Rota para recomendação de perfil de vaga
@app.route('/profile', methods=['POST'])
def recommend_profile():
    try:
        jobs = get_jobs_from_firestore()  # Obtem todas as vagas do Firestore
        data = request.json
        job_id = data.get('id')

        if job_id is None:
            return jsonify({"error": "O campo 'id' é necessário."}), 400

        print(f"Recebido ID da vaga: {job_id}")

        # Procura o índice da vaga com o ID fornecido
        job_index = next((index for (index, job) in enumerate(jobs) if job["id"] == job_id), None)

        if job_index is None:
            return jsonify({"error": "Nenhuma vaga encontrada com o ID fornecido."}), 404  # Retorna erro 404 se não encontrar

        job_texts = [combine_title_and_description(job) for job in jobs]
        tfidf_vectorizer = TfidfVectorizer()
        tfidf = tfidf_vectorizer.fit_transform(job_texts)

        cosine_similarities = linear_kernel(tfidf[job_index:job_index + 1], tfidf).flatten()
        related_docs_indices = cosine_similarities.argsort()[:-5:-1]

        recommendations = [jobs[i] for i in related_docs_indices if i != job_index]
        recommendations.insert(0, jobs[job_index])  # Coloca a vaga encontrada no início da lista

        return jsonify(recommendations)

    except Exception as e:
        logging.error(f"Error in /profile route: {e}")
        return jsonify({"error": "Ocorreu um erro ao obter perfil da vaga."}), 500

# Tratamento global de erros
@app.errorhandler(Exception)
def handle_exception(e):
    logging.error(f"Unhandled error: {e}")
    return jsonify({"error": "Ocorreu um erro inesperado. Verifique os logs."}), 500

if __name__ == '__main__':
    app.run(debug=True)
