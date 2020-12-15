export async function searchSongs(searchTerm, pageToken){
    let url = "https://mix-n-mash.herokuapp.com/youtube?term=" + searchTerm;

    if(pageToken){
        url += "&pageToken=" + pageToken;
    }

    const rawResponse = fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json"
        }
    });

    const response = await rawResponse;

    // TODO - Error checking
    return response.json();
}