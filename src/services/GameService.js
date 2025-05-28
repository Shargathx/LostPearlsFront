import axios from "axios";

export default {

    sendGetGameRequest(gameId) {
        return axios.get('/game', {
            params: {
                gameId: gameId
            }
        })
    },

    sendPutGameRequest(gameId, game) {
        return axios.put('/game', null, {
            params: {
                gameId: gameId,
                game: game
            }
        })
    }
}

