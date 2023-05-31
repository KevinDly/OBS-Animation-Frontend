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
        <ButtonBase sx = {{maxHeight: "200px", margin: .5}} onClick = {onClick}>
            <Card>
                <Grid>
                    <Box height = "60%" m = {2} mb = {2}>
                        <img alt = "" src = { imgSrc } className = "buttonImage" width = "100px" height = "100px"></img>
                    </Box>
                    <Box height = "40%" mt = {1} mb = {2}>
                        <Typography> {imgName} </Typography>
                    </Box>
                </Grid>
            </Card>
        </ButtonBase>
    );
}

export default React.memo(EmoteButton);