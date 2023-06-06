function mapEmotes(data){
    return { imgSrc: data.images.url_4x,
    imgName: data.name }
}


function updateCategory(category, source, emotes) {
    console.log(category)
    console.log(source)
    console.log("Updating category")
    return {...category, 
        [source] : {
            data: emotes.data.map(emoteData => mapEmotes(emoteData))}}
}

/*Function that grabs the emotes from a connected api.
component is the component that will store the emote information. component must have a state called emoteCategories that is related to a dict of sources: emotes.
source is a string describing the origin of the emotes. This source will be displayed on the webpage.
emotes is a dict of emotes, containing a parameter known as data. data is an array that has emote information. Particularly an image source and an image name. */

export function updateEmoteCategories(component, source, emotes) {
    if(!(source in Object.keys(component.state.emoteCategories))) {
        let updatedEmoteCategory = updateCategory(component.state.emoteCategories, source, emotes)
        component.setState({ emoteCategories: updatedEmoteCategory })
    }
}