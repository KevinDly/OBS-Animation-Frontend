import React from 'react';
import CategoryContainer from './CategoryContainer.js';
import { Stack, Box } from '@mui/material';
import DataTypeButton from './DataTypeButton.js';

function DataContainer(props) {
    return (
        <Stack sx = {{minWidth: "100%"}} spacing = {1} direction = "row">
            <Box sx = {{minWidth: "10%", border: "1px blue dashed", overflowY: "auto", overflowX: "hidden"}}>
                <DataTypeButton name = {"Emotes"}/>
                <DataTypeButton name = {"Sound"}/>
            </Box>
            <Box sx = {{minWidth: "90%"}}>
                <CategoryContainer emoteCategories = { props.emoteCategories } onClickEmote = { props.onClickEmote } filter = { props.filter }/>
            </Box>
        </Stack>
    )
}

export default DataContainer