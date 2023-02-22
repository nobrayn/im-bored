import React, { Component } from "react";
import { Howl, Howler } from "howler"
import chiptune from "../audio/chiptune.mp3"

const audioClip = { sound: chiptune, label: 'Music On/Off' };

class AudioPlayer extends Component {
  soundPlay = (src) => {
    const sound = new Howl({
      src
    })
    sound.play();
  }

  RenderButtonAndSound = (soundObj) => {
    // console.log("working")
    return (
      <button onClick={(e) => {
        e.preventDefault();
        this.soundPlay(soundObj.sound)
      }}>{soundObj.label}</button>
      
    );
  }

  render() {
    Howler.volume(1.0);
    return (
      <div className="AudioPlayer">
        {this.RenderButtonAndSound(audioClip)}
      </div>
    );
  }
}
export default AudioPlayer;