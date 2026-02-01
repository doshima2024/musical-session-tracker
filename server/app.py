from flask import Flask
from flask_migrate import Migrate
from flask_cors import CORS
from extensions import db

app = Flask(__name__) # initialize Flask app instance and tell Flask where app is located

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JSON_COMPACT"] = False 

db.init_app(app) 

@app.route('/')
def home():
    return "Server run success."
    

if app.name == '__main__':
    app.run(debug=True)