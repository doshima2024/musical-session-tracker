import React, { useState, useEffect } from 'react';
import { MusicalIdeaDisplayCard } from './MusicalIdeaDisplayCard';

export const MusicalIdeaList = ({ ideas }) => {
  if (ideas.length === 0) return <p>No Ideas To Show For This Session</p>;

  return (
    <>
      {ideas.map(idea => {
        return <MusicalIdeaDisplayCard idea={idea} key={idea.id} />;
      })}
    </>
  );
};
