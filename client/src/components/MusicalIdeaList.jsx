import React, { useState, useEffect } from 'react';
import { MusicalIdeaDisplayCard } from './MusicalIdeaDisplayCard';

export const MusicalIdeaList = ({ sessionId }) => {
  const [ideas, setIdeas] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setError(null);
    setIsLoading(true);
    fetch(`http://127.0.0.1:5000/sessions/${sessionId}/ideas`)
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
        setError(error.message);
      })
      .finally(() => setIsLoading(false));
  }, [sessionId]);

  if (error) return <p>Error: {error}</p>;
  if (isLoading) return <p>Loading ...</p>;
  if (ideas.length === 0) return <p>No Ideas To Show For This Session</p>;

  return (
    <>
      {ideas.map(idea => {
        return <MusicalIdeaDisplayCard idea={idea} key={idea.id} />;
      })}
    </>
  );
};
