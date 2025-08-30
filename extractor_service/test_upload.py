import requests

with open(r"C:\Builder\cv_ay.pdf", "rb") as f:
    files = {"file": f}
    response = requests.post("http://localhost:8001/extract", files=files)
    print(response.text)