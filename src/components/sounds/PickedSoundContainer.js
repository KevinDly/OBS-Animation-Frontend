import { Paper } from '@mui/material'
import SoundButton from './SoundButton.js'
import React from 'react';

function PickedSoundContainer(props) {

  //TODO: Add headers for the emotepickercontainer so that it contains multiple emotes.
  return ( 
    <Paper sx = {{width: "100%",  overflowY: "auto"}} ariant = {"outlined"} id = "sound_pick_display">
        {Object.keys(props.sounds).map(sound => {
            return <span display = "inline-block" key = {props.sounds[sound].id + "_picked"}>
              <SoundButton data = { props.sounds[sound] } onClick = { props.onRemove } />
            </span>
        })}
    </Paper>
  )
}

export default PickedSoundContainer