import React, { useState, useMemo } from 'react';
import EmoteButtonContainer from './emotes/EmoteButtonContainer'
import { Box, Stack, Button } from '@mui/material';

function CategoryContainer({emoteCategories, onClickEmote, filter}) {

    console.log("updated filter")
    console.log(filter)
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
        <Stack>
            <Box sx = {{maxHeight: "10%", width: "100%", border: "1px dashed gray"}} variant = {"outlined"} id = "source_categories_buttons">
                { Object.keys(emoteCategories).map(key => <Button onClick = { () => {setCategory(key)} } key = {key}> 
                    { key } 
                    </Button>)}
            </Box>
            <EmoteButtonContainer emoteJSONArray = { category } onClickEmote = { onClick } source = { currentSource } filter = { filter }/>
        </Stack>
    );
}

/*Function that retrives the related jsons given a category and a dictionary of different sources*/
function getCategory(emoteCategories, source) {
    console.log("Current source")
    console.log(source)
    return emoteCategories[source].data
}

export default CategoryContainer;