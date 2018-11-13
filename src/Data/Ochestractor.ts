import {sendToApi} from '../Store'
import {createPlayList,getTop20} from '../Utils'

export function getArtist(artist:string){
    const baseurl = 'https://api.spotify.com/v1/search';
    const dataType = 'json';
    const data = {
		type: 'artist',
		q: artist
    
    };

    const response = sendToApi(baseurl,dataType,data);
    return response;
    
}

export function getArtistAlbum(id:number){
    const baseurl = `https://api.spotify.com/v1/artists/${id}/albums`;
    const dataType = 'json';
	const data = {
		album_type: 'album',
    }

    const response = sendToApi(baseurl,dataType,data);
    return response
}

export function getAlbumsTracks(id:number){
    const baseurl = `https://api.spotify.com/v1/albums/${id}/tracks`;
    const dataType = 'json';

    const response = sendToApi(baseurl,dataType);
    return response;
}

export function getAlbum(artists){
    var albums = artists.map(artist => getArtistAlbum(artist.id)).promise(...albums)
		.then((...albums) => {
			var albumIds = albums
				.map(a => a[0].items)
				.reduce((prev,curr) => [...prev,...curr] ,[])
                .map(album => getAlbumsTracks(album.id))
                .getTracks(albumIds);
        });
    return albums;
}

export function getTracks(tracks){
    const baseurl = 'https://embed.spotify.com/?theme=white&uri=spotify:trackset:My Playlist:';
    const response = tracks.promise(tracks)
		            .then((tracks) => {
                    tracks = tracks
                    .map(tracks[0].items)
				    .reduce((prev,curr) => [...prev,...curr],[]);	
			         const randomPlayList = getTop20(tracks);
			        return createPlayList(baseurl,randomPlayList,)
	})
    return response
}