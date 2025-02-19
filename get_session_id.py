import requests

# URL endpoint API a token
url = "https://api.robocoders.ai/create-session"
token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1MTEwNTAzYy1hNjA3LTQ4M2EtOThjOC00OGIzNmE0MjQ3MGMiLCJleHAiOjE3NjMzMDI1MDJ9.dDyrsMLGC8ZY_zUjAz-YS9nTFRDCg8fuh2HBCc95FL0"

# Nastavení hlaviček
headers = {
    "Authorization": f"Bearer {token}"
}

# Odeslání GET požadavku
response = requests.get(url, headers=headers)

# Kontrola odpovědi
if response.status_code == 200:
    print("Session úspěšně vytvořena!")
    print(response.json())  # Výpis JSON odpovědi
else:
    print(f"Chyba při vytváření session: {response.status_code}")
    print(response.text)
