import axios from "axios";

export default {

    sendGetCountyRequest(countyId) {
        return axios.get("/county/" + countyId)
    },

    getAllCounties() {
        return axios.get('/counties')
    },

}