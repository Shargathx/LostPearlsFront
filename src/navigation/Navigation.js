import router from "@/router";

export default {

    navigateToLoginView(){
        router.push({username: 'loginRoute'})
    },

    navigateToGamesView(){
        router.push({username: 'gamesRoute'})
    },

    navigateToErrorView() {
      //  router.push({name: 'errorView'})
    }

}