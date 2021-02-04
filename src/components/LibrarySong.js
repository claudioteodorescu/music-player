const LibrarySong = ({
  song,
  songs,
  setSongs,
  currentSong,
  setCurrentSong,
  id,
  audioRef,
  isPlaying
}) => {
  const songSelectHandler = async () => {
    await setCurrentSong(song);
    //Add active State
    // const newSongs = songs.map((song) => {
    //   if (song.id === id) {
    //     return {
    //       ...song,
    //       active: true
    //     };
    //   } else {
    //     return {
    //       ...song,
    //       active: false
    //     };
    //   }
    // });
    // setSongs(newSongs);
    setSongs(
      songs.map((targetSong) => {
        return {
          ...targetSong,
          active: targetSong.id === song.id
        };
      })
    );
    // check if the song is playing
    if (isPlaying) audioRef.current.play();
  };
  return (
    <div
      onClick={songSelectHandler}
      className={`library-details ${song.active ? "selected" : ""}`}
    >
      <img src={song.cover} alt={song.name} />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
