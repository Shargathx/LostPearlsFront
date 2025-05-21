import axios from "axios";


export default {



    sendPostRegistrationRequest(user) {
      return axios.post('/registration', user)
    },


}
