import DataContainer from './DataContainer.js'
import PickedEmoteContainer from './emotes/PickedEmoteContainer.js'
import { Box, Stack } from '@mui/material'
import React, { useState } from 'react';

function SourceContainer({emoteCategories, emotes, addEmote, removeEmote}) {
  
  const [filter, setFilter] = useState("")

  const updateFilter = (e) => {
    console.log("filter")
    setFilter(e.target.value)
  }

  //TODO: Updating spacing on filter input.
  return (
    <Box id = "sourceDiv" sx = {{maxWidth: "75%"}}>
        <Box sx = {{height: "fit-content"}}>
          <label htmlFor="emoteFilter"> Filter Emotes </label>
          <input type="text" id="emoteFilter" onChange = { (e) => updateFilter(e) }></input>
        </Box>
        <Stack spacing = {1}>
          <PickedEmoteContainer emotes = { emotes } onRemove = { removeEmote }/>
          <Box sx = {{height: "80%", minWidth: "100%"}}>
            <DataContainer emoteCategories = { emoteCategories } onClickEmote = { addEmote } filter = { filter } id = "data_container"/>
          </Box>
        </Stack>
    </Box>
  )
}

export default SourceContainer