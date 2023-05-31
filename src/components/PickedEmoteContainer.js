import { Paper } from '@mui/material'
import EmoteButton from './EmoteButton.js'
import React from 'react';

function PickedEmoteContainer({emotes, onRemove}) {

  //TODO: Add headers for the emotepickercontainer so that it contains multiple emotes.
  return ( 
    <Paper sx = {{maxHeight: "25%", minWidth: "99%"}} variant = {"outlined"} id = "emote_pick_display">
        {Object.keys(emotes).map(emote => {
            return <EmoteButton imgName={emote} imgSrc={emotes[emote]} onClickEmote = { onRemove } key = {emote + "_display"}/>
        })}
    </Paper>
  )
}

export default PickedEmoteContainer