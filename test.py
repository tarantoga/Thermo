import urllib

url = 'http://localhost:1337/sample/create'
params = urllib.urlencode({
	'device': 'AA',
	'value': 13.12,
})
data = urllib.urlopen(url, params).read()