from flask_restful import request, Resource
from flask import jsonify
from flask import abort
from api_helper import Response, not_impemented
from models.user import login_user

class SignIn(Resource):
    def post(self):
        email = request.form['email']
        password = request.form['password']

        resp = login_user(email, password)

        if resp['error']['code'] != 0:
            abort(400)

        return jsonify(resp)
