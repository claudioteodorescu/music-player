// import { useEffect } from "react";

import {
  // TiArrowShuffle,
  RiSkipBackMiniFill,
  RiPlayMiniFill,
  BiPause,
  RiSkipForwardMiniFill
  // RiRepeat2Fill
  // RiRepeatOneLine
} from "react-icons/all";

const Player = ({
  audioRef,
  currentSong,
  setCurrentSong,
  songs,
  setSongs,
  isPlaying,
  setIsPlaying,
  songInfo,
  setSongInfo,
  activeLibraryHandler
}) => {
  // Using useEffect here can cause feature bugs
  // // UseEffect
  // useEffect(() => {
  //   setSongs(
  //     songs.map((targetSong) => {
  //       return {
  //         ...targetSong,
  //         active: targetSong.id === currentSong.id
  //       };
  //     })
  //   );
  //   if (isPlaying) audioRef.current.play();
  // }, [currentSong]);

  // Event Handlers

  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const getTimeHandler = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };
  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };
  const skipTrackHandler = async (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-forward") {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
    }
    if (direction === "skip-back") {
      if ((currentIndex - 1) % songs.length === -1) {
        await setCurrentSong(songs[songs.length - 1]);
        activeLibraryHandler(songs[songs.length - 1]);
        return;
      }
      await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
    }
  };
  // Animation
  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`
  };
  return (
    <div className="player">
      <div className="time-control">
        <p>{getTimeHandler(songInfo.currentTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right,${currentSong.color[0]},${currentSong.color[1]} )`
          }}
          className="track"
        >
          <input
            min={0}
            max={songInfo.duration}
            value={songInfo.currentTime}
            onChange={dragHandler}
            type="range"
          />
          <div style={trackAnim} className="animate-track"></div>
        </div>
        <p>{getTimeHandler(songInfo.duration)}</p>
      </div>
      <div className="play-control">
        {/* <button>
          <TiArrowShuffle className="shuffle" />
        </button> */}
        <button onClick={() => skipTrackHandler("skip-back")}>
          <RiSkipBackMiniFill className="skip-back" />
        </button>
        <button onClick={playSongHandler}>
          {isPlaying ? (
            <BiPause className="pause" />
          ) : (
            <RiPlayMiniFill className="play" />
          )}
        </button>
        <button onClick={() => skipTrackHandler("skip-forward")}>
          <RiSkipForwardMiniFill className="skip-forward" />
        </button>
        {/* <button>
          <RiRepeat2Fill className="repeat-all" />
        </button> */}
      </div>
    </div>
  );
};

export default Player;
