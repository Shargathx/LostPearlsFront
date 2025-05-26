import axios from "axios";

export default {

    sendGetGameRequest(gameId)
{
        return axios.get('/game', {
            params: {
                gameID: gameId
        }
    })
    }
}