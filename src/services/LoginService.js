import axios from "axios";

export default {

    sendGetLoginRequest(loginName, password) {
        return axios.get('/login', {
            params: {
                loginName: loginName,
                password: password
            }
        });
    }

}