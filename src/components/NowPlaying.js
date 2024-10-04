import React, { useEffect } from 'react';

const NowPlaying = ({ currentTrack, error, onRefresh, isListening, username }) => {
  useEffect(() => {
    // Set up an interval to refresh every minute (60000 milliseconds)
    const intervalId = setInterval(() => {
      onRefresh();
    }, 60000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [onRefresh]); // Add onRefresh to the dependency array

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!isListening) {
    return (
      <div>
        <p>{username} isn't listening to music right now</p>
        <button onClick={onRefresh}>Refresh</button>
      </div>
    );
  }

  if (!currentTrack) {
    return (
      <div>
        <img style={{ width: '100%', maxWidth: '300px' }} src={require('../output.gif')} alt="Loading..." />
        <button onClick={onRefresh}>Refresh</button>
      </div>
    );
  }

  const albumArt = currentTrack.image && currentTrack.image.length > 2 ? currentTrack.image[2]['#text'] : null;

  return (
    <div>
      {albumArt && <img src={albumArt} alt="Album Art" style={{ width: '100%', maxWidth: '300px' }} />}
      <p><strong>{currentTrack.name}</strong></p>
      <p>{currentTrack.artist['#text']}</p>
      <button onClick={onRefresh}>Refresh</button>
    </div>
  );
};

export default NowPlaying;