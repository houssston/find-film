import React, {useEffect, useState} from 'react';
import {tmdbAPI} from "../../api/api";

import background1 from "../../assets/img/back1.jpg"

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
            const response = await tmdbAPI.getListActors(debounce);
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

    const handleClickOnActorName = (name, id) => {
        setActorName("");
        props.getActorData(actorsList[id]);
        setActorsList([]);
        //setActorsListIsShow(false)
    };
    console.log("render");
    /*const handleFocusOnActorName = () => {
        actorName && setActorsListIsShow(true)
    };*/

    return (
        <div>
            <div>
                <input type={'text'} value={actorName} onChange={e => handleChangeActorName(e)}/>
            </div>
            <div>
                {
                    actorsList.map((item, id) => (
                        <div key={item.id} onClick={() => handleClickOnActorName(item.name, id)}>
                            {item.name}
                        </div>
                    ))
                }
                {
                    props.actors.map((item) => (
                        <div key={item.id}>
                            <img src={`https://image.tmdb.org/t/p/w185${item.profile_path}`} alt=""/>
                            {item.name}
                        </div>
                    ))
                }
            </div>


            {props.getJointFilms.map((item) => (<div key={item.id}>

                {item.original_title}
            </div>))}

        </div>
    );

};
/*
const Main = styled.main``;

const Wrapper = styled.div`
    max-width: 1170px;
    margin: 0 auto;
    padding: 0 30px;
    `;

const Search = styled.input`
    padding: 12px 10px;
    width: 100%;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    border: none;
    outline: none;
            `;

const ActorsList =styled.div`
    background-image: url(${background1});
    background-repeat: repeat-x;
    background-position: center;
    background-size: cover;
`;
*/


export default Home;
