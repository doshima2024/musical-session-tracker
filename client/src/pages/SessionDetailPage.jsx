import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const SessionDetailPage = () => {
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();

  // fetch the given session on mount for display above Musical Ideas
  useEffect(() => {
    setError(null); // reset error when id changes
    setSession(null); // trigger "Loading..." when id changes

    fetch(`http://127.0.0.1:5000/sessions/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setSession(data))
      .catch(error => {
        console.error('Error fetching session', error);
        setError(error.message);
      });
  }, [id]);

  if (error) return <p>Error: {error}</p>;
  if (!session) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="sessionDetailTitle">{session?.title}</h2>
    </div>
  );
};
