from flask import Flask
from flask_cors import CORS
from router import Router

app = Flask(__name__)
CORS(app)
router = Router(app)

#app.run(host = '0.0.0.0',port=5005)
app.run(debug=True)
