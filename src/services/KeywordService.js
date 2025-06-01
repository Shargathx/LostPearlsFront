import axios from "axios";

export default {

    sendGetKeywords(locationId) {
        return axios.get('/keywords', {
                params: {
                    locationId: locationId
                }
            })
    },
}