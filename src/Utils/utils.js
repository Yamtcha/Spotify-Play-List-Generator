import {getArtist,getAlbum} from '../Data'

/*
 Generate playlist
*/
export function createPlayList(baseUrl, songs){
    songs = songs.map(song => song.id).join(',');
    const newSongs = baseUrl + songs
    return songs;
}

/*
 getTop20 is going to creat a randomly selected 20 tracks from the tracklist that we have generated 
*/
export function getTop20(tracks){
    const Results = [];
	for(let i = 0; i < 20 ; i++) {
		Results.push(tracks[ Math.floor(Math.random() * tracks.length) ])
	}
	return Results;
}

export function Search(search){
    const query = search.split(',').map(getArtist);
	const playlist = query.promise(...query)
			.then((...artists) => {
				artists = artists.map(artist => artist[0].artists.items[0]);
				return getAlbum(artists);
	});
    return playlist;
}

