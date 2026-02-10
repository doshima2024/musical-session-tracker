import React, { useState } from 'react';
import '../App.css';

export const SessionForm = () => {
  const [sessionTitle, setSessionTitle] = useState('');
  const [sessionLength, setSessionLength] = useState('');
  const [sessionNotes, setSessionNotes] = useState('');

  const handleTitleChange = event => {
    setSessionTitle(event.target.value);
  };

  const handleNotesChange = event => {
    setSessionNotes(event.target.value);
  };

  const handleLengthChange = event => {
    setSessionLength(Number(event.target.value));
  };

  const handleSubmitSession = event => {
    event.preventDefault();
    const newSession = { title: sessionTitle, length: Number(sessionLength), notes: sessionNotes };
    fetch('http://127.0.0.1:5000/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSession),
    })
      .then(response => response.json())
      .then(() => {
        setSessionTitle('');
        setSessionLength('');
        setSessionNotes('');
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
