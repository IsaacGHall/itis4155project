import random
import requests
from bs4 import BeautifulSoup

a = random.randint(1, 50)
b = random.randint(1, 20)
s = ""

if a == 1:
    req = requests.get("https://books.toscrape.com/")
else:
    req = requests.get(f"https://books.toscrape.com/catalogue/page-{a}.html")
soup = BeautifulSoup(req.content, "html.parser")

for b in soup.findAll('a', href=True, title=True):
    s = "null"
b = str(b).split('"')

req2 = requests.get(f"https://books.toscrape.com/catalogue/{b[1]}")
soup2 = BeautifulSoup(req.content, "html.parser")

print(f"https://books.toscrape.com/catalogue/{b[1]}")
#print(soup2.prettify())


