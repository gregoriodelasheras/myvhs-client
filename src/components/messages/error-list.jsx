import React from 'react';

// Notifies the user if there are errors when displaying the list of actors, directors, genres or movies
export default function ErrorList() {
  return (
    <div>
      <h2>&quot;Houston, we have a problem!&quot;</h2>
      <p className='h4'>We are working on it</p>
      <p>
        Sorry, an unexpected error occurred during the update. Our technical
        team is already working on it from our moonbase.
      </p>
      <p>Please try again later.</p>
    </div>
  );
}
