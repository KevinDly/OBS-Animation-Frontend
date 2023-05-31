import React, { useState, useMemo } from 'react';
import EmoteButtonContainer from './EmoteButtonContainer'
import { Paper, Stack, Button } from '@mui/material';

function EmoteCategoryContainer({emoteCategories, onClickEmote}) {

    const [currentSource, setSource] = useState(Object.keys(emoteCategories)[0])
    console.log(currentSource)

    let setCategory = (source) => {
        setSource(source)
    }

    const useEffect = useMemo(() => {
        return onClickEmote
    }, [currentSource])

    const category = useMemo(() => getCategory(emoteCategories, currentSource), [currentSource])

    return (
        <Stack sx = {{minWidth: "100%", overflowX: "hidden"}}>
            <Paper sx = {{maxHeight: "10%", minWidth: "99%"}} variant = {"outlined"} id = "source_categories_buttons">
                { Object.keys(emoteCategories).map(key => <Button onClick = { () => {setCategory(key)} } key = {key}> 
                    { key } 
                    </Button>)}
            </Paper>
            <EmoteButtonContainer emoteJSONArray = { category } onClickEmote = { useEffect }/>
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