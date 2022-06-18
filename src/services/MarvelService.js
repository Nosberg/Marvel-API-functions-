import {useHttp} from '../hooks/http.hook.js';


const useMarvelService = () => {

    const {loading, request, error, clearError} = useHttp();

    const _apibase = 'https://gateway.marvel.com:443/v1/public/';
    const _apikey = 'apikey=3667c33483e21c61a3a360a877b318b2';
    const _offset = 210;
    const _offsetComics = 0;

    const getAllCharacters = async (offset = _offset) => {
        const res = await request(`${_apibase}characters?limit=9&offset=${offset}&${_apikey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res =  await request(`${_apibase}characters/${id}?${_apikey}`);
        return _transformCharacter(res.data.results[0]);
    }

    // const getComics = async () => {
    //     const res = await request(`${_apibase}comics?limit=8&${_apikey}`);
    //     return res.data.results;
    // }

    const getComics = async (offset = _offsetComics) => {
        const res = await request(`${_apibase}comics?limit=8&offset=${offset}&${_apikey}`);
        return res.data.results;
    }

    const getComic = async (id) => {
        const res = await request(`${_apibase}comics/${id}?${_apikey}`)
        return res.data.results;
    }

    const _transformCharacter = (char) => {
        if (char.description === '') {
            char.description = 'description is not found';
        }
        if (char.description.length >= 200) {
            char.description = `${char.description.slice(0, 200)}...`;
        }

        return {
            name: char.name,
            id: char.id,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    return {loading, error, getAllCharacters, getCharacter, clearError, getComics, getComic}
}

export default useMarvelService;