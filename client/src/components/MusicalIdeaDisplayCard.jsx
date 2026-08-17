import React from 'react';

// TODO: Make deletion of musical idea temporary: make onDeleteIdea set a timer after which the idea is ACTUALLY deleted

export const MusicalIdeaDisplayCard = ({ idea, onIdeaDelete }) => {
  return (
    <>
      <div className="musicalIdeaCardWrapper">
        <div className="musicalIdeaCard">
          <h2>{idea.title}</h2>
          <p>BPM: {idea.bpm}</p>
          <p>Key: {idea.key}</p>
          <p>Notes: {idea.notes} </p>
          <button onClick={() => onIdeaDelete(idea.id)}>Delete Idea</button>
        </div>
      </div>
    </>
  );
};
