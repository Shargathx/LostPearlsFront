import axios from "axios";

export default {
    sendGetKeywordsRequest(locationId) {
        return axios.get("/keywords", {
                params: {
                    locationId: locationId
                }
            }
        )
    },

    sendGetKeywordRequest(keywordId) {
        return axios.get("/keyword", {
                params: {
                    keywordId: keywordId
                }
            }
        )
    },

    sendDeleteKeywordRequest(keywordId) {
        return axios.delete('/keyword', {
                params:{
                    keywordId: keywordId
                }
            }
        )
    },

    sendAddKeywordRequest(keyword) {
        return axios.post('/keyword', keyword)

    },


}