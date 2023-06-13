import React from 'react';
import { Button } from '@mui/material';

function DataTypeButton(props) {

    const onClick = () => {
        props.onClick(props.name)
    }

    return (
        <Button onClick = {onClick}> {props.name} </Button>
    )
}

export default DataTypeButton