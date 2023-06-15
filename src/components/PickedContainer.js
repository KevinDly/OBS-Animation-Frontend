import React from 'react';
import { Stack, Box, Typography } from '@mui/material';
import PickedEmoteContainer from './emotes/PickedEmoteContainer';
import PickedSoundContainer from './sounds/PickedSoundContainer';

function PickedContainer(props) {

    console.log(props.pickedEmotes)
    return (
        <Stack spacing = {1} direction = "row" id = "data_row_stack">
            <Box sx = {{minWidth: "90%"}}>
                <Stack>
                    <Typography>Emotes</Typography>
                    <PickedEmoteContainer emotes = { props.emotes } onRemove = { props.onRemove }/>
                </Stack>
            </Box>
            <Box sx = {{minWidth: "10%"}}>
                <Stack>
                    <Typography>Sounds</Typography>
                    <PickedSoundContainer sounds = { props.sounds } onRemove = { props.onRemove }/>
                </Stack>
            </Box>
        </Stack>
    )
}

export default PickedContainer