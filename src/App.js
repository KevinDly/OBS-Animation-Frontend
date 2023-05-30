import React, { Component } from 'react';
import "./App.css"
import EmoteSourceContainer from './components/EmoteSourceContainer';

const WEBSOCKET_URL = "ws://localhost:2999"
const WEBSOCKET_PROTOCOLS = ["streamerController"]
const DATA_SEND_TYPE = "executeAnimation"

const TWITCH_OAUTH_URL = 'https://id.twitch.tv/oauth2/token'
const TWITCH_GLOBAL_EMOTES_URL = 'https://api.twitch.tv/helix/chat/emotes/global'
const TWITCH_VALIDATION_URL = 'https://id.twitch.tv/oauth2/validate'

//TODO: Put in a separate file.
const TWITCH_CLIENT_SECRET = 'vh3a92zgt8617h0er1ohymnrn71nlt'
const TWITCH_CLIENT_ID = 'bmkhxh3eb8cl8uvtkwm6fbrahzgkdx'

const emoteCategories = {
        ["Local"]: {
            data: [{imgSrc: "https://i.kym-cdn.com/photos/images/original/001/923/849/90f",
                imgName: "AYAYA"},
                {imgSrc: "https://i.kym-cdn.com/photos/images/original/001/923/849/90f",
                imgName: "AYAYA"},
                {imgSrc: "https://i.kym-cdn.com/photos/images/original/001/923/849/90f",
                imgName: "AYAYA"},
                {imgSrc: "https://i.kym-cdn.com/photos/images/original/001/923/849/90f",
                imgName: "AYAYA"}]
        }
    }



//TODO: Replace setState for emotes later
let emoteMap = function(data) {
    return {
        imgSrc: data.images.url_4x,
        imgName: data.name
    }   
}

class App extends Component {

    constructor(props) {
        super(props)
        this.websocket = new WebSocket(WEBSOCKET_URL, WEBSOCKET_PROTOCOLS)
        this.sendData = this.sendData.bind(this)
        this.updateData = this.updateData.bind(this)
        this.sendEmoteButton = this.sendEmoteButton.bind(this)

        this.state = {
            emoteDensity: 0,
            imageURL: "",
            emoteCategories: emoteCategories,
            didConnect: false,
            didAuthenticate: false
        }
    }

    getEmotes({access_token, expiration, token_type}) {
        if(this.state.didConnect) {
            console.log("Connected")
            return
        }
        else {
            fetch(TWITCH_GLOBAL_EMOTES_URL, {
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'Client-Id': TWITCH_CLIENT_ID
                }
            })
            .then(response => response.json())
            .then(response => {
                this.setState({emoteCategories: {...this.state.emoteCategories, 
                    ["Twitch.tv"] : {
                        data: response.data.map(data => ({
                            imgSrc: data.images.url_4x,
                            imgName: data.name
                }))}}
            })})
            this.setState({didConnect: true})
        }
    }

    componentDidMount(){
        console.log("Mounted") 

        if(this.state.didAuthenticate) {
            console.log("Already authenticated")
            return
        }
        fetch(TWITCH_OAUTH_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'client_id': TWITCH_CLIENT_ID,
                'client_secret': TWITCH_CLIENT_SECRET,
                'grant_type': 'client_credentials'
            })
        })
        .then(response => response.json())
        .then(response => {
            this.getEmotes(response)
            this.setState({didAuthenticate: true})
        })
    }

    sendData() {
        const emoteData = {
            type: DATA_SEND_TYPE,
            data: {
                url: this.state.imageURL,
                emoteDensity: this.state.emoteDensity
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

    updateData(e, type) {
        console.log(e.target.value)
        this.setState({[type]: e.target.value})
    }

    //TODO: Prevent jsonarray from reupdating every time something else on the page updates.

    render() {
        return <div id = "page_div">
            <input type="number" id="emoteDensityInput"></input>
            <input type="text" id="emoteURLInput" onChange = { (e) => this.updateData(e, "imageURL") }></input>
            <button type="button" id="emoteDataSubmit" onClick={ this.sendData }>Submit</button>
            <EmoteSourceContainer emoteCategories={ this.state.emoteCategories } onClickEmote = { this.sendEmoteButton }/>
        </div>
    }
}

export default App