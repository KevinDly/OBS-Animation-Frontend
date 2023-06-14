import DataContainer from './DataContainer.js'
import PickedEmoteContainer from './emotes/PickedEmoteContainer.js'
import { Box, Stack } from '@mui/material'
import React, { useState } from 'react';

function SourceContainer({sounds, emoteCategories, emotes, addData, removeData}) {
  
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
        <Stack spacing = {1} id = "total_data_viewer_container">
          <Box sx = {{height: "20%", maxHeight: "20%", width: "100%"}}>
            <PickedEmoteContainer emotes = { emotes } onRemove = { removeData }/>
          </Box>
          <Box sx = {{height: "80%", minHeight: "80%", width: "100%"}} id = "data_container">
            <DataContainer sounds = { sounds } emoteCategories = { emoteCategories } onClickEmote = { addData } filter = { filter.toLowerCase() } id = "data_container"/>
          </Box>
        </Stack>
    </Box>
  )
}

export default SourceContainer