import React, {useEffect, useState} from 'react';
import {tmdbAPI} from "../../api/api";

const Home = (props) => {
    const [actorName, setActorName] = useState("");
    const [debounce, setDebounce] = useState(actorName);
    const [actorsList, setActorsList] = useState([]);
    //const [actorsListIsShow, setActorsListIsShow] = useState(false);

    useEffect(() => {
        const debounceTimer = setTimeout(() => {

            setDebounce(actorName);
        }, 500);
        return () => {
            clearTimeout(debounceTimer);
        };
    }, [actorName]);

    useEffect(() => {
        const searchActors = async () => {
            const response = await  tmdbAPI.getPersonList(debounce);
            setActorsList(response.results);
        };
        if (debounce) {
            searchActors();
        }

    }, [debounce]);

    const handleChangeActorName = (e) => {
        e.target.value === "" && setActorsList([]);//&& setActorsListIsShow(false)
        //e.target.value && !actorsListIsShow && setActorsListIsShow(true);
        setActorName(e.target.value)
    };

    const handleClickOnActorName = (name,id) => {
        setActorName("");
        //setActorsList([actorsList[id]]);
        props.setActor(actorsList[id]);
        setActorsList([]);

        //setActorsListIsShow(false)
    };
    //console.log(actorsList);
    /*const handleFocusOnActorName = () => {
        actorName && setActorsListIsShow(true)
    };*/
   return (
        <>
            <input type="text" value={actorName} onChange={e => handleChangeActorName(e)} />
            {
                actorsList.map((item, id) => (
                    <div key={item.id} onClick={() => handleClickOnActorName(item.name,id)}>
                        {item.name}
                    </div>
                ))

            }
            {
                props.actors.map((item) => (
                    <div key={item.id} >
                        <img src={`https://image.tmdb.org/t/p/w185${item.profile_path}`} alt=""/>
                        {item.name}
                    </div>
                ))
            }
        </>
    );

};

export default Home;
