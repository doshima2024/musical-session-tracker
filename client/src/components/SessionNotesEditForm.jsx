import React, { useState } from 'react';
import { API_URL } from '../config';

export const SessionNotesEditForm = ({ editedNotes, setEditedNotes, id, setSession }) => {
  const [notesEditError, setNotesEditError] = useState(null);
  const [isNotesSaving, setIsNotesSaving] = useState(false);

  // Submit handler for the edit session notes feature

  const onEditSessionNotesSubmit = event => {
    event.preventDefault();

    setNotesEditError(null);
    setIsNotesSaving(true);

    const updatedNotesBody = {
      notes: editedNotes,
    };

    fetch(`${API_URL}/sessions/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedNotesBody),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setSession(data);
        setEditedNotes(data.notes ?? '');
      })
      .catch(error => {
        console.error('Error updated notes', error);
        setNotesEditError(error.message);
      })
      .finally(() => {
        setIsNotesSaving(false);
      });
  };

  // onChange handler for the edit sessions notes TextArea

  const onNotesEdit = event => {
    setNotesEditError(null);
    setEditedNotes(event.target.value);
  };

  return (
    <>
      <div>{notesEditError && <p>Error Editing Notes: {notesEditError}</p>}</div>

      <div>
        <form onSubmit={onEditSessionNotesSubmit} className="sessionNotesUpdateForm">
          {' '}
          Edit This Session:
          <label>
            {' '}
            Edit Session Notes Here:
            <textarea value={editedNotes} onChange={onNotesEdit}></textarea>
          </label>
          <button type="submit" disabled={isNotesSaving}>
            {isNotesSaving ? 'Saving ...' : 'Submit'}
          </button>
        </form>
      </div>
    </>
  );
};
