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
  const { id } = useParams();

  // fetch the given session on mount for display above Musical Ideas
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
      .then(data => setSession(data))
      .catch(error => {
        console.error('Error fetching session', error);
        setSessionError(error.message);
      });
  }, [id]);

  // Fetch musical ideas by ID for a given session:

  useEffect(() => {
    setIdeasError(null);
    setIsIdeasLoading(true);
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

  if (sessionError) return <p>Error: {sessionError}</p>;
  if (ideasError) return <p>Error: {ideasError} </p>;
  if (!session) return <p>Loading...</p>;
  if (isIdeasLoading) return <p>Loading Musical Ideas...</p>;

  return (
    <>
      <div>
        <h2 className="sessionDetailTitle">You Are Now Viewing Musical Ideas For: {session?.title}</h2>
      </div>
      <MusicalIdeaForm onIdeaCreated={onIdeaCreated} sessionId={id} />
      <MusicalIdeaList ideas={ideas} />
    </>
  );
};
