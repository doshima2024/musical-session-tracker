import React, { useState } from 'react';

export const MusicalIdeaForm = ({ onIdeaCreated, sessionId }) => {
  const [ideaTitle, setIdeaTitle] = useState('');
  const [ideaBpm, setIdeaBpm] = useState('');
  const [ideaKey, setIdeaKey] = useState('');
  const [ideaNotes, setIdeaNotes] = useState('');

  const onIdeaTitleChange = event => {
    setIdeaTitle(event.target.value.trim());
  };

  const onIdeaBpmChange = event => {
    setIdeaBpm(event.target.value.trim());
  };

  const onIdeaKeyChange = event => {
    setIdeaKey(event.target.value.trim());
  };

  const onIdeaNotesChange = event => {
    setIdeaNotes(event.target.value.trim());
  };

  const handleIdeaFormSubmit = event => {
    event.preventDefault();
    const newIdea = {
      title: ideaTitle,
      ...(ideaBpm !== '' ? { bpm: ideaBpm } : {}),
      ...(ideaKey !== '' ? { key: ideaKey } : {}),
      ...(ideaNotes !== '' ? { notes: ideaNotes } : {}),
    };

    fetch(`http://127.0.0.1:5000/sessions/${sessionId}/ideas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newIdea),
    })
      .then(response => response.json())
      .then(newlyCreatedIdea => {
        setIdeaTitle('');
        setIdeaBpm('');
        setIdeaKey('');
        setIdeaNotes('');
        onIdeaCreated(newlyCreatedIdea);
      })
      .catch(error => console.error('Error completing request:', error));
  };

  return (
    <div>
      <form onSubmit={handleIdeaFormSubmit}>
        {' '}
        Create A New Musical Idea Entry:
        <label>
          {' '}
          Enter a Title:
          <input type="text" value={ideaTitle} onChange={onIdeaTitleChange}></input>
        </label>
        <label>
          {' '}
          Enter a BPM (Optional):
          <input type="number" value={ideaBpm} onChange={onIdeaBpmChange}></input>
        </label>
        <label>
          Enter a Key (Optional):
          <input type="text" value={ideaKey} onChange={onIdeaKeyChange}></input>
        </label>
        <label>
          {' '}
          Enter Notes:
          <input type="text-area" value={ideaNotes} onChange={onIdeaNotesChange}></input>
        </label>
        <label>
          <input type="submit"></input>
        </label>
      </form>
    </div>
  );
};
