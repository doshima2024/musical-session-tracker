import React, { useState, useEffect } from 'react';
import { SessionList } from '../components/SessionList';
import { SessionForm } from '../components/SessionForm';
import { API_URL } from '../config';

export const SessionsPage = () => {
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log('VITE_API_URL:', API_URL);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetch(`${API_URL}/sessions`)
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

  const onDeleteSession = id => {
    fetch(`${API_URL}/sessions/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }
      })
      .then(() => {
        setError(null);
        setSessions(prevSessions => {
          return prevSessions.filter(session => id !== session.id);
        });
      })
      .catch(error => {
        setError(error.message);
        console.error('Error deleting session', error);
      });
  };

  if (isLoading) return <p>Loading ...</p>;

  return (
    <>
      {error && <p>Error: {error}</p>}
      <SessionForm onSessionCreated={onSessionCreated} />
      <SessionList sessions={sessions} onDeleteSession={onDeleteSession} />
    </>
  );
};
