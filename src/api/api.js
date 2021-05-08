import * as axios from "axios";

const instance = axios.create({
    baseURL: 'TEMPALTE',
        header:{

        },
        params: {
    }
});

export const TEMPALTE = {
    TEMPALTEquery(query){
        return instance.get(``)
            .then(response => {
                return response.data;
            });
    }
};



