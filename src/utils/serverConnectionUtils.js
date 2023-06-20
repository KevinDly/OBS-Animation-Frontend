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
        setTimeout(() => connectWebsocket(component, callback), WEBSOCKET_RECONNECT_TIMEOUT)
    }

    callback(websocket)
}