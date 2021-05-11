import React, {useEffect, useState} from 'react';
import {tmdbAPI} from "../../api/api";

const Home = () => {
    const [personNameList, setPersonNameList] = useState([]);
    const [personName, setPersonName] = useState("");

    //const debouncedSearchTerm = useDebounce(searchTerm, 500);

    async function getPersonList(event) {
        setPersonName(event.target.value);
        const response = await tmdbAPI.getPersonList(personName);
        setPersonNameList(response.results);
    }

    useEffect(() => {

    }, []);

    return (
        <>
            <input type="text" value={personName} onChange={event => getPersonList(event)}/>
            <ul>
                {personName.length > 0
                && personNameList.map(item => (
                    <li key={item.id}>
                        {item.name}
                    </li>
                ))
                }
            </ul>
        </>
    );
};

export default Home;
