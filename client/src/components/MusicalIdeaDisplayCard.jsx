import React from 'react';

export const MusicalIdeaDisplayCard = ({ idea }) => {
  return (
    <>
      <div>
        <p>{idea.title}</p>
        <p>BPM: {idea.bpm}</p>
      </div>
    </>
  );
};
