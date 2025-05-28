import axios from "axios";

export default {

    sendPostLocationRequest(userId, locationInfo) {
        return axios.post("/location", locationInfo, {
            params: {
                userId: userId
            }
        })
    },
    sendGetLocationRequest(locationId) {
        return axios.get("/location/" + locationId)
    },


}