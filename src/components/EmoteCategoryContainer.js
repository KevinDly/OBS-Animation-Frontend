import React, { useState } from 'react';
import EmotePickerContainer from './EmotePickerContainer'
import { Paper, Stack, Button } from '@mui/material';

function EmoteCategoryContainer({emoteCategories, onClickEmote}) {

    console.log("categories")
    console.log(Object.keys(emoteCategories))
    const [currentCategory, setCategories] = useState(emoteCategories[Object.keys(emoteCategories)[0]])

    const [currentEmoteArray, setCurrentEmoteArray] = useState([])

    //TODO: Implement function for clicking category button
    let setCategory = (source) => {
        console.log(source)
        setCategories(emoteCategories[source])
    }

    return (
        <Stack sx = {{minWidth: "100%", overflowX: "hidden"}}>
            <Paper sx = {{maxHeight: "10%", minWidth: "99%"}} variant = {"outlined"} id = "source_categories_buttons">
                { Object.keys(emoteCategories).map(key => <Button onClick = { () => {setCategory(key)} } key = {key}> 
                    { key } 
                    </Button>)}
            </Paper>
            <EmotePickerContainer emoteJSONArray = { currentCategory['data'] } onClickEmote = { onClickEmote }/>
        </Stack>
    );
}

export default EmoteCategoryContainer;