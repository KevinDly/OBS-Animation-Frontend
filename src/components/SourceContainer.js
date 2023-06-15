import DataContainer from './DataContainer.js'
import PickedEmoteContainer from './emotes/PickedEmoteContainer.js'
import { Box, Stack } from '@mui/material'
import React, { useState } from 'react';
import PickedContainer from './PickedContainer.js';

function SourceContainer({sounds, emoteCategories, pickedSounds, pickedEmotes, addData, removeData}) {
  
  const [filter, setFilter] = useState("")

  const updateFilter = (e) => {
    console.log("filter")
    setFilter(e.target.value)
  }

  //TODO: Updating spacing on filter input.
  return (
    <Box id = "sourceDiv" sx = {{maxWidth: "75%", marginLeft: "5px"}}>
        <Box sx = {{height: "fit-content"}}>
          <label htmlFor="emoteFilter"> Filter Emotes </label>
          <input type="text" id="emoteFilter" onChange = { (e) => updateFilter(e) }></input>
        </Box>
        <Box sx = {{height: "100%", minHeight: "100%"}}>
          <Stack spacing = {1} id = "total_data_viewer_container">
            <Box sx = {{height: "25%", width: "100%"}}>
              <PickedContainer sounds = { pickedSounds } emotes = { pickedEmotes } onRemove = { removeData }/>
            </Box>
            <Box sx = {{height: "75%", width: "100%"}} id = "data_container">
              <DataContainer sounds = { sounds } emoteCategories = { emoteCategories } onClick = { addData } filter = { filter.toLowerCase() } id = "data_container"/>
            </Box>
          </Stack>
        </Box>
    </Box>
  )
}

export default SourceContainer