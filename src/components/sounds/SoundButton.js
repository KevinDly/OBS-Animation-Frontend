import React, { useEffect } from 'react';
import { ButtonBase, Card } from '@mui/material';

function SoundButton(props) {

    //https://www.khcoding.com/en/react/how-to-disable-the-right-click-in-react
    console.log(props)
    useEffect(() => {
        function handleContextMenu(e) {
          e.preventDefault(); // prevents the default right-click menu from appearing
        }
        // add the event listener to the component's root element
        const rootElement = document.getElementById(props.data.id);
        rootElement.addEventListener('contextmenu', handleContextMenu);
        // remove the event listener when the component is unmounted
        return () => {
          rootElement.removeEventListener('contextmenu', handleContextMenu);
        };
      }, [props.data.id]);
    
    let onClick = () => {
        console.log("Sending data!")
        props.onClick({
            display: props.data.display,
            src: props.data.src,
            name: props.data.name,
            id: props.data.id
        },
        "sound")
    }

    let onRightClick = () => {
        console.log("Right clicked!")
        const testAudio = new Audio(props.data.src)
        testAudio.play()
    }

    return (
        <ButtonBase sx = {{ maxWidth: "56px", margin: .5}} onClick = {onClick} onContextMenu = {onRightClick} onHover id = {props.data.id}>
            <Card>
                <img alt = "" src = { props.data.display } maxheight = "56px" width = "100%" className = "buttonImage">
                </img>
                {props.data.name}
            </Card>
        </ButtonBase>
    );
}

export default React.memo(SoundButton);