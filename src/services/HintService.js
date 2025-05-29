import axios from "axios";

export default {
    sendGetHintsRequest(locationId) {
        return axios.get('/hints', {
                    params: {
                        locationId: locationId
                    }
        })
    }
}