
class MarvelService {

    _apibase = 'https://gateway.marvel.com:443/v1/public/';
    _apikey = 'apikey=3667c33483e21c61a3a360a877b318b2';
    _offset = 210;
    getResource = async (url) => {
        let res = await fetch(url);
    
        if (!res.ok) {
            throw new Error(`Coul not fetch ${url}, status : ${res.status}`);
        }
    
        return await res.json();
    }

    getAllCharacters = async (offset = this._offset) => {
        const res = await this.getResource(`${this._apibase}characters?limit=9&offset=${offset}&${this._apikey}`);
        return res.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const res =  await this.getResource(`${this._apibase}characters/${id}?${this._apikey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (char) => {
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
}

export default MarvelService;