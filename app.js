// Elementleri Secme
const gitForm = document.querySelector("#github-form")
const inputName = document.querySelector("#githubname")
const lastUsers = document.querySelector("#last-users")
const clearLastUsers = document.querySelector("#clear-last-users")

//Github Objesi Baslatma
const github = new Github()

//UI objesi baslatma
const ui = new UI()

eventListener()

function eventListener(){

    gitForm.addEventListener("submit",getData)
    clearLastUsers.addEventListener("click",clearAllUsers)
    document.addEventListener("DOMContentLoaded",getAllSearched)

}

function getData(e){

    const username = inputName.value.trim()
    
    if(username === ""){

        ui.showAlert("danger","Lutfen kullanici adini doldurunuz.")

    }

    else{

        

        github.getGitHubData(username)
        .then((result) => {
            if(result.user.message === "Not Found"){
                ui.showAlert("danger","Kullanici bulunamadi.")
            }
            else{
                ui.addSearchedUserToUI(username)
                Storage.addSearchedUserFromStorage(username)
                ui.showUserInfo(result.user)
                ui.showRepoInfo(result.repo)

                ui.showAlert("success","Kullanici basariyla eklendi")
    
            }
        }).catch((err) => {
            console.log(err)
        });

    }

    ui.clearInput() // input temizleme
    e.preventDefault()
}

function clearAllUsers(){
    // Tum arananlari temizle

    if(confirm("Tum arananlari silmek istediginize emin misiniz?")){

        Storage.clearAllSearchedUsersFromStorage()
        ui.clearAllSearchedFromUI()
        ui.showAlert("success","Tum son aramalar silindi.")
        }

    }



function getAllSearched(){
    //Arananlari Storagedan Al ve UI' ya ekle

    let users = Storage.getSearchedUserFromStorage()

    let result = ''
    users.forEach(user =>{

        result += `<li class="list-group-item">${user}</li>`

    })

    lastUsers.innerHTML = result
}