import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

export const SessionDisplayCard = ({ session }) => {
  return (
    <>
      <div className="sessionDisplayWrapper">
        <div className="sessionDisplayCard">
          <Link to={`/sessions/${session.id}`}>
            <p>{session.title}</p>
            <p>Length: {session.length} seconds</p>
            <p>Notes: {session.notes}</p>
          </Link>
        </div>
      </div>
    </>
  );
};
