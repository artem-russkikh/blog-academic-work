from flask_restful import request, Resource
from api_helper import Response, not_impemented

class SignUp(Resource):
    def post(self):
        email = request.form['email']
        password = request.form['password']
        password2 = request.form['password2']
        return not_impemented