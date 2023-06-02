function mapEmotes(data){
    return { imgSrc: data.images.url_4x,
    imgName: data.name }
}


export function updateCategory(category, source, response) {
    console.log(category)
    console.log(source)
    console.log("Updating category")
    return {...category, 
        [source] : {
            data: response.data.map(emoteData => mapEmotes(emoteData))}}
}
