class Storage{

    static getSearchedUserFromStorage(){
        //Storage'daki kullanicilari alma

        let users;
        if(localStorage.getItem("searched") === null){

            users = []

        }

        else{

            users = JSON.parse(localStorage.getItem("searched"))

        }

        return users


    }

    static addSearchedUserFromStorage(username){

        let users = this.getSearchedUserFromStorage()

        if(users.indexOf(username) === -1){
            
            users.push(username)

        }

        localStorage.setItem("searched",JSON.stringify(users))

    }

    static clearAllSearchedUsersFromStorage(){

        localStorage.removeItem("searched")

    }

}