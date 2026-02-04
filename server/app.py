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

# GET route to return all sessions

@app.get('/sessions')
def retrieve_sessions():
    try:
        sessions = Session.query.all()
        return jsonify([session.to_dict() for session in sessions]), 200
    except Exception:
        app.logger.exception("GET /sessions failed")
        return jsonify({"error": 'Internal server error'}), 500

# GET route to return a specific session, by id

@app.get('/sessions/<int:id>')
def retrieve_session(id):
    session = Session.query.filter(Session.id == id).first()
    if session is None:
        return jsonify({'error': 'session with that ID not found'}), 404
    try:
        return jsonify(session.to_dict()), 200
    except Exception:
        app.logger.exception(f'GET /sessions/{id} failed')
        return jsonify({'error': 'Internal server error'}), 500

# POST route to create a session:

@app.post('/sessions')
def create_session():
    data = request.json
    if data is None:
        return jsonify({'error': 'Error retreiving request'}), 400

    title = data.get("title")
    length = data.get("length")
    notes = data.get("notes")
    started_at = data.get("started_at")

    if not title or not started_at:
        return jsonify({'error': 'title and started_at are required fields'}), 400
    
    new_session = Session(title=title, length=length, notes=notes, started_at=started_at)

    try:
        db.session.add(new_session)
        db.session.commit()
        return jsonify(new_session.to_dict()), 201
    except Exception:
        app.logger.exception('POST /sessions Failed')
        return jsonify({'error': 'Internal Server Error'}), 500
    
# DELETE route to delete a session

@app.delete('/sessions/<int:id>')
def delete_session(id):
    session_to_delete = Session.query.filter(Session.id == id).first()
    if session_to_delete is None:
        return jsonify({'error': 'Session not found'}), 404
    try:
        db.session.delete(session_to_delete)
        db.session.commit()
        return "", 204
    except Exception:
        app.logger.exception(f"DELETE /sessions/{id} failed")
        return jsonify({'error': 'Internal Server Error'}), 500

if __name__ == '__main__':
    app.run(debug=True)