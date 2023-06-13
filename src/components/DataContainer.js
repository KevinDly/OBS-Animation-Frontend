import React, { useState } from 'react';
import CategoryContainer from './CategoryContainer.js';
import { Stack, Box } from '@mui/material';
import DataTypeButton from './DataTypeButton.js';
import EmoteButton from './emotes/EmoteButton.js';

function DataContainer(props) {

    const [currentData, changeData] = useState("Emotes")

    let dataComponents = {
        "Emotes": <CategoryContainer emoteCategories = { props.emoteCategories } onClickEmote = { props.onClickEmote } filter = { props.filter }/>,
        "Sounds": <Box> {props.sounds.map((data) => (
            <EmoteButton imgSrc = {data.soundImage} imgName = {data.soundName} onClickEmote={() => {}}/>
        ))} </Box>
    }

    const changeDataSet = (name) => {
        console.log("Pressed dataset change")
        console.log(name)
        changeData(name)
    }

    return (
        <Stack sx = {{minWidth: "100%"}} spacing = {1} direction = "row">
            <Box sx = {{minWidth: "10%", border: "1px blue dashed", overflowY: "auto", overflowX: "hidden"}}>
                { Object.keys(dataComponents).map((name) => (
                    <DataTypeButton name = {name} onClick = {changeDataSet}/>
                ))}
            </Box>
            <Box sx = {{minWidth: "90%"}}>
                { dataComponents[currentData] }
            </Box>
        </Stack>
    )
}

export default DataContainer