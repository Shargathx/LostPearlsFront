import axios from "axios";

export default {

    sendGetGameRequest(gameId) {
        return axios.get('/game', {
            params: {
                gameId: gameId
            }
        })
    },

    sendPatchGameRequest(gameId) {
        return axios.patch('/game/started', null, {
            params: {
                gameId: gameId

            }
        })
    },


    sendPostGameRequest(locationId, userId) {
        return axios.post('/game', null, {
            params: {
                locationId: locationId,
                userId: userId

            }
        })
    },
}
