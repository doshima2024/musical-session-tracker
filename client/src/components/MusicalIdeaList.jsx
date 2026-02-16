import React, { useState, useEffect } from 'react';
import { MusicalIdeaDisplayCard } from './MusicalIdeaDisplayCard';

export const MusicalIdeaList = ({ SessionId }) => {
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/sessions/${SessionId}/ideas`)
      .then(response => response.json())
      .then(data => setIdeas(data))
      .catch(error => console.error('Error fetching ideas for session', error));
  }, []);

  return (
    <>
      {ideas.map(idea => {
        return <MusicalIdeaDisplayCard idea={idea} key={idea.id} />;
      })}
    </>
  );
};
