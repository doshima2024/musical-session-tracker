from extensions import db
from flask_sqlalchemy import SQLAlchemy

class Session(db.Model):
    __tablename__ = 'sessions'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    length = db.Column(db.Integer)
    started_at = db.Column(db.String, nullable=False)

    musical_ideas = db.relationship("MusicalIdea", back_populates="session", cascade = "all, delete-orphan")
 
class MusicalIdea(db.Model):
    __tablename__="musical_ideas"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    bpm = db.Column(db.Integer)
    key = db.Column(db.String)
    notes = db.Column(db.Text)
    session_id = db.Column(db.Integer, db.ForeignKey('sessions.id'), nullable=False)

    session = db.relationship("Session", back_populates="musical_ideas")




