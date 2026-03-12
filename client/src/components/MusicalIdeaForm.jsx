import React, { useState } from 'react';
import { API_URL } from '../config';

export const MusicalIdeaForm = ({ onIdeaCreated, sessionId }) => {
  const [ideaTitle, setIdeaTitle] = useState('');
  const [ideaBpm, setIdeaBpm] = useState('');
  const [ideaKey, setIdeaKey] = useState('');
  const [ideaNotes, setIdeaNotes] = useState('');

  const onIdeaTitleChange = event => {
    setIdeaTitle(event.target.value);
  };

  const onIdeaBpmChange = event => {
    setIdeaBpm(event.target.value);
  };

  const onIdeaKeyChange = event => {
    setIdeaKey(event.target.value);
  };

  const onIdeaNotesChange = event => {
    setIdeaNotes(event.target.value);
  };

  const handleIdeaFormSubmit = event => {
    event.preventDefault();
    const newIdea = {
      title: ideaTitle.trim(),
      ...(ideaBpm.trim() !== '' ? { bpm: ideaBpm.trim() } : {}),
      ...(ideaKey.trim() !== '' ? { key: ideaKey.trim() } : {}),
      ...(ideaNotes.trim() !== '' ? { notes: ideaNotes.trim() } : {}),
    };

    fetch(`${API_URL}/sessions/${sessionId}/ideas`, {
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
      <form onSubmit={handleIdeaFormSubmit} className="ideadeaForm">
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
          <textarea value={ideaNotes} onChange={onIdeaNotesChange}></textarea>
        </label>
        <label>
          <input type="submit"></input>
        </label>
      </form>
    </div>
  );
};
