import pymongo
import json

from flask import jsonify

client = pymongo.MongoClient("mongodb+srv://main_admin:kjId5C2ivGpTYyVB@cluster0.9dlxa.mongodb.net/triqui?retryWrites=true&w=majority")
db = client.triqui


def saveGames(game):
    print(game)
    column = db["GAME_HISTORIC"]
    column.insert_one(game)

def getGames():
    gamesIter = db["GAME_HISTORIC"].find()
    games = []
    for game in gamesIter:
        games.append(game['game'])
    return games