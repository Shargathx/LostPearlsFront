import axios from "axios";
import Navigation from "@/navigation/Navigation";

export default {

    sendPostLocationRequest(userId, locationInfo) {
        return axios.post("/location", locationInfo, {
            params: {
                userId: userId
            }
        })
    },
    sendGetLocationRequest(locationId) {
        return axios.get("/location/" + locationId)
    },

    sendPutLocationRequest(locationId, locationInfo) {
        return axios.put(`/location/${locationId}`, locationInfo)
    },

    sendGetUserLocationsRequest(userId) {
        return axios.get('/locations/all', {
                params: {
                    userId: userId
                }
            }
        );
    },

    sendGetRandomLocationByCounty(countyId, userId) {
        return axios.get('/random_location', {
            params: {countyId, userId}})
    },


}