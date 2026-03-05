import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MusicalIdeaList } from '../components/MusicalIdeaList';
import { MusicalIdeaForm } from '../components/MusicalIdeaForm';
import { API_URL } from '../config';

export const SessionDetailPage = () => {
  const [ideas, setIdeas] = useState([]);
  const [ideasError, setIdeasError] = useState(null);
  const [isIdeasLoading, setIsIdeasLoading] = useState(false);
  const [session, setSession] = useState(null);
  const [sessionError, setSessionError] = useState(null);
  const [editedNotes, setEditedNotes] = useState('');
  const [notesEditError, setNotesEditError] = useState(null);
  const [isNotesSaving, setIsNotesSaving] = useState(false);
  const { id } = useParams();

  // fetch the given session on mount (or when ID changes) for display above Musical Ideas
  useEffect(() => {
    setSessionError(null); // reset error when id changes
    setSession(null); // trigger "Loading..." when id changes

    fetch(`${API_URL}/sessions/${id}`)
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
        console.error('Error fetching session', error);
        setSessionError(error.message);
      });
  }, [id]);

  // Fetch musical ideas by ID for a given session on mount (or when ID changes):

  useEffect(() => {
    setIdeasError(null);
    setIsIdeasLoading(true);
    setIdeas([]);
    fetch(`${API_URL}/sessions/${id}/ideas`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setIdeas(data);
      })
      .catch(error => {
        console.error('Error fetching ideas for session', error);
        setIdeasError(error.message);
      })
      .finally(() => setIsIdeasLoading(false));
  }, [id]);

  const onIdeaCreated = newlyCreatedIdea => {
    setIdeas(prevIdeas => [...prevIdeas, newlyCreatedIdea]);
  };

  // Idea deletion handler

  const onIdeaDelete = ideaId => {
    fetch(`${API_URL}/ideas/${ideaId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }
      })
      .then(() => {
        setIdeasError(null);
        setIdeas(prevIdeas => {
          return prevIdeas.filter(idea => ideaId !== idea.id);
        });
      })
      .catch(error => {
        setIdeasError(error.message);
        console.error('Error Deleting Idea', error);
      });
  };

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

  if (sessionError) return <p>Error: {sessionError}</p>;
  if (!session) return <p>Loading...</p>;

  return (
    <>
      <div>
        <h2 className="sessionDetailTitle">You Are Now Viewing Musical Ideas For: {session.title}</h2>
      </div>
      <div>
        <form onSubmit={onEditSessionNotesSubmit} className="sessionNotesUpdateForm">
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
      {ideasError && <p>Error: {ideasError} </p>}
      {isIdeasLoading && <p>Loading Musical Ideas...</p>}
      {notesEditError && <p>Error Editing Notes: {notesEditError}</p>}
      <MusicalIdeaForm onIdeaCreated={onIdeaCreated} sessionId={id} />
      {!isIdeasLoading && !ideasError && <MusicalIdeaList ideas={ideas} onIdeaDelete={onIdeaDelete} />}
    </>
  );
};
