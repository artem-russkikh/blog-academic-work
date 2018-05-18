from flask_restful import request, Resource
from api_helper import Response, not_impemented

class SignIn(Resource):
    def post(self):
        email = request.form['email']
        password = request.form['password']
        return not_impemented