import React, { useState, useEffect } from 'react';
import { SessionList } from '../components/SessionList';
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

  //callback to append new session to sessions state upon creation for instant visibility in sessions list

  const onSessionCreated = newlyCreatedSession => {
    setSessions(prevSessions => [...prevSessions, newlyCreatedSession]);
  };

  return (
    <>
      <SessionForm onSessionCreated={onSessionCreated} />
      <SessionList sessions={sessions} />
    </>
  );
};
