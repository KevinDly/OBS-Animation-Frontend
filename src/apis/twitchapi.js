import { updateCategory } from '../utils/emoteCategoryUtils'

const TWITCH_GLOBAL_EMOTES_URL = 'https://api.twitch.tv/helix/chat/emotes/global'
const TWITCH_VALIDATION_URL = 'https://id.twitch.tv/oauth2/validate'
const TWITCH_CLIENT_ID = 'bmkhxh3eb8cl8uvtkwm6fbrahzgkdx'

const TWITCH_OAUTH_URL = 'https://id.twitch.tv/oauth2/token'
const TWITCH_CLIENT_SECRET = 'vh3a92zgt8617h0er1ohymnrn71nlt'

//TODO: Replace a, b.
//Function that grabs the emotes from a connected api.
function getEmotes(component, source, {access_token, a, b}) {
    if(component.state.didConnect[source]) {
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
            let updatedEmoteCategory = updateCategory(component.state.emoteCategories, source, response)
            component.setState({ emoteCategories: updatedEmoteCategory }) 
        })
        
        component.setState({didConnect: {...component.state.didConnect, [source]: true}})
    }
}

//Function that will attempt to connect to twitch.tv's api.
//TODO: Refactor to be just a connection function => take a lambda that is specific per api
export function connectTwitch(component, source) {
    if(component.state.didAuthenticate[source]) {
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
        getEmotes(component, source, response)
        component.setState({didAuthenticate: {...component.state.didAuthenticate, [source]: true}})
    })
}