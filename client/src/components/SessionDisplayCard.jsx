import React from 'react';
import '../App.css';

export const SessionDisplayCard = ({ sessions }) => {
  return (
    <>
      <div>{sessions.length === 0 && <p>No sessions to display yet</p>}</div>
      <div className="sessionDisplayWrapper">
        {sessions.map(session => (
          <div key={session.id} className="sessionDisplayCard">
            <p>{session.title}</p>
            <p>Length: {session.length} seconds</p>
            <p>Notes: {session.notes}</p>
          </div>
        ))}
      </div>
    </>
  );
};
