from flask_restful import request, Resource
from flask import jsonify
from flask import abort
from api_helper import Response, not_impemented

from models.user import register_user

class SignUp(Resource):
    def post(self):
        email = request.form['email']
        name = request.form['name']
        password = request.form['password']
        password2 = request.form['password2']

        if password != password2:
            abort(400)

        resp = register_user(email, name, password)

        if resp['error']['code'] != 0:
            abort(400)

        return jsonify(resp)
