import * as axios from "axios";

const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    params: {
        "api_key": "7bf0ddbd0b708dd904d550607793fa52",
        "language": "ru"
    }
});

export const tmdbAPI = {
    getPersonList(query){
        return instance.get(`search/person?language=en-US&query=${query}&page=1&include_adult=true`)
            .then(response => {
                return response.data;
            });
    }
};
