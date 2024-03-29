import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import RemoteStatus from '../../store/remote-status';
import { heroesSelector, loadHeroes } from '../../store/heroes.slice';

const HeroesList = () => {
    const heroes = useSelector(heroesSelector);
    const heroesFilter = useSelector(state => state.heroFilters.heroesFilter);
    const heroesRemoteStatus = useSelector(state => state.heroes.heroesRemoteStatus)
    const dispatch = useDispatch();

    const filteredHeroes = heroes.filter(value => {
        if (heroesFilter !== "all") {
            return value.element === heroesFilter;
        } else {
            return true;
        }
    });

    useEffect(() => {
        dispatch(loadHeroes());

        // eslint-disable-next-line
    }, []);

    if (heroesRemoteStatus === RemoteStatus.Loading) {
        return <Spinner />;
    } else if (heroesRemoteStatus === RemoteStatus.Error) {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(({ id, ...props }) => {
            return <HeroesListItem key={id} id={id} {...props} />
        })
    }

    const elements = renderHeroesList(filteredHeroes);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;