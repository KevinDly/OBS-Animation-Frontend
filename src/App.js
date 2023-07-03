import React, { Component } from 'react';
import "./App.css"
import { emoteCategories, sounds } from './constants/localCategoryData';
import SourceContainer from './components/SourceContainer.js'
import { Checkbox } from '@mui/material';
import { connectWebsocket } from './utils/serverConnectionUtils';

const DATA_SEND_TYPE = "executeAnimation"
const TWITCH_AUTH_TYPE = "twitchAuthData"
const TWITCH_DEV_AUTH_TYPE = "twitchDevAuthData"
const APP_CLIENT_ID = "bmkhxh3eb8cl8uvtkwm6fbrahzgkdx"
const TWITCH_RETURN_PARAMS_CODE = "code"

let websocket;

class App extends Component {

    constructor(props) {
        super(props)
        //this.websocket = new WebSocket(WEBSOCKET_URL, WEBSOCKET_PROTOCOLS)
        
        this.sendData = this.sendData.bind(this)
        this.updateData = this.filterEmotes.bind(this)
        this.addData = this.addData.bind(this)
        this.removeData = this.removeData.bind(this)
        this.clearEmotes = this.clearEmotes.bind(this)
        this.onDevClick = this.onDevClick.bind(this)

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
        const windowUrl = window.location.search;
        const params = new URLSearchParams(windowUrl);
        const paramsDict = {}

        for (const key of params.keys()) {
            paramsDict[key] = params.get(key)
        }

        connectWebsocket(this, (createdWebsocket) => {
            websocket = createdWebsocket

            //Repeatidly check if websocket is fully open.
            const waitForOpen = (openCallback) => {
                if(websocket.readyState === websocket.OPEN) {
                    openCallback()
                }
                else {
                    if(websocket.readyState === websocket.CONNECTING)
                        setTimeout(() => waitForOpen(openCallback), 5)
                }
            }

            //Callback for after the socket is connected.
            const afterOpen = () => {
                console.log("Opened!")
                if(!(TWITCH_RETURN_PARAMS_CODE in paramsDict))
                    return

                let twitchAuthData = {
                    type: TWITCH_AUTH_TYPE,
                    data: paramsDict
                }

                console.log("Authdata")
                console.log(twitchAuthData)
                websocket.send(JSON.stringify(twitchAuthData))
            }

            //Check if the socket was in a non-opening or opened state.
            //TODO: Check if there is actually a bug here when Server is closed and Reopened?
            if(!(websocket.readyState > websocket.OPEN)) {
                waitForOpen(() => { afterOpen() })
            }
        })
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
            console.log("Sending data")
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

    onDevClick() {
        console.log("Sending mock data")
        const parameterValue = document.getElementById("devUserTwitchID").value
        if(parameterValue === '') {
            console.log("No userid entered")
            return
        }
        console.log(parameterValue)
        const paramsDict = {
            id: parameterValue,
            scope: "user:read:subscriptions",
            dev: true
        }
        let twitchAuthData = {
            type: TWITCH_DEV_AUTH_TYPE,
            data: paramsDict
        }

        console.log("Authdata")
        console.log(twitchAuthData)
        websocket.send(JSON.stringify(twitchAuthData))
    }

    render() {

        const twitchScopes = ["channel:read:redemptions", "channel:manage:redemptions"]
        let urlEncodedScopes = ""
        twitchScopes.forEach((scope, index) => {
            urlEncodedScopes = urlEncodedScopes.concat(encodeURIComponent(scope))
            if(index !== twitchScopes.length - 1) urlEncodedScopes = urlEncodedScopes + "+"
        })
        let formHref = "https://id.twitch.tv/oauth2/authorize?" +
        `response_type=code` +
        `&client_id=${APP_CLIENT_ID}` +
        `&redirect_uri=http://localhost:3000/` +
        `&scope=${urlEncodedScopes}`
        const checkDev = process.env.NODE_ENV === 'development'
        console.log(formHref)
        console.log("Current environment: " + process.env.NODE_ENV)
        return <div id = "page_div">
            {
                checkDev && <h1>You are in developer mode.</h1>
            }
            <input type="number" id="emoteDensityInput"></input>
            <button type="button" id="emoteDataSend" onClick={ this.sendData }>Submit</button>
            <button type="button" id="emoteDataClear" onClick={ this.clearEmotes }>Clear Emotes</button>
            <Checkbox label = "Enable Sound" id = "audioCheckbox" name="audioCheckbox"/>
            <label htmlFor="audioCheckbox">Enable Sound </label>
            {
                checkDev ? <span> <input type="text" id="devUserTwitchID"></input> <button type="button" id = "devTestAuthButton" onClick={ this.onDevClick }>Send Test</button></span> : 
                <a href={formHref}>Connect with Twitch</a>
            }
            <SourceContainer sounds = { this.state.sounds } emoteCategories={ this.state.emoteCategories } 
                pickedSounds = { this.state.picked["sound"].pickedData } pickedEmotes = { this.state.picked["emote"].pickedData } 
                addData = { this.addData } removeData = { this.removeData }/>
        </div>
    }
}

export default App