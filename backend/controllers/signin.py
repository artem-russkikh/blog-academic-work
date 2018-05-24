from flask_restful import request, Resource
from flask import jsonify
from api_helper import Response, not_impemented

class SignIn(Resource):
    def post(self):
        email = request.form['email']
        password = request.form['password']
        return jsonify(not_impemented)
