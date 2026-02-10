import React from 'react';
import { SessionDisplayCard } from '../components/SessionDisplayCard';
import { SessionForm } from '../components/SessionForm';

export const SessionsPage = () => {
  return (
    <>
      <SessionForm />
      <SessionDisplayCard />
    </>
  );
};
