import React, { useState, useEffect } from 'react';
import '../App.css';

export const SessionDisplayCard = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/sessions')
      .then(response => response.json())
      .then(data => {
        setSessions(data);
      })
      .catch(error => console.error('Error fetching sessions:', error));
  }, []);

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
