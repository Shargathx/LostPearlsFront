import axios from "axios";

export default {

    sendPostLocationRequest(loginName, password) {
        return axios.get('/login', {
            params: {
                loginName: loginName,
                password: password
            }
        });
    },
}