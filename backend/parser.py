from bs4 import BeautifulSoup
import requests
from lxml import html
import re

request = requests.get('https://news.ycombinator.com/')
html_text = request.text

linksRegexp = []

regexp_links = re.findall(r'(?i)<a([^>]+)>(.+?)</a>', html_text)

for regexp_link in regexp_links:
  if 'class="storylink"' in ''.join(regexp_link):
    linksRegexp.append({
      'text': regexp_link[1],
      'href': re.findall(r'(?i)href\s*=\s*("([^"]*")|\'[^\']*\'|([^\'">]+))', regexp_link[0])[0][0],
    })

print('REGEXP')
print(len(linksRegexp))
for story in linksRegexp:
  print(story['text'])
  print(story['href'])
  print('')

print('')
print('#' * 100)
print('')

soup = BeautifulSoup(html_text, 'html.parser')
linksDom = soup.select('a.storylink')

print('DOM')
print(len(linksDom))
for story in linksDom:
  print(story.text)
  print(story.attrs['href'])
  print('')

print('')
print('#' * 100)
print('')

tree = html.fromstring(html_text)
xpath = "//tr/td[@class='title'][2]/a[@class='storylink']"
linksXpath = tree.xpath(xpath)
print('XPATH')
print(len(linksXpath))
for story in linksXpath:
  print(story.text)
  print(story.get('href'))
  print('')
