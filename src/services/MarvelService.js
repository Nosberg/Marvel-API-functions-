
class MarvelService {

    _apibase = 'https://gateway.marvel.com:443/v1/public/';
    _apikey = 'apikey=3667c33483e21c61a3a360a877b318b2';
    getResource = async (url) => {
        let res = await fetch(url);
    
        if (!res.ok) {
            throw new Error(`Coul not fetch ${url}, status : ${res.status}`);
        }
    
        return await res.json();
    }

    getAllCharacters = () => {
        return this.getResource(`${this._apibase}characters?limit=9&offset=210&${this._apikey}`);
    }

    getCharacter = (id) => {
        return this.getResource(`h${this._apibase}characters/${id}?${this._apikey}`);
    }
}

export default MarvelService;