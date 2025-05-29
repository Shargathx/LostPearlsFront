import axios from "axios";

export default {
    sendGetKeywordRequest(locationId) {
        return axios.get("/keywords", {
                params: {
                    locationId: locationId
                }
            }
        )
    },


}