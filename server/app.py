from flask import Flask, jsonify, request
from flask_migrate import Migrate
from flask_cors import CORS
from extensions import db
from models import Session, MusicalIdea

app = Flask(__name__) # initialize Flask app instance and tell Flask where app is located
CORS(app) # enable CORS so React app can communicate with Flask app

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
        return jsonify({'error': 'Internal server Error'}), 500

# PATCH route to edit a session's notes

@app.patch('/sessions/<int:id>')
def edit_session_notes(id):
    data = request.json
    if data is None:
        return jsonify({'error': 'Invalid or missing JSON'}), 400
    
    session_to_update = Session.query.filter(Session.id == id).first()
    if session_to_update is None:
        return jsonify({'error': 'session not found'}), 404

    if "notes" not in data:
        return jsonify({'error': 'notes is required'}), 400

    try: 

        session_to_update.notes = data["notes"]
        db.session.commit()
        return jsonify(session_to_update.to_dict()), 200
    except Exception:
        app.logger.exception(f'PATCH /sessions/{id} failed')
        return jsonify({'error': 'Internal server error'}), 500
    
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
        return jsonify({'error': 'Internal server Error'}), 500

#GET route to retrieve musical ideas for a given session

@app.get('/sessions/<int:id>/ideas')
def retrieve_musical_ideas(id):
    session = Session.query.filter(Session.id == id).first()
    if session is None:
        return jsonify({'error': 'session not found '}), 404
    try:
        musical_ideas = MusicalIdea.query.filter(MusicalIdea.session_id == id).all()
        return jsonify([idea.to_dict() for idea in musical_ideas]), 200
    except Exception:
        app.logger.exception(f"GET /sessions/{id}/ideas failed")
        return jsonify({'error': 'Internal server error'}), 500

# POST route to create a musical idea:

@app.post('/sessions/<int:id>/ideas')
def create_musical_idea(id):
    data = request.json
    if data is None:
        return jsonify({'error': 'Invalid or missing JSON'}), 400

    session = Session.query.filter(Session.id == id).first()
    if session is None:
        return jsonify({'error': 'session not found'}), 404

    title = data.get('title')
    bpm = data.get('bpm')
    key = data.get('key')
    notes = data.get('notes')

    if not title:
        return jsonify({'error': 'title is required'}), 400
    try:
        musical_idea = MusicalIdea(title=title, bpm=bpm, key=key, notes=notes, session_id=id)
        db.session.add(musical_idea)
        db.session.commit()
        return jsonify(musical_idea.to_dict()), 201
    except Exception:
        app.logger.exception(f"POST /sessions/{id}/ideas failed")
        return jsonify({'error': 'Internal server error'}), 500

# DELETE route to delete a musical idea:

@app.delete('/ideas/<int:idea_id>')
def delete_musical_idea(idea_id):
    idea_to_delete = MusicalIdea.query.filter(MusicalIdea.id == idea_id).first()
    if idea_to_delete is None:
        return jsonify({'error': 'Idea not found'}), 404
    try:
        db.session.delete(idea_to_delete)
        db.session.commit()
        return "", 204
    except Exception:
        app.logger.exception(f"DELETE /ideas/{idea_id} failed")
        return jsonify({'error': 'Internal server Error'}), 500

if __name__ == '__main__':
    app.run(debug=True)