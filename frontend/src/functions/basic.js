import axios from 'axios';
import url from "../url.json"
let serverAdd = url.server+"/api/";
axios.defaults.withCredentials = true
export default function apiPost(add, params={}, a) {
    axios.post(serverAdd + add, params
    ).then((response) => {
        if (response.data) a(response.data);
    }
    ).catch(err => {
        a(err.response.data);
     })
}
export function apiCheckLogin(a) {
    axios.post(serverAdd + "auth/logincheck"
    ).then((response) => {
        if (response.data) a(response.data);
    }
    ).catch(err => {
        a(err.response.data);
    })
}