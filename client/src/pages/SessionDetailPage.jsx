import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MusicalIdeaList } from '../components/MusicalIdeaList';
import { MusicalIdeaForm } from '../components/MusicalIdeaForm';
import { SessionNotesEditForm } from '../components/SessionNotesEditForm';

import { API_URL } from '../config';

export const SessionDetailPage = () => {
  const [ideas, setIdeas] = useState([]);
  const [ideasError, setIdeasError] = useState(null);
  const [isIdeasLoading, setIsIdeasLoading] = useState(false);
  const [session, setSession] = useState(null);
  const [sessionError, setSessionError] = useState(null);
  const [editedNotes, setEditedNotes] = useState('');
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

  if (sessionError) return <p>Error: {sessionError}</p>;
  if (!session) return <p>Loading...</p>;

  return (
    <>
      <div>
        <h2 className="sessionDetailTitle">You Are Now Viewing Musical Ideas For: {session.title}</h2>
      </div>
      <SessionNotesEditForm editedNotes={editedNotes} setEditedNotes={setEditedNotes} id={id} setSession={setSession} />
      {ideasError && <p>Error: {ideasError} </p>}
      {isIdeasLoading && <p>Loading Musical Ideas...</p>}
      <MusicalIdeaForm onIdeaCreated={onIdeaCreated} sessionId={id} />
      {!isIdeasLoading && !ideasError && <MusicalIdeaList ideas={ideas} onIdeaDelete={onIdeaDelete} />}
    </>
  );
};
