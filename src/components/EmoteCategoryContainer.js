import React, { useState, useMemo } from 'react';
import EmoteButtonContainer from './EmoteButtonContainer'
import { Paper, Stack, Button } from '@mui/material';

function EmoteCategoryContainer({emoteCategories, onClickEmote}) {

    const [currentSource, setSource] = useState(Object.keys(emoteCategories)[0])
    console.log(currentSource)

    let setCategory = (source) => {
        setSource(source)
    }

    //TODO: Figure out why this is still updating constantly when the PickedEmoteContainer is updated.
    const onClick = useMemo(() => {
        return onClickEmote}, 
        [onClickEmote])

    const category = useMemo(() => 
        getCategory(emoteCategories, currentSource), 
        [emoteCategories, currentSource])

    /*const getEmoteContainer = useMemo(() => {
        return (<EmoteButtonContainer emoteJSONArray = { getCategory(emoteCategories, currentSource) } onClickEmote = { onClickEmote } source = { currentSource }/>)},
        [currentSource, emoteCategories, onClickEmote])*/

    return (
        <Stack sx = {{minWidth: "100%", overflowX: "hidden"}}>
            <Paper sx = {{maxHeight: "10%", minWidth: "99%"}} variant = {"outlined"} id = "source_categories_buttons">
                { Object.keys(emoteCategories).map(key => <Button onClick = { () => {setCategory(key)} } key = {key}> 
                    { key } 
                    </Button>)}
            </Paper>
            <EmoteButtonContainer emoteJSONArray = { category } onClickEmote = { onClick } source = { currentSource }/>
        </Stack>
    );
}

/*Function that retrives the related jsons given a category and a dictionary of different sources*/
function getCategory(emoteCategories, source) {
    console.log("Current source")
    console.log(source)
    return emoteCategories[source].data
}

export default EmoteCategoryContainer;