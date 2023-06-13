import React, { Component } from 'react';
import "./App.css"
import { updateCategories } from './utils/emoteCategoryUtils.js'
import SourceContainer from './components/SourceContainer.js'
import { Stack
 } from '@mui/material';
const WEBSOCKET_URL = "ws://localhost:2999"
const WEBSOCKET_PROTOCOLS = ["streamerController"]
const DATA_SEND_TYPE = "executeAnimation"

const emoteCategories = {
        "Built-In": {
            data: [{imgSrc: "https://i.kym-cdn.com/photos/images/original/001/923/849/90f",
                imgName: "AYAYA",
                id: "AYAYA_Local"},
                {imgSrc: "https://cdn.discordapp.com/emojis/725112963823960184.webp?size=96&quality=lossless",
                imgName: "SAIYAYA",
                id: "SAIYAYA_Local"}]
        }
    }

class App extends Component {

    constructor(props) {
        super(props)
        this.websocket = new WebSocket(WEBSOCKET_URL, WEBSOCKET_PROTOCOLS)
        
        this.sendData = this.sendData.bind(this)
        this.updateData = this.filterEmotes.bind(this)
        this.sendEmoteButton = this.sendEmoteButton.bind(this)
        this.addEmote = this.addEmote.bind(this)
        this.removeEmote = this.removeEmote.bind(this)
        this.enableSound = this.enableSound.bind(this)
        this.clearEmotes = this.clearEmotes.bind(this)

        this.state = {
            imageURL: "",
            emoteCategories: emoteCategories,
            didConnect: {},
            didAuthenticate: {},
            pickedEmoteIDs: new Set(),
            pickedEmotes: {},
            soundEnabled: false,
        }
    }

    //TODO: Check if there are multiples of emotes?


    componentDidMount(){
        console.log("Mounted")
        //connectTwitch(this, "Twitch.tv")
        this.websocket.onmessage = (event) => {
            const msg = JSON.parse(event.data)
            const data = msg.data
            const type = msg.type
            console.log("Recieved Message")
            console.log(msg)
            switch(type) {
                case "recievedEmotes":
                    console.log(data)
                    try {
                        const updatedCategories = updateCategories(this.state.emoteCategories, data)
                        this.setState({ emoteCategories: updatedCategories })
                    }
                    catch(error) {
                        console.log(error)
                    }
                    break
                default:
                    break
            }
        }
    }

    sendData() {
        const pickedEmotes = this.state.pickedEmotes
        const emoteDensity = document.getElementById("emoteDensityInput").value
        const pickedEmoteKeys = Object.keys(pickedEmotes)
        const soundEnabled = this.state.soundEnabled

        console.log("soundEnabled: " + soundEnabled)

        if(pickedEmoteKeys.length === 0) {
            console.log("No emotes picked!")
            return
        }

        if(emoteDensity <= 0) {
            console.log("Positive number of emotes required.")
            return
        }

        const emoteURLs = pickedEmoteKeys.map(key => pickedEmotes[key])
        const emoteData = {
            type: DATA_SEND_TYPE,
            data: { 
                emotes: emoteURLs,
                emoteDensity: emoteDensity,
                soundEnabled: soundEnabled
            }
        }

        console.log(emoteData)
        try{
            console.log(this.websocket)
            const stringifiedData = JSON.stringify(emoteData)
            console.log(stringifiedData)
            this.websocket.send(stringifiedData)
        }
        catch(error) {
            console.log("Error occurred.")
            console.log(error)
        }
    }

    sendEmoteButton(src, name) {
        console.log(src)
        const emoteData = {
            type: DATA_SEND_TYPE,
            data: {
                url: src,
                emoteDensity: document.getElementById("emoteDensityInput").value
            }
        }

        console.log(emoteData)
        try{
            console.log(this.websocket)
            const stringifiedData = JSON.stringify(emoteData)
            console.log(stringifiedData)
            this.websocket.send(stringifiedData)
        }
        catch(error) {
            console.log(error)
        }
    }

    filterEmotes(e) {
        this.setState({filter: e.target.value})
    }

    enableSound() {
        const previousState = !this.state.soundEnabled
        this.setState({soundEnabled: previousState})
    }

    //TODO: Prevent jsonarray from reupdating every time something else on the page updates.

    addEmote(imgSrc, imgName) {
        if(!this.state.pickedEmoteIDs.has(imgName)) {
            this.setState({pickedEmoteIDs: new Set(this.state.pickedEmoteIDs).add(imgName)})
            this.setState({pickedEmotes: {...this.state.pickedEmotes, [imgName]: imgSrc}})
        }
    }
    
    removeEmote(imgSrc, imgName) {
        const newIDs = new Set(this.state.pickedEmoteIDs)
        const newEmotes = {...this.state.pickedEmotes}
        
        newIDs.delete(imgName)
        delete newEmotes[imgName]
        
        this.setState({pickedEmoteIDs: newIDs})
        this.setState({pickedEmotes: newEmotes})
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
            <input type="checkbox" id="audioCheckbox" name="audioCheckbox" onClick={ this.enableSound }/>
            <label htmlFor="audioCheckbox">Enable Sound</label>
            <SourceContainer emoteCategories={ this.state.emoteCategories } emotes = { this.state.pickedEmotes } addEmote = { this.addEmote } removeEmote = { this.removeEmote }/>
        </div>
    }
}

export default App