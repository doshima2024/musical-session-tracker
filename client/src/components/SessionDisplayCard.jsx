import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

export const SessionDisplayCard = ({ session, onDeleteSession }) => {
  return (
    <>
      <div className="sessionDisplayWrapper">
        <div className="sessionDisplayCard">
          <Link to={`/sessions/${session.id}`}>
            <p>{session.title}</p>
            <p>Length: {session.length} seconds</p>
            <p>Notes: {session.notes}</p>
          </Link>
          <button onClick={() => onDeleteSession(session.id)}>Delete Session</button>
        </div>
      </div>
    </>
  );
};
