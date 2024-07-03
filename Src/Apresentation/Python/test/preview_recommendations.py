import requests
import json

def get_recommendations(job_title):
    url = 'http://localhost:5000/recommend'  # URL do seu endpoint Flask
    payload = {'job_title': job_title}
    headers = {'Content-Type': 'application/json'}

    response = requests.post(url, data=json.dumps(payload), headers=headers)

    if response.status_code == 200:
        recommendations = response.json()
        print(f"Recomendações para o Job Title {job_title}:\n")
        for rec in recommendations:
            print(f"ID: {rec['id']}")
            print(f"Título: {rec['title']}")
            print(f"Descrição: {rec['description']}\n")
    else:
        print(f"Erro: {response.status_code}")

if __name__ == '__main__':
    # Exemplo de uso
    job_title = "Digital Marketing Specialist"  # Substitua pelo nome da vaga que deseja consultar
    get_recommendations(job_title)
