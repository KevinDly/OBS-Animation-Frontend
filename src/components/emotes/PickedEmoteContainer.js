import { Paper } from '@mui/material'
import EmoteButton from './EmoteButton.js'
import React from 'react';

function PickedEmoteContainer({emotes, onRemove}) {

  //TODO: Add headers for the emotepickercontainer so that it contains multiple emotes.
  return ( 
    <Paper sx = {{height: "20%", maxWidth: "99%", minWidth: "99%", overflowY: "auto"}} ariant = {"outlined"} id = "emote_pick_display">
        {Object.keys(emotes).map(emote => {
            return <span display = "inline-block" key = {emote + "_picked"}>
              <EmoteButton imgName={emote} imgSrc={emotes[emote]} onClickEmote = { onRemove } key = {emote + "_display"}/>
            </span>
        })}
    </Paper>
  )
}

export default PickedEmoteContainer