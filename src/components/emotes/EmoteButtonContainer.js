import React from 'react'
import EmoteButton from './EmoteButton.js'
import { Card } from '@mui/material'
import '../../emotepickercontainer.css'

function EmoteButtonContainer( props ) {
    //Take in a list of jsons, then iterate on each json.

  console.log("Changing button container sources.")
  return (
    <Card sx = {{ width: "100%", height: "100vh", mx: 2, mt: 1, overflowY: "auto"}}>
      <div>
        {props.emoteJSONArray.filter(emoteJSON => emoteJSON.imgName.toLowerCase().includes(props.filter)).map(emoteJSON => (
          <span>
            <EmoteButton imgName={ emoteJSON.imgName } imgSrc={ emoteJSON.imgSrc } onClickEmote = { props.onClickEmote }/>
          </span>
        ))}
      </div>
    </Card>
  )
}

export default React.memo(EmoteButtonContainer)