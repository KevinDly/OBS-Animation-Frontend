import React from 'react'
import EmoteButton from './EmoteButton.js'
import { Grid, Card } from '@mui/material'
import '../emotepickercontainer.css'

function EmotePickerContainer({emoteJSONArray, onClickEmote}) {
    //Take in a list of jsons, then iterate on each json.
  console.log(emoteJSONArray)

  return (
    <Card sx = {{height: "100vh", mx: 2, mt: 1}}>
      <div>
        {emoteJSONArray.map(emoteJSON => (
          <EmoteButton imgName={emoteJSON.imgName} imgSrc={emoteJSON.imgSrc} onClickEmote = { onClickEmote }/>
        ))}
      </div>
    </Card>
  )
}

export default EmotePickerContainer