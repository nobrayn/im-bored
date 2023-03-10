import React, { useState } from "react";
import { Howl, } from "howler"
import chiptune from "../audio/chiptune.mp3"

const audioClip = { sound: chiptune };

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);

  const soundPlay = (src) => {
    if (!sound) {
      const newSound = new Howl({ src });
      setSound(newSound);
      setIsPlaying(true);
      newSound.play();
    } else if (isPlaying) {
      sound.pause();
      setIsPlaying(false);
    } else {
      sound.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="AudioPlayer">
      <button onClick={(e) => {
        e.preventDefault();
        soundPlay(audioClip.sound);
      }}>{isPlaying ? "Pause Music" : "Play Music"}</button>
    </div>
  );
};

export default AudioPlayer;