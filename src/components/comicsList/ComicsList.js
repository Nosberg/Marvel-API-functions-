import './comicsList.scss';
import useMarvelService from '../../services/MarvelService';
import { useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { Link } from 'react-router-dom';

const ComicsList = () => {
    const [comics, setComics] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const {loading, error, getComics} = useMarvelService();

    useEffect(() => {
        setNewItemLoading(false);
        getComics()
            .then(res => setComics(res));
    }, []);

    const onLoadMoreComics = () => {
        setNewItemLoading(true);
        getComics(offset)
            .then(res => setComics(comics => [...comics, ...res]));
        setOffset(offset => offset + 8);
        setNewItemLoading(false);
    }

    const content = comics.map((item, i) => {
        return (
            <li key={i} className="comics__item">
                    <Link to={`/comics/${item.id}`}>
                        <img src={`${item.thumbnail.path}.${item.thumbnail.extension}`} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.prices[0].price + ' $'}</div>
                    </Link>
            </li>
        )
    })

    console.log('batch');
    const spinner = loading && !newItemLoading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    return (
        <div className="comics__list">
            <ul className="comics__grid">
                {errorMessage}
                {content}
                {spinner}
            </ul>
            <button className="button button__main button__long" disabled={newItemLoading} onClick={onLoadMoreComics}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;