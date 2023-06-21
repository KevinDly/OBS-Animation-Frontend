import React from 'react';
import { ButtonBase, Card } from '@mui/material';

function EmoteButton({imgSrc, imgName, onClickEmote}) {

    let onClick = () => {
        console.log("Sending data!")
        onClickEmote({
            display: imgSrc,
            src: imgSrc,
            name: imgName
        },
        "emote")
    }

    return (
        <ButtonBase sx = {{ maxWidth: "56px", margin: .5}} onClick = {onClick}>
            <Card>
                <img alt = "" src = { imgSrc } maxheight = "56px" width = "100%" className = "buttonImage"></img>
            </Card>
        </ButtonBase>
    );
}

export default React.memo(EmoteButton);