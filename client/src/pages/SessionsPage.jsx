import React, { useState, useEffect } from 'react';
import { SessionDisplayCard } from '../components/SessionDisplayCard';
import { SessionForm } from '../components/SessionForm';

export const SessionsPage = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/sessions')
      .then(response => response.json())
      .then(data => {
        setSessions(data);
      })
      .catch(error => console.error('Error fetching sessions:', error));
  }, []);

  const onSessionCreated = newlyCreatedSession => {
    setSessions(prevSessions => [...prevSessions, newlyCreatedSession]);
  };

  return (
    <>
      <SessionForm onSessionCreated={onSessionCreated} />
      <SessionDisplayCard sessions={sessions} />
    </>
  );
};
