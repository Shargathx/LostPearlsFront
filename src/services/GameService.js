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

    sendPatchGameCompletedRequest(gameId, hintsUsed) {
        return axios.patch('/game/completed', null, {
                params: {
                    gameId: gameId,
                    hintsUsed: hintsUsed
                }
            })
    },


    sendPostGameRequest(countyId, userId) {
        return axios.post('/game', null, {
            params: {
                countyId: countyId,
                userId: userId

            }
        })
    },


    getUserGamesInProgress(userId) {
        return axios.get('/games-in-progress-info', {
            params: {
                userId: userId
            }
        })
    }
}
