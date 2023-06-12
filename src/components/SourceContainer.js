import DataContainer from './DataContainer.js'
import PickedEmoteContainer from './emotes/PickedEmoteContainer.js'
import { Stack } from '@mui/material'
import React, { useState } from 'react';

function SourceContainer({emoteCategories, emotes, addEmote, removeEmote}) {
  
  const [filter, setFilter] = useState("")

  const updateFilter = (e) => {
    console.log("filter")
    setFilter(e.target.value)
  }

  //TODO: Updating spacing on filter input.
  return (
    <div id = "sourceDiv">
      <label htmlFor="emoteFilter"> Filter Emotes </label>
      <input type="text" id="emoteFilter" onChange = { (e) => updateFilter(e) }></input>
      <Stack sx = {{maxWidth: "75%"}}>    
          <PickedEmoteContainer emotes = { emotes } onRemove = { removeEmote }/>
          <DataContainer emoteCategories = { emoteCategories } onClickEmote = { addEmote } filter = { filter } id = "data_container"/>
      </Stack>
    </div>
  )
}

export default SourceContainer