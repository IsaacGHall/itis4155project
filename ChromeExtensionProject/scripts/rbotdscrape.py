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

b[1] = b[1].replace("catalogue/", "")

print(f"https://books.toscrape.com/catalogue/{b[1]}")

img = soup2.find_all("img", src=True)
a=[]
for i in img:
    a = i
i = str(i).split("\"")
cover = i[-2]
cover = cover.replace("..", "https://books.toscrape.com")
print(cover)

title = i[1]
print(title)

#######TO DO

# display book cover

genre = soup2.find('li', href="category/books/../index.html")
print(f"Genre: {genre}")


print("\nSummary")
summary = soup2.findAll("div=content_inner")
print(str(summary))


