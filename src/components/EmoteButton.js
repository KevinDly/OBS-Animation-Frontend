import React from 'react';
import { ButtonBase, Card, Typography } from '@mui/material';
import { Grid } from '@mui/material';
import { Box } from '@mui/material';

function EmoteButton({imgSrc, imgName, onClickEmote}) {

    let onClick = () => {
        console.log("Sending data!")
        onClickEmote(imgSrc, imgName)
    }

    return (
        <ButtonBase sx = {{ maxWidth: "56px", margin: .5}} onClick = {onClick} onHover>
            <Card>
                <img alt = "" src = { imgSrc } maxheight = "56px" width = "100%" className = "buttonImage"></img>
            </Card>
        </ButtonBase>
    );
}

export default React.memo(EmoteButton);