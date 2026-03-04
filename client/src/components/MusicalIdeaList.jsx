import React from 'react';
import { MusicalIdeaDisplayCard } from './MusicalIdeaDisplayCard';

export const MusicalIdeaList = ({ ideas, onIdeaDelete }) => {
  if (ideas.length === 0) return <p>No Ideas To Show For This Session</p>;

  return (
    <>
      {ideas.map(idea => {
        return <MusicalIdeaDisplayCard idea={idea} key={idea.id} onIdeaDelete={onIdeaDelete} />;
      })}
    </>
  );
};
