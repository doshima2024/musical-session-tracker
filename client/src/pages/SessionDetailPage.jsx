import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MusicalIdeaList } from '../components/MusicalIdeaList';
import { MusicalIdeaForm } from '../components/MusicalIdeaForm';

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

    fetch(`http://127.0.0.1:5000/sessions/${id}`)
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
    fetch(`http://127.0.0.1:5000/sessions/${id}/ideas`)
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

  const onIdeaDelete = ideaId => {
    fetch(`http://127.0.0.1:5000/ideas/${ideaId}`, {
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

  const onNotesEdit = event => {
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
        <form>
          <label>
            {' '}
            Edit Session Notes Here:
            <textarea value={editedNotes} onChange={onNotesEdit}></textarea>
          </label>
        </form>
      </div>
      {ideasError && <p>Error: {ideasError} </p>}
      {isIdeasLoading && <p>Loading Musical Ideas...</p>}
      <MusicalIdeaForm onIdeaCreated={onIdeaCreated} sessionId={id} />
      {!isIdeasLoading && !ideasError && <MusicalIdeaList ideas={ideas} onIdeaDelete={onIdeaDelete} />}
    </>
  );
};
