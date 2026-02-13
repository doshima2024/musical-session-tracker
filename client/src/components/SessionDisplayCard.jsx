import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

export const SessionDisplayCard = ({ sessions }) => {
  return (
    <>
      <div>{sessions.length === 0 && <p>No sessions to display yet</p>}</div>
      <h2 className="sessionDisplayCardTitle">Click On A Session To View It's Musical Ideas</h2>
      <div className="sessionDisplayWrapper">
        {sessions.map(session => (
          <div key={session.id} className="sessionDisplayCard">
            <Link to={`/sessions/${session.id}`}>
              <p>{session.title}</p>
              <p>Length: {session.length} seconds</p>
              <p>Notes: {session.notes}</p>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};
