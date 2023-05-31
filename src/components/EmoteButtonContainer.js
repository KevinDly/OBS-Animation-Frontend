import React from 'react'
import EmoteButton from './EmoteButton.js'
import { Card } from '@mui/material'
import '../emotepickercontainer.css'

function EmoteButtonContainer({emoteJSONArray, onClickEmote}) {
    //Take in a list of jsons, then iterate on each json.

  console.log("Changing button container sources.")
  return (
    <Card sx = {{minWidth: "100%", height: "100vh", mx: 2, mt: 1}}>
      <div>
        {emoteJSONArray.map(emoteJSON => (
          <EmoteButton imgName={emoteJSON.imgName} imgSrc={emoteJSON.imgSrc} onClickEmote = { onClickEmote }/>
        ))}
      </div>
    </Card>
  )
}

export default React.memo(EmoteButtonContainer)