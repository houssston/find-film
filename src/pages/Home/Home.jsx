import React, {useEffect, useRef, useState} from 'react';
import {tmdbAPI} from "../../api/api";
import s from "./Home.module.css";
import cn from "classnames";

import noPoster from "../../assets/img/noposter.jpg";
import noPhoto from "../../assets/img/nophoto.jpg";
import addIcon from "../../assets/img/add-icon.png";
import removeIcon from "../../assets/img/remove-icon.png";
import {useHistory} from "react-router";


const Home = (props) => {
    const [actorName, setActorName] = useState("");
    const [debounce, setDebounce] = useState(actorName);
    const [actorsList, setActorsList] = useState([]);
    const [actorsListIsShow, setActorsListIsShow] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState([]);

    const searchField = useRef(null);
    const searchFieldWrapper = useRef(null);

    const history = useHistory();
    const urlParams = new URLSearchParams(history.location.search);


    useEffect(async () => {
        if (urlParams.getAll('actor').length > 0) {
            setIsFetching(true);
            for (let pair of urlParams.entries()) {
                try {
                    let response = await tmdbAPI.getActor(pair[1]);
                    await props.getActorData(response.data);
                }catch(error) {
                    const actorsIdInUrl = urlParams.getAll('actor');
                    urlParams.delete("actor");
                    for (let actorId of actorsIdInUrl) {
                        actorId !== pair[1] && urlParams.append('actor', `${actorId}`);
                    }
                    history.push(`/?${urlParams}`);
                }
            }
            setIsFetching(false);
        }
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            if (searchFieldWrapper.current && !searchFieldWrapper.current.contains(event.target)) {
                setActorsListIsShow(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [searchFieldWrapper]);

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            setDebounce(actorName);
        }, 1000);
        return () => {
            clearTimeout(debounceTimer);
        };
    }, [actorName]);

    useEffect(() => {
        const searchActors = async () => {
            const response = await tmdbAPI.getListActors(debounce);
            actorName && response.results.length < 1
                ? setActorsList([false])
                : setActorsList(response.results)

        };
        if (debounce) {
            searchActors();
        }
    }, [debounce]);

    const handleChangeParamURL = (id) => {
        const actorsIdInUrl = urlParams.getAll('actor');

        if (actorsIdInUrl.includes(id.toString())) {
            urlParams.delete("actor");
            for (let actorId of actorsIdInUrl) {
                parseInt(actorId) !== id && urlParams.append('actor', `${actorId}`);
            }
        } else {
            urlParams.append('actor', `${id}`);
        }

        history.push(`/?${urlParams}`);
    };

    const handleInputActorName = (e) => {
        e.target.value === "" && setActorsList([]);
        setActorName(e.target.value);
    };

    const handleClickOnActorName = (id) => {
        setActorName("");
        handleChangeParamURL(actorsList[id].id);
        props.getActorData(actorsList[id]);
        setActorsList([]);
    };

    return (
        <main>
            <div className={s.search_actors}>
                <div className={s.wrapper}>

                    <div className={s.search_title}>Search <span>movies</span> by actors</div>
                    <div className={s.search_field_wrapper} ref={searchFieldWrapper}>
                        <input className={s.search_field} placeholder={'Tom Cruise'} type={'text'} value={actorName}
                               onChange={e => handleInputActorName(e)}
                               onFocus={() => setActorsListIsShow(true)}
                               ref={searchField}/>
                        <svg className={s.search_icon} focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                            <path
                                d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                        </svg>
                        <div className={s.search_list}>
                            {actorsListIsShow &&
                            actorsList.map((item, id) => (
                                actorsList[0] === false
                                    ?
                                    <div className={s.search_list_item}>
                                        Not Found
                                    </div>
                                    : !props.actors.some((i) => i.id === item.id) &&
                                    <div className={s.search_list_item} key={item.id}
                                         onClick={() => handleClickOnActorName(id)}>
                                        {item.name}
                                    </div>
                            ))
                            }
                        </div>
                    </div>
                    <div className={s.actors_list}>
                        {!isFetching &&
                        props.actors.map((item) => (
                            <div className={s.actors_list_item} key={item.id}>
                                <div className={s.actor_img_wrapper}>
                                    {item.profile_path
                                        ? <img className={s.actor_img}
                                               src={`https://image.tmdb.org/t/p/w185${item.profile_path}`}
                                               alt="item.name"/>
                                        : <img className={s.actor_img} src={noPhoto} alt={item.name}/>
                                    }
                                    <img className={s.img_hidden_block} alt={"Remove actor"} src={removeIcon}
                                         onClick={() => handleChangeParamURL(item.id) & props.removeActorData(item.id)}/>
                                </div>
                                <div className={s.actor_name}>{item.name}</div>
                            </div>
                        ))
                        }
                        <div className={s.actors_list_item}>
                            <img className={s.actor_img} src={addIcon} onClick={() => searchField.current.focus()}
                                 alt={"Add actor"}/>
                        </div>
                    </div>
                </div>
            </div>
            {!isFetching &&
            <div className={cn(s.movies_list, s.wrapper)}>
                {props.jointFilms.map((item) => (
                    <div key={item.id} className={s.movies_list_item}>
                        <div className={s.movie_img_wrapper}>
                            {item.poster_path
                                ?
                                <img className={s.movie_img} src={`https://image.tmdb.org/t/p/w185${item.poster_path}`}
                                     alt={item.title}/>
                                : <img className={s.movie_img} src={noPoster} alt={item.title}/>
                            }
                            {item.release_date &&
                            <div className={s.movie_year_released}>{item.release_date.substr(0, 4)}</div>}
                        </div>
                        <div className={s.movie_title}>{item.title}</div>
                    </div>
                ))}
            </div>
            }
            {props.actors.length === 0 && props.jointFilms.length === 0 &&
            <div className={cn(s.movies_not_found, s.wrapper)}> Fill in the field required for search </div>
            }
            {props.actors.length > 0 && props.jointFilms.length === 0 &&
            <div className={cn(s.movies_not_found, s.wrapper)}> No results </div>
            }
        </main>
    );

};

export default Home;
