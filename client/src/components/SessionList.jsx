import React from 'react';
import { SessionDisplayCard } from './SessionDisplayCard';

export const SessionList = ({ sessions }) => {
  return (
    <>
      <div>{sessions.length === 0 && <p>No sessions to display yet</p>}</div>
      <h2 className="sessionDisplayCardTitle">Click On A Session To View Its Associated Musical Ideas:</h2>
      {sessions.map(session => {
        return <SessionDisplayCard session={session} key={session.id} />;
      })}
    </>
  );
};
