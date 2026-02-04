from flask import Flask, jsonify, request
from flask_migrate import Migrate
from flask_cors import CORS
from extensions import db
from models import Session, MusicalIdea

app = Flask(__name__) # initialize Flask app instance and tell Flask where app is located

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JSON_COMPACT"] = False 

db.init_app(app) 

migrate = Migrate(app, db)

@app.route('/')
def home():
    return "Server run success."

<<<<<<< HEAD
# GET route to return all sessions

@app.get('/sessions')
def retrieve_sessions():
    try:
        sessions = Session.query.all()
        return jsonify([session.to_dict() for session in sessions]), 200
    except Exception as exception:
        app.logger.exception("GET /sessions failed")
        return jsonify({"error": str(exception)}), 500


=======
>>>>>>> origin/main
if __name__ == '__main__':
    app.run(debug=True)