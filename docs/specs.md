MVP DEMO SCRIPT:

As a user, I can view all sessions on the sessions page (using React router) (READ)
As a user I can create a new session using the “create session” form on the sessions page, below the display of current sessions (CREATE)
As a user I can click a delete button next to a session’s title in order to remove it and associated musical ideas (DELETE)
As a user I can click on the session title and be re-routed to a session detail page that lists musical ideas
As a user I can add a musical idea from this session detail page
As a user I can see musical ideas listed from within this session detail pageAs a user I can delete musical ideas from within this session page
As a user I can edit session notes on the session detail page (UPDATE)

USER FLOWS:

View all sessions: visit home page

Create New Session: fill out pre-existing form (Title, Notes, Length in mins, Date etc) => press submit button (backend adds session to DB, FE refetches and displays updated map of sessions) = on submit, disable button - if error, show error.

Delete Session: press “delete” button next to session title (BE deletes session, FE refetches sessions and displays updated map of sessions)

View Session Detail Page (containing musical ideas for that session): Click on a session title => be re-routed to /sessions/i:d (react router handles routing to new FE page/route, FE fetches existing musical ideas, only for that session) - GET sessions/:id/ideas

Add musical idea on session detail page: Fill out pre-existing form (Title, BPM, Key, Notes etc …) => press submit button (BE adds musical idea to db in musical_ideas table, FE refetches and displays updated map of musical ideas) on submit, disable button - if error, show error.

Delete a musical idea: press “delete” button next to musical idea title (BE deletes musical idea from db, FE refetches musical ideas and displays updated map)
Edit session notes: Click the “edit” button next to the notes section of the session => edit field => press “submit changes” button (BE calls PATCH route and updates notes column for that session (tracked by ID)), FE refetches and displays updated data on submit, disable button - if error, show error.

DATA MODELS:

Model #1: The one in the one to many relationship between Session and Musical Idea

Session:

Attributes: ID (auto-generated), title (string, not nullable), started_at - ISO string - not nullable eg: "2026-01-28T19:30" - comes from <input type="datetime-local”>, length (integer representing mins, optional), notes (text, optional)

Model #2: The many in the one to many relationship between Session and Musical Idea

Musical_Idea

Attributes: ID (auto-generated), title (string, not nullable), bpm (integer, validations between 40 and 220, optional), key (string, optional) - should I validate? It will contain a letter and special chars, notes (text, optional), session_id (foreign key to link to Session instance - handle it’s creation in the post route by taking in the id, and setting session_id = id)

Cascade: when a session is deleted, its children Musical_Ideas should also be deleted. Handle this at the ORM level with cascade (delete all?)

API ROUTES:

GET /sessions

Response: a JSON array of session objects (each representing a session) [{id: 1, title: “Test Session 1” …..}, {id: 2, title: “Test Session 2” …..}], 200 status code

GET /sessions/:id (get a specific session , for use in the session detail page display (above the ideas for that session))

Request example: GET /sessions/3

Response Example: JSON session object : {“id”: 3, “title”: “Test Session 3”, “started_at”: "2026-01-28T19:30”…..}, 200 status code

POST /sessions
Headers: “Content-Type: application/json”

Request: a JSON object with the keys matching the attributes on the model (if required) and the values matching the input of the user for each field:e.g: {“title”: “Test Session 3”, “started_at”: "2026-01-28T19:30”…..}Response: A JSON object representing the created session
E.g: {“id”: 3, “title”: “Test Session 3”, “started_at”: "2026-01-28T19:30”…..}, 201 status code

PATCH /sessions/:id (edit notes of a session)Headers: “Content-Type: application/json”

Request: JSON Object containing updated notes, example {“notes”: “updated notes content”}Response: JSON object representing updated session, example: {“id”: 2, “title”: “Session 2”, “notes”: “updated notes content” ….}, 200 status code
DELETE /sessions/:id

Request example: DELETE /sessions/4

Response: empty response, 204 status code

GET /sessions/:id/ideas (retrieve musical ideas for a given session, for display)Request example: GET /sessions/4/ideas

Response example: An array of musical_idea objects: [{id: 1, title: “Idea 1” …..}, {id: 2, title: “Idea 2” …..}], 200 status code

POST /sessions/:id/ideas (add a musical idea to a session)

Headers: “Content-Type: application/json”Request example body: An idea object with keys matching the (at least required) attributes on the model, and values matching the user inputs from the fields in the form: {“title”: “Idea 4”, “bpm”: 120, ….}Response example: An object representing the newly created musical idea:{“id”: 4, “title”: “Idea 4”, “bpm”: 120, “session_id”: 1. ….}

DELETE /ideas/:idea_id (delete a musical idea)

Request example: DELETE /ideas/5

Response: empty response, 204 status code

FRONTEND ARCHITECTURE PLAN:FE routes:“/“ redirects to “/sessions/“
“/sessions/“ - displays existing sessions and a form to create a session. Also the ability to delete sessions lives here.“/sessions/:id/“ - “sessions” details page - displays ideas under that session. Includes form for creating musical ideas for that session, and ability to delete a musical idea. Functionality for updating session notes lives here.Components:

Pages:
SessionsPage
SessionDetailPage
Other Components:

SessionInputForm (self explanatory)
IdeaInputForm (self-explanatory)

SessionDisplayCard (displays and formats details of a session)
IdeaDisplayCard (displays and formats details of an idea)

Data Flows:SessionsPage fetches sessions on mount. (GET)
SessionsPage refetches sessions when session is added/deleted (POST, DELETE respectively)
SessionDetailPage fetches THAT session + its ideas on mount. (GET (2 requests))SessionDetailPage refetches THAT session when its notes are updated. (PATCH)SessionDetailPage refetches ideas when one is added or deleted. (POST, DELETE respectively)
Loading and Error states live on the pages

PHASE PLAN (MVP → V1 → V2):

MVP:
Create/read/delete for both models
Update session notes only
V1: edit idea notes + confirm delete
V2: edit all fields + sorting dropdowns
