import { updateCategories } from './emoteCategoryUtils.js'

const WEBSOCKET_URL = "ws://localhost:2999"
const WEBSOCKET_PROTOCOLS = ["streamerController"]
const WEBSOCKET_RECONNECT_TIMEOUT = 5000

export function connectWebsocket(component, callback) {
    let websocket = new WebSocket(WEBSOCKET_URL, WEBSOCKET_PROTOCOLS)

    websocket.onmessage = (event) => {
        const msg = JSON.parse(event.data)
        const data = msg.data
        const type = msg.type
        console.log("Recieved Message")
        console.log(msg)
        switch(type) {
            case "recievedEmotes":
                console.log(data)
                console.log(component)
                try {
                    //TODO: Move to own function?
                    const updatedCategories = updateCategories(component.state.emoteCategories, data['emotes'])
                    console.log("Updating data")
                    console.log(data['sounds'])
                    
                    //TODO: Make it so that this doesnt add twice in strict mode.
                    const updatedSounds = [...component.state.sounds]
                    data['sounds'].forEach(document => {
                        updatedSounds.push(document)
                    })
                    component.setState({ emoteCategories: updatedCategories })
                    component.setState({ sounds: updatedSounds })
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
        setTimeout(() => connectWebsocket(component, callback), WEBSOCKET_RECONNECT_TIMEOUT)
    }

    callback(websocket)
}