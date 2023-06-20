import React, { Component } from 'react';
import "./App.css"
import { updateCategories } from './utils/emoteCategoryUtils.js'
import SourceContainer from './components/SourceContainer.js'
import { Checkbox } from '@mui/material';

const DATA_SEND_TYPE = "executeAnimation"
const WEBSOCKET_URL = "ws://localhost:2999"
const WEBSOCKET_PROTOCOLS = ["streamerController"]
const WEBSOCKET_RECONNECT_TIMEOUT = 5000

const emoteCategories = {
        "Built-In": {
            data: [{imgSrc: "https://i.kym-cdn.com/photos/images/original/001/923/849/90f",
                imgName: "AYAYA",
                id: "AYAYA_Local"},
                {imgSrc: "https://cdn.discordapp.com/emojis/725112963823960184.webp?size=96&quality=lossless",
                imgName: "SAIYAYA",
                id: "SAIYAYA_Local"},]
        }
    }

const sounds = [
    {
        id: "AYAYA_Sound",
        src: "https://cdn.discordapp.com/attachments/319692273556258816/1116040911575588914/AYAYA_AYAYA_-_Sound_Effect_HD.mp3",
        name: "AYAYA",
        display: "https://i.kym-cdn.com/photos/images/original/001/923/849/90f"
    },
    {
        id: "SVAROG_Sound",
        src: "https://cdn.discordapp.com/attachments/211664172037963776/1119006578763382804/help-me-mr.svarog-by-voicemod.mp3",
        name: "SVAROG",
        display: "https://progameguides.com/wp-content/uploads/2023/04/Honkai_Star_Rail_Clara_1.jpg?fit=900%2C506"
    },
]

let websocket;

//Function that manages websocket connection and related events.
function connectWebsocket(component) {
    websocket = new WebSocket(WEBSOCKET_URL, WEBSOCKET_PROTOCOLS)

    websocket.onmessage = (event) => {
        const msg = JSON.parse(event.data)
        const data = msg.data
        const type = msg.type
        console.log("Recieved Message")
        console.log(msg)
        switch(type) {
            case "recievedEmotes":
                console.log(data)
                try {
                    const updatedCategories = updateCategories(component.state.emoteCategories, data)
                    component.setState({ emoteCategories: updatedCategories })
                }
                catch(error) {
                    console.log(error)
                }
                break
            default:
                break
        }
    }

    websocket.onclose = () => {
        setTimeout(() => connectWebsocket(component), WEBSOCKET_RECONNECT_TIMEOUT)
    }
}

class App extends Component {

    constructor(props) {
        super(props)
        //this.websocket = new WebSocket(WEBSOCKET_URL, WEBSOCKET_PROTOCOLS)
        
        this.sendData = this.sendData.bind(this)
        this.updateData = this.filterEmotes.bind(this)
        this.addData = this.addData.bind(this)
        this.removeData = this.removeData.bind(this)
        this.clearEmotes = this.clearEmotes.bind(this)

        this.state = {
            emoteCategories: emoteCategories,
            sounds: sounds,

            picked: {
                "emote": {
                    pickedIDs: new Set(),
                    pickedData: {},
                },
                "sound": {
                    pickedIDs: new Set(),
                    pickedData: {}
                }
            }
        }
    }

    componentDidMount(){
        console.log("Mounted")
        connectWebsocket(this)
    }

    sendData() {
        const pickedEmotes = this.state.picked["emote"].pickedData
        const pickedSounds = this.state.picked["sound"].pickedData
        const pickedEmoteKeys = Object.keys(pickedEmotes)
        const pickedSoundKeys = Object.keys(pickedSounds)

        const emoteDensity = document.getElementById("emoteDensityInput").value
        const soundEnabled = document.getElementById("audioCheckbox").checked

        console.log("Sending sounds to server.")
        if(pickedEmoteKeys.length === 0) {
            alert("No emotes have been picked.")
            return
        }

        if(emoteDensity <= 0) {
            alert("Positive number of emotes required.")
            return
        }

        const emoteURLs = pickedEmoteKeys.map(key => pickedEmotes[key].src)
        const soundURLs = pickedSoundKeys.map(key => pickedSounds[key].src)

        const sentData = {
            type: DATA_SEND_TYPE,
            data: {
                "emote": {
                    emotes: emoteURLs,
                    emoteDensity: emoteDensity
                },
                "sound": {
                    sounds: soundURLs,
                    soundEnabled: soundEnabled
                }
            }
        }

        console.log(sentData)
        try{
            console.log(websocket)
            console.log("Sending data")
            console.log(sentData)
            const stringifiedData = JSON.stringify(sentData)
            console.log(stringifiedData)
            websocket.send(stringifiedData)
        }
        catch(error) {
            console.log("Error occurred.")
            console.log(error)
        }
    }

    filterEmotes(e) {
        this.setState({filter: e.target.value})
    }

    addData(data, buttonSource) {
        console.log("Adding data")
        const currentPickedSource = this.state.picked[buttonSource]

        //Check if the ID has already been added.
        console.log(data.name)
        if(!currentPickedSource.pickedIDs.has(data.name)) {
            console.log("Data was not currently added.")
            const updatedPicked = {...this.state.picked}
            const updatedSource = updatedPicked[buttonSource]

            updatedSource.pickedIDs.add(data.name)
            updatedSource.pickedData[data.name] = data

            console.log(updatedPicked)
            this.setState({picked: updatedPicked})
        }
    }
    
    removeData(data, buttonSource) {
        console.log("Removing data")

        const currentPickedSource = this.state.picked[buttonSource]
        const updatedIDs = new Set(currentPickedSource.pickedIDs)
        const updatedData = {...currentPickedSource.pickedData}

        updatedIDs.delete(data.name)
        delete updatedData[data.name]

        let updatedPicked = {...this.state.picked}
        updatedPicked[buttonSource] = {
            pickedIDs: updatedIDs,
            pickedData: updatedData
        }

        this.setState({picked: updatedPicked})
    }

    clearEmotes(){
        const clearedSet = new Set()
        const clearedEmotes = {}
        this.setState({pickedEmoteIDs: clearedSet})
        this.setState({pickedEmotes: clearedEmotes})
    }

    render() {

        return <div id = "page_div">
            <input type="number" id="emoteDensityInput"></input>
            <button type="button" id="emoteDataSubmit" onClick={ this.sendData }>Submit</button>
            <button type="button" id="emoteDataSubmit" onClick={ this.clearEmotes }>Clear Emotes</button>
            <Checkbox label = "Enable Sound" id = "audioCheckbox" name="audioCheckbox"/>
            <label htmlFor="audioCheckbox">Enable Sound</label>
            <SourceContainer sounds = { this.state.sounds } emoteCategories={ this.state.emoteCategories } 
                pickedSounds = { this.state.picked["sound"].pickedData } pickedEmotes = { this.state.picked["emote"].pickedData } 
                addData = { this.addData } removeData = { this.removeData }/>
        </div>
    }
}

export default App