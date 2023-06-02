import React, { Component } from 'react';
import "./App.css"
import EmoteSourceContainer from './components/EmoteSourceContainer';
import { connectTwitch } from './apis/twitchapi'

const WEBSOCKET_URL = "ws://localhost:2999"
const WEBSOCKET_PROTOCOLS = ["streamerController"]
const DATA_SEND_TYPE = "executeAnimation"


const emoteCategories = {
        "Local": {
            data: [{imgSrc: "https://i.kym-cdn.com/photos/images/original/001/923/849/90f",
                imgName: ":AYAYA",
                id: "AYAYA_Local"}]
        }
    }

//TODO: Replace setState for emotes later
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
            didConnect: {},
            didAuthenticate: {},
            pickedEmoteIDs: new Set(),
            emotes: {}
        }
    }

    //TODO: Check if there are multiples of emotes?

    componentDidMount(){
        console.log("Mounted")

        connectTwitch(this, "Twitch.tv")
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
        /*const addEmoteCallback = useCallback((imgSrc, imgName) => {
            if(!pickedEmoteIDs.has(imgName)) {
                this.setState({pickedEmoteIDs: new Set(prevSet).add(imgName)})
                this.setState({emotes: {...prevEmotes, [imgName]: imgSrc}})
            }
        }, [pickedEmoteIDs])
            
        const removeEmote = function(imgSrc, imgName){
            const newIDs = new Set(this.state.pickedEmoteIDs)
            const newEmotes = {...this.state.emotes}
            
            newIDs.delete(imgName)
            delete newEmotes[imgName]
            
            this.setState({pickedEmoteIDs: newIDs})
            this.setState({emotes: newEmotes})
        }*/
                
        return <div id = "page_div">
            <input type="number" id="emoteDensityInput"></input>
            <input type="text" id="emoteURLInput" onChange = { (e) => this.updateData(e, "imageURL") }></input>
            <button type="button" id="emoteDataSubmit" onClick={ this.sendData }>Submit</button>
            <EmoteSourceContainer emoteCategories={ this.state.emoteCategories }/>
        </div>
    }
}

export default App