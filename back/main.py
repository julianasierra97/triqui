import json

from flask import Flask, jsonify, request
import logging
from flask_cors import CORS, cross_origin
from db_connection import saveGames, getGames

app = Flask(__name__)
CORS(app, resources = {r"/*": {"origins":"*"}})

@app.route('/game', methods = ['POST'])
def post_game():
    saveGames(json.loads(request.data))
    response = jsonify(request.data)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@app.route('/games', methods = ['GET'])
def get_games():
    games = {"games":getGames()}
    response = jsonify(games)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response
