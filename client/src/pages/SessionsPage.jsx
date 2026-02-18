import React, { useState, useEffect } from 'react';
import { SessionList } from '../components/SessionList';
import { SessionForm } from '../components/SessionForm';

export const SessionsPage = () => {
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetch('http://127.0.0.1:5000/sessions')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setSessions(data);
      })
      .catch(error => {
        console.error('Error fetching sessions:', error);
        setError(error.message);
      })
      .finally(() => setIsLoading(false));
  }, []);

  //callback to append new session to sessions state upon creation for instant visibility in sessions list

  const onSessionCreated = newlyCreatedSession => {
    setSessions(prevSessions => [...prevSessions, newlyCreatedSession]);
  };

  if (error) return <p>Error: {error}</p>;
  if (isLoading) return <p>Loading ...</p>;

  return (
    <>
      <SessionForm onSessionCreated={onSessionCreated} />
      <SessionList sessions={sessions} />
    </>
  );
};
