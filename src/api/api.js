import * as axios from "axios";

const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    params: {
        "api_key": "7bf0ddbd0b708dd904d550607793fa52",
        "language": "en-US"
    }
});

export const tmdbAPI = {
    getListActors(query) {
        return instance.get(`search/person?language=en-US&query=${query}&page=1&include_adult=true`)
            .then(response => {
                return response.data;
            });
    },
    getListFilms(id) {
        return instance.get(`person/${id}/movie_credits?`)
            .then(response => {
                return response.data.cast;
            });
    },
    getActor(id) {
        return instance.get(`person/${id}?`)
            .then(response => {
                return response;
            })
            /*.catch(error => {
                return error.response;
            })*/;
    }
};
