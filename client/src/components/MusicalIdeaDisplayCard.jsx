import React from 'react';

export const MusicalIdeaDisplayCard = ({ idea }) => {
  return (
    <>
      <div>
        <div>
          <h2>{idea.title}</h2>
          <p>BPM: {idea.bpm}</p>
          <p>Key: {idea.key}</p>
          <p>Notes: {idea.notes} </p>
        </div>
      </div>
    </>
  );
};
