import axios from "axios";
import qs from 'qs';
import auth_data from "../config/config";

const getToken = () => {
    console.log(btoa(auth_data.CLIENT_ID+":"+auth_data.CLIENT_SECRET));
    return axios.post(
        auth_data.API_TOKEN_URL,
        qs.stringify({
            "grant_type":auth_data.GRANT_TYPE
        }),
        {
            headers: {
                "content-type":"application/x-www-form-urlencoded",
                "Authorization": "Basic " + btoa(auth_data.CLIENT_ID+":"+auth_data.CLIENT_SECRET)
            }
        },
    ).then((response) => {
        return response.data;
    })
};

export default {
    getToken
}