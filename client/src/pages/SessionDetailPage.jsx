import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const SessionDetailPage = () => {
  const [session, setSession] = useState(null);
  const { id } = useParams();

  // fetch the given session on mount for display above Musical Ideas
  useEffect(() => {
    fetch(`http://127.0.0.1:5000/sessions/${id}`)
      .then(response => response.json())
      .then(data => setSession(data))
      .catch(error => console.error('Error fetching session', error));
  }, [id]);

  if (!session) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="sessionDetailTitle">{session?.title}</h2>
    </div>
  );
};
