import React, { useState } from 'react';
import '../App.css';
import { API_URL } from '../config';

export const SessionForm = ({ onSessionCreated }) => {
  const [sessionTitle, setSessionTitle] = useState('');
  const [sessionLength, setSessionLength] = useState('');
  const [sessionNotes, setSessionNotes] = useState('');

  // Function to handle the event at which the user types a title, and update the 'sessionTitle' to that value.

  const handleTitleChange = event => {
    setSessionTitle(event.target.value);
  };

  // Same as above, for 'sessionNotes'

  const handleNotesChange = event => {
    setSessionNotes(event.target.value);
  };

  // See above

  const handleLengthChange = event => {
    setSessionLength(event.target.value);
  };

  const handleSubmitSession = event => {
    event.preventDefault(); // Prevent the default behaviour, by which ... (?)
    // Declare a variable newSession, a dictionary, which sets the vales of title, notes and session length
    const newSession = {
      title: sessionTitle.trim(),
      notes: sessionNotes.trim(),
      // Add length conditionally only if provided, else leave out to avoid sending empty values
      ...(sessionLength !== '' ? { length: Number(sessionLength) } : {}),
    };
    fetch(`${API_URL}/sessions`, {
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
    <div>
      <form onSubmit={handleSubmitSession} className="sessionForm">
        {' '}
        Add A Session To Your Tracker Workspace:
        <br></br>
        <br></br>
        <label>
          {' '}
          Enter Session Title:
          <input
            value={sessionTitle}
            onChange={handleTitleChange}
            type="text"
            placeholder="Enter Your Title Here"
          ></input>
        </label>
        <label>
          {' '}
          Enter Session Length:
          <input
            value={sessionLength}
            type="number"
            placeholder="Enter Length Here"
            onChange={handleLengthChange}
          ></input>
        </label>
        <label>
          {' '}
          Enter Session Notes:
          <textarea value={sessionNotes} placeholder="Enter Your Notes Here" onChange={handleNotesChange}></textarea>
        </label>
        <label>
          <input type="submit" />
        </label>
      </form>
    </div>
  );
};
