import EmotePickerContainer from './EmotePickerContainer.js'
import { Stack, Paper } from '@mui/material'
import EmoteButton from './EmoteButton.js'
import React, { useState } from 'react';

function EmoteSourceContainer({emoteJSONArray, onClickEmote}) {
  console.log(emoteJSONArray)

  const [pickedEmotes, setEmotes] = useState(new Set())

  let addEmote = function(imgSrc, imgName){
    console.log(pickedEmotes.size)
    setEmotes(prev => new Set(prev).add({
        imgSrc: imgSrc,
        imgName: imgName
    }))
    console.log(pickedEmotes)
  }

  let removeEmote = function(imgSrc, imgName){
    setEmotes(prev => {
        let newPickedEmote = new Set(prev)
        newPickedEmote.delete({
        imgSrc: imgSrc,
        imgName: imgName })
        return newPickedEmote
    })
  }

  //TODO: Add headers for the emotepickercontainer so that it contains multiple emotes.
  return (
    <Stack sx = {{maxWidth: "75%"}}>    
        <Paper sx = {{maxHeight: "25%", minWidth: "99%"}} variant = {"outlined"}>
            {Array.from(pickedEmotes).map(emote => {
                return <EmoteButton imgName={emote.imgName} imgSrc={emote.imgSrc} onClickEmote = { removeEmote }/>
            })}
        </Paper>
        <EmotePickerContainer emoteJSONArray={emoteJSONArray} onClickEmote = { addEmote }/>
    </Stack>
  )
}

export default EmoteSourceContainer