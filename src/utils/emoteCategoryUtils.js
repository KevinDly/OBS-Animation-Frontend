function mapEmotes(data){
    return { imgSrc: data.images.url_4x,
    imgName: data.name }
}

function formatEmoteData(emotes) {
    return { data: emotes.data.map(emoteData => mapEmotes(emoteData)) }
}

/*Function that returns an updated version of the categories dict.
currentCategories: The dict to be updated.
recievedCategories: The emotes to add to the dict.*/
export function updateCategories(currentCategories, recievedCategories) {
    let updatedCategories = {...currentCategories}
    Object.keys(recievedCategories).forEach((key) => {
        if(!(key in updatedCategories))
            updatedCategories[key] = formatEmoteData(recievedCategories[key])
    })
    return updatedCategories
}
