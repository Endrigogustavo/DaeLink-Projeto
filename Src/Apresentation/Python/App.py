from flask import Flask, request, jsonify
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

jobs = [
    {"id": 1, "title": "Software Engineer", "description": "Develop software applications using Java and Python."},
    {"id": 2, "title": "Data Scientist", "description": "Analyze data to gain insights and build predictive models."},
    {"id": 3, "title": "Web Developer", "description": "Create and maintain websites using HTML, CSS, and JavaScript."},
    {"id": 4, "title": "System Administrator", "description": "Manage and maintain computer systems and networks."},
    {"id": 5, "title": "DevOps Engineer", "description": "Implement and manage CI/CD pipelines and cloud infrastructure."},
    {"id": 6, "title": "Mobile Developer", "description": "Develop mobile applications for Android and iOS platforms."},
    {"id": 7, "title": "Product Manager", "description": "Define product strategy and oversee product development lifecycle."},
    {"id": 8, "title": "UX/UI Designer", "description": "Design user interfaces and enhance user experience."},
    {"id": 9, "title": "QA Engineer", "description": "Test software applications to ensure quality and functionality."},
    {"id": 10, "title": "Business Analyst", "description": "Analyze business processes and recommend improvements."},
    {"id": 11, "title": "Network Engineer", "description": "Design and implement network solutions and troubleshoot issues."},
    {"id": 12, "title": "Cyber Security Specialist", "description": "Protect systems and networks from cyber threats."},
    {"id": 13, "title": "Database Administrator", "description": "Manage and maintain database systems and ensure data integrity."},
    {"id": 14, "title": "AI Researcher", "description": "Conduct research on artificial intelligence and machine learning algorithms."},
    {"id": 15, "title": "Cloud Architect", "description": "Design and implement cloud-based solutions and services."},
    {"id": 16, "title": "IT Support Specialist", "description": "Provide technical support and troubleshoot IT issues."},
    {"id": 17, "title": "Data Analyst", "description": "Analyze data sets to identify trends and insights."},
    {"id": 18, "title": "Frontend Developer", "description": "Develop user-facing features for web applications."},
    {"id": 19, "title": "Backend Developer", "description": "Develop server-side logic and integrate with front-end components."},
    {"id": 20, "title": "IT Project Manager", "description": "Manage IT projects and coordinate with cross-functional teams."},
    {"id": 21, "title": "Blockchain Developer", "description": "Develop blockchain applications and smart contracts."},
    {"id": 22, "title": "Game Developer", "description": "Design and develop video games for various platforms."},
    {"id": 23, "title": "Technical Writer", "description": "Create technical documentation and user guides."},
    {"id": 24, "title": "IT Consultant", "description": "Provide expert advice on IT solutions and strategies."},
    {"id": 25, "title": "Network Administrator", "description": "Maintain and monitor network infrastructure."},
    {"id": 26, "title": "Software Architect", "description": "Design software architecture and high-level solutions."},
    {"id": 27, "title": "Big Data Engineer", "description": "Build and maintain big data pipelines and processing systems."},
    {"id": 28, "title": "Machine Learning Engineer", "description": "Develop and deploy machine learning models."},
    {"id": 29, "title": "IT Auditor", "description": "Conduct audits of IT systems and ensure compliance with regulations."},
    {"id": 30, "title": "Technical Support Engineer", "description": "Provide technical support to customers and resolve issues."},
    {"id": 31, "title": "Full Stack Developer", "description": "Develop both frontend and backend components of web applications."},
    {"id": 32, "title": "DevSecOps Engineer", "description": "Integrate security practices into DevOps processes."},
    {"id": 33, "title": "Scrum Master", "description": "Facilitate Scrum processes and help the team achieve their goals."},
    {"id": 34, "title": "SEO Specialist", "description": "Optimize websites for search engines to improve ranking."},
    {"id": 35, "title": "Digital Marketing Specialist", "description": "Plan and execute digital marketing campaigns."},
    {"id": 36, "title": "IT Operations Manager", "description": "Oversee IT operations and ensure smooth functioning of IT systems."},
    {"id": 37, "title": "Site Reliability Engineer", "description": "Ensure the reliability and availability of critical systems."},
    {"id": 38, "title": "Data Engineer", "description": "Build and maintain data infrastructure and ETL processes."},
    {"id": 39, "title": "Information Security Analyst", "description": "Monitor and protect information systems from security breaches."},
    {"id": 40, "title": "Robotics Engineer", "description": "Design and develop robotic systems and applications."},
    {"id": 41, "title": "Digital Marketing Specialist", "description": "Plan and execute digital marketing campaigns."},
    {"id": 42, "title": "Digital Marketing Specialist", "description": "Plan and execute digital marketing campaigns."},
    {"id": 43, "title": "Digital Marketing Specialist", "description": "Plan and execute digital marketing campaigns."},
]

descriptions = [job['description'] for job in jobs]
tfidf = TfidfVectorizer().fit_transform(descriptions)

def find_job_index_by_title(title):
    for index, job in enumerate(jobs):
        if job['title'].lower() == title.lower():
            return index
    return None

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.json
    job_title = data.get('job_title')
    job_index = find_job_index_by_title(job_title)

    if job_index is None:
        return jsonify({"error": "Esta vaga não existe"}), 404

    cosine_similarities = linear_kernel(tfidf[job_index:job_index+1], tfidf).flatten()
    related_docs_indices = cosine_similarities.argsort()[:-20:-1]

    # Incluir a vaga pesquisada nas recomendações
    recommendations = [jobs[i] for i in related_docs_indices if i != job_index]
    recommendations.insert(0, jobs[job_index])  # Colocar a vaga pesquisada no início

    return jsonify(recommendations)

if __name__ == '__main__':
    app.run(debug=True)
