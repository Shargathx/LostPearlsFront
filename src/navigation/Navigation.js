import router from "@/router";

export default {

    navigateToLoginView(){
        router.push({name: 'loginRoute'})
    },

    navigateToGamesView(){
        router.push({name: 'gamesRoute'})
    },

    navigateToErrorView() {
      //  router.push({name: 'errorView'})
    },

    navigateToGameView() {
        router.push({name: 'gameRoute'})
    },

}