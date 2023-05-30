import EmoteCategoryContainer from './EmoteCategoryContainer.js'
import { Stack, Paper } from '@mui/material'
import EmoteButton from './EmoteButton.js'
import React, { useState } from 'react';

function EmoteSourceContainer({emoteCategories, onClickEmote}) {

  const [pickedEmoteIDs, setEmoteIDs] = useState(new Set())
  const [emotes, setEmotes] = useState({})

  let addEmote = function(imgSrc, imgName){
    if(!pickedEmoteIDs.has(imgName)) {
      setEmoteIDs(prevSet => new Set(prevSet).add(imgName))
      setEmotes(prevEmotes => ({...prevEmotes, [imgName]: imgSrc}))
    }
  }

  let removeEmote = function(imgSrc, imgName){
    const newIDs = new Set(pickedEmoteIDs)
    const newEmotes = {...emotes}

    newIDs.delete(imgName)
    delete newEmotes[imgName]

    setEmoteIDs(() => newIDs)
    setEmotes(() => newEmotes)
  }

  //TODO: Add headers for the emotepickercontainer so that it contains multiple emotes.
  return (
    <Stack sx = {{maxWidth: "75%"}}>    
        <Paper sx = {{maxHeight: "25%", minWidth: "99%"}} variant = {"outlined"} id = "emote_pick_display">
            {Object.keys(emotes).map(emote => {
                return <EmoteButton imgName={emote} imgSrc={emotes[emote]} onClickEmote = { removeEmote } key = {emote + "_display"}/>
            })}
        </Paper>
        <EmoteCategoryContainer emoteCategories={ emoteCategories } onClickEmote = { addEmote } id = "category_container"/>
    </Stack>
  )
}

export default EmoteSourceContainer