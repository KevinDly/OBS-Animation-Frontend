import React, { useState } from 'react';
import CategoryContainer from './CategoryContainer.js';
import { Stack, Box } from '@mui/material';
import DataTypeButton from './DataTypeButton.js';
import SoundButton from './sounds/SoundButton.js';

function DataContainer(props) {

    const [currentData, changeData] = useState("Emotes")

    let dataComponents = {
        "Emotes": <CategoryContainer emoteCategories = { props.emoteCategories } onClickEmote = { props.onClickEmote } filter = { props.filter }/>,
        "Sounds": <Box> {props.sounds.filter(data => data.soundName.toLowerCase().includes(props.filter)).map((data) => (
            <SoundButton data = {data}/>
        ))} </Box>
    }

    const changeDataSet = (name) => {
        console.log("Pressed dataset change")
        console.log(name)
        changeData(name)
    }

    return (
        <Stack spacing = {1} direction = "row" id = "data_row_stack">
            <Box sx = {{boxSizing: "border-box", width: "10%", height: "100%", border: "1px blue dashed", overflowY: "auto", overflowX: "hidden"}}>
                { Object.keys(dataComponents).map((name) => (
                        <DataTypeButton name = {name} onClick = {changeDataSet}/>
                ))}
            </Box>
            <Box sx = {{width: "90%"}}>
                { dataComponents[currentData] }
            </Box>
        </Stack>
    )
}

export default DataContainer