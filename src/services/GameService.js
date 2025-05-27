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
        return axios.patch('/game', null, {
            params: {
                gameId: gameId,
            }
        })
    },

}

