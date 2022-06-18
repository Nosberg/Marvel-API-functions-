import { useState, useEffect} from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';

import './charList.scss';
import ErrorMessage from '../errorMessage/ErrorMessage';
import PropTypes from 'prop-types';


function useInput(initialValue) {
    const [value, setValue] = useState(initialValue);

    const onChange = e => {
        setValue(e.target.value);
    }

    return {value, onChange}
}
const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const {loading, error, getAllCharacters} = useMarvelService();

    useEffect(() => {
        setNewItemLoading(false);
        getAllCharacters()
            .then(onCharListLoaded)
            // eslint-disable-next-line
    }, [])

    const onCharListLoaded = (newCharList) => {

        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended);
    } 

    // Дозагрузка элементов
    const onLoadMore = (offset) => {
        setNewItemLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded)
    }



    let arr = charList.map(item => {
        let classNames = 'char__img';

        if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
            classNames += ' object-contain';
        }


        return (
            <li className="char__item" key={item.id} onClick={() => props.onCharSelected(item.id)}>
                <img src={item.thumbnail} alt="" className={classNames}/>
                <div className="char__name">{item.name}</div>
            </li>
        )
    });

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading  && !newItemLoading ? <Spinner/> : null;
        
       
        
        return (
            <div className="char__list">
                <ul className="char__grid">
                    {errorMessage}
                    {spinner}
                    {arr}
                </ul>
                <button className="button button__main button__long" disabled={newItemLoading} onClick={() => onLoadMore(offset)} style={{display: charEnded ? 'none' : 'block'}}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;