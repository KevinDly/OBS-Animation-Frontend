import React from 'react';
import CategoryContainer from './CategoryContainer.js';
import { Stack } from '@mui/material';
import DataTypeButton from './DataTypeButton.js';

function DataContainer(props) {
    return (
        <Stack direction="row" sx = {{maxHeight: "75%"}}>
            <DataTypeButton/>
            <CategoryContainer emoteCategories = { props.emoteCategories } onClickEmote = { props.onClickEmote } filter = { props.filter } id = "category_container"/>
        </Stack>
    )
}

export default DataContainer