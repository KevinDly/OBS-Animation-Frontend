import React, { useEffect } from 'react';
import { ButtonBase, Card } from '@mui/material';

function SoundButton(props) {

    //https://www.khcoding.com/en/react/how-to-disable-the-right-click-in-react
    useEffect(() => {
        function handleContextMenu(e) {
          e.preventDefault(); // prevents the default right-click menu from appearing
        }
        // add the event listener to the component's root element
        const rootElement = document.getElementById(props.data.soundID);
        rootElement.addEventListener('contextmenu', handleContextMenu);
        // remove the event listener when the component is unmounted
        return () => {
          rootElement.removeEventListener('contextmenu', handleContextMenu);
        };
      }, [props.data.soundID]);
    
    let onClick = () => {
        console.log("Sending data!")

    }

    let onRightClick = () => {
        console.log("Right clicked!")
        const testAudio = new Audio(props.data.soundURL)
        testAudio.play()
    }

    return (
        <ButtonBase sx = {{ maxWidth: "56px", margin: .5}} onClick = {onClick} onContextMenu = {onRightClick} onHover id = {props.data.soundID}>
            <Card>
                <img alt = "" src = { props.data.soundImage } maxheight = "56px" width = "100%" className = "buttonImage">
                </img>
                {props.data.soundName}
            </Card>
        </ButtonBase>
    );
}

export default React.memo(SoundButton);