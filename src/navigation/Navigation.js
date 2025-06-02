import router from "@/router";

export default {

    navigateToLoginView(){
        router.push({name: 'loginRoute'})
    },

    navigateToRegistration() {
        router.push({name: 'registration'})
    },

    navigateToGamesView(){
        router.push({name: 'gamesRoute'})
    },



    navigateToErrorView() {
      //  router.push({name: 'errorView'})
    },

    navigateToGameView(gameId) {
        router.push({name: 'gameRoute',
        query: {gameId: gameId}
        })
    },

    navigateToLocationEditView(locationId) {
        router.push({name: 'locationRoute',
        query: {locationId: locationId}
        })
    },

    navigateToLocationView() {
        router.push({name: 'locationRoute'})
    },

}