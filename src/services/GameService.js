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


    sendPostGameRequest(countyId, userId) {
        return axios.post('/game', null, {
            params: {
                countyId: countyId,
                userId: userId

            }
        })
    },

    getUserGamesInProgress() {
        const userId = this.userId || 1;
        return axios.get(`/games/${userId}/games-in-progress`)
            .then(response => response.data)
            .catch(() => console.error("Failed to fetch games in progress:"));
    }

}
