import React, { useState } from 'react';
import '../App.css';

export const SessionForm = ({ onSessionCreated }) => {
  const [sessionTitle, setSessionTitle] = useState('');
  const [sessionLength, setSessionLength] = useState('');
  const [sessionNotes, setSessionNotes] = useState('');

  const handleTitleChange = event => {
    setSessionTitle(event.target.value).trim();
  };

  const handleNotesChange = event => {
    setSessionNotes(event.target.value).trim();
  };

  const handleLengthChange = event => {
    setSessionLength(event.target.value);
  };

  const handleSubmitSession = event => {
    event.preventDefault();
    const newSession = {
      title: sessionTitle,
      notes: sessionNotes,
      // Add length conditionally only if provided, else leave out to avoif sending empty values
      ...(sessionLength !== '' ? { length: Number(sessionLength) } : {}),
    };
    fetch('http://127.0.0.1:5000/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSession),
    })
      .then(response => response.json())
      .then(newlyCreatedSession => {
        setSessionTitle('');
        setSessionLength('');
        setSessionNotes('');
        onSessionCreated(newlyCreatedSession);
      })
      .catch(error => console.error('Error adding session', error));
  };

  return (
    <div className="sessionFormWrapper">
      <form className="sessionForm" onSubmit={handleSubmitSession}>
        <label>
          {' '}
          Add A Session To Your Tracker:
          <input
            value={sessionTitle}
            onChange={handleTitleChange}
            type="text"
            placeholder="Enter Your Title Here"
          ></input>
          <input
            value={sessionLength}
            type="number"
            placeholder="Enter Length Here"
            onChange={handleLengthChange}
          ></input>
          <textarea value={sessionNotes} placeholder="Enter Your Notes Here" onChange={handleNotesChange}></textarea>
          <input type="submit" />
        </label>
      </form>
    </div>
  );
};
