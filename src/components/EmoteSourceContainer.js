import EmoteCategoryContainer from './EmoteCategoryContainer.js'
import PickedEmoteContainer from './PickedEmoteContainer.js'
import { Stack } from '@mui/material'
import React from 'react';

function EmoteSourceContainer({emoteCategories, emotes, addEmote, removeEmote}) {

  //TODO: Add headers for the emotepickercontainer so that it contains multiple emotes.
  return (
    <Stack sx = {{maxWidth: "75%"}}>    
        <PickedEmoteContainer emotes = { emotes } onRemove = { removeEmote }/>
        <EmoteCategoryContainer emoteCategories = { emoteCategories } onClickEmote = { addEmote } id = "category_container"/>
    </Stack>
  )
}

export default EmoteSourceContainer