import {
    getUserToken,
    getProfileInfo,
    getAllMyPets,
    createNewPet,
    updateProfileInfo,
    updatePetById,
    userDeleteProfile,
    deletePetById
} from "./requests.js"

function logout() {

    const logoutBtn = document.querySelector("#logout")

    logoutBtn.addEventListener("click", () => {

        localStorage.clear()
        window.location.replace("/")
    })
}

function backHome() {

    const homeBtn = document.querySelector("#home")

    homeBtn.addEventListener("click", () => {

        window.location.replace("/src/pages/dash.html")
    })
}

async function renderProfilePage() {

    const userLogged = getUserToken()

    if (!userLogged) {
        window.location.replace("/")
    }

    const infoProfile = await getProfileInfo()

    const { name, email, avatar_url } = infoProfile

    const profileImage = document.querySelector(".section__user--container > img")
    const profileName = document.querySelector(".user__name > span")
    const profileEmail = document.querySelector(".user__email > span")

    profileImage.src = avatar_url
    profileImage.alt = name
    profileName.innerText = name
    profileEmail.innerText = email
}

function renderDeleteUserModal() {

    const modal = document.querySelector(".delete__user--modal")
    const deleteUserBtn = document.querySelector(".delete__user--account")

    deleteUserBtn.addEventListener("click", () => {

        modal.showModal()
        deleteProfile()
    })

    closeDeleteUserModal()
}

function closeDeleteUserModal() {

    const modal = document.querySelector(".delete__user--modal")
    const closeBtn = document.querySelector(".close__delete--user")
    const noDeleteBtn = document.querySelector("#no_delete")

    closeBtn.addEventListener("click", () => {

        modal.close()
    })

    noDeleteBtn.addEventListener("click", () => {

        modal.close()
    })
}

function deleteProfile() {

    const btnDeleteUser = document.querySelector('#delete_user')
    
    btnDeleteUser.addEventListener('click', async() => {
        
        const userDeleted = await userDeleteProfile()
        localStorage.clear()
        window.location.replace('/')

    })
}



async function renderUpdateUserModal() {

    const modal = document.querySelector(".update__user--modal")
    const updateUserBtn = document.querySelector(".update__user--info")
    const profile = await getProfileInfo()

    updateUserBtn.addEventListener("click", () => {
        const userName = document.querySelector('#user_name')
        const userAvatar = document.querySelector('#user_avatar')

        userName.value = profile.name
        userAvatar.value = profile.avatar_url

        modal.showModal()
    })

    updateUser()
    closeUpdateUserModal()
}

function closeUpdateUserModal() {

    const modal = document.querySelector(".update__user--modal")
    const closeBtn = document.querySelector(".close__update--user")

    closeBtn.addEventListener("click", () => {

        modal.close()
    })
}

function updateUser() {

    const btnUpdateUser = document.querySelector('#update_user')
    const inputs = document.querySelectorAll('.update__user--form > input')
    const modal = document.querySelector('.update__user--modal')
    let UpdateProfile = {}


    btnUpdateUser.addEventListener('click', async (e) => {
        e.preventDefault()

        inputs.forEach(input => {
            UpdateProfile[input.name] = input.value
        })

        await updateProfileInfo(UpdateProfile)
        modal.close()

        renderProfilePage()
    })
}

function renderRegisterPetModal() {

    const modal = document.querySelector(".register__pet--modal")
    const registerPetBtn = document.querySelector(".register__pet--btn")
    

    registerPetBtn.addEventListener("click", () => {
        modal.showModal()
    })

    createPet()
    closeRegisterPetModal()
}

function closeRegisterPetModal() {

    const modal = document.querySelector(".register__pet--modal")
    const closeBtn = document.querySelector(".close__register--pet")
    const closebtnCreatePet = document.querySelector('#register_pet')
    
    closeBtn.addEventListener("click", () => {

        modal.close()
    })
}

function createPet() {

    const btnCreatePet = document.querySelector('#register_pet')
    const inputsPet = document.querySelectorAll('.register__pet--form > input')
    const selectSpecies = document.querySelector('#select_species')
    const modal = document.querySelector('.register__pet--modal')
    const newPet = {}

    btnCreatePet.addEventListener('click', async (e) => {
        e.preventDefault()

        inputsPet.forEach(input => {

            newPet[input.name] = input.value
            input.value = ''
        })
        newPet[selectSpecies.name] = selectSpecies.value
        await createNewPet(newPet)
        modal.close()
        renderUserPetsCards()
    })
}

async function renderUpdatePetModal(id) {

    const modal = document.querySelector(".update__pet--modal")
    const myPets= await getAllMyPets()
    modal.innerHTML = ""
    modal.showModal()

    const form = createUpdatePetForm(id)

    modal.appendChild(form)

    myPets.forEach(pet => {
    
        const inputName = document.querySelector('#pet_name')  
        const inputBread = document.querySelector('#pet_bread')  
        const inputAvatar = document.querySelector('#pet_avatar')  

        inputName.value = pet.name
        inputBread.value = pet.bread
        inputAvatar.value = pet.avatar_url
        
    })

    closeUpdatePetModal()
}

function closeUpdatePetModal() {

    const modal = document.querySelector(".update__pet--modal")
    const closeBtn = document.querySelector(".close__update--pet")

    closeBtn.addEventListener("click", () => {

        modal.close()
    })
}

function createUpdatePetForm(id){

    const closeBtn = document.createElement("img")
    const form  = document.createElement('form') 
    const h2= document.createElement('h2')
    const namePet = document.createElement('input')
    const bread = document.createElement('input')
    const avatar = document.createElement('input')
    const species = document.createElement('select')
    const dog = document.createElement('option')
    const cat = document.createElement('option')
    const birds = document.createElement('option')
    const reptile = document.createElement('option')
    const buttonUpdate= document.createElement('button')

    closeBtn.classList.add("close__update--pet")
    closeBtn.src = "../assets/close-modal.svg"
    closeBtn.alt = "Fechar modal"
    form.classList.add('update__pet--form')
    h2.innerText='Atualizar pet'

    namePet.name = 'name'
    namePet.placeholder = 'Nome'
    namePet.id = 'pet_name' 
    bread.name = 'bread'
    bread.placeholder = 'Raça'
    bread.id = 'pet_bread'
    avatar.name = 'avatar_url'
    avatar.placeholder = 'Avatar'
    avatar.id = 'pet_avatar'

    species.name = 'species'
    species.id='select_species'

    dog.value = 'Cachorro'
    dog.innerText = 'Cachorro'
    cat.value = 'Gato'
    cat.innerText = 'Gato'
    birds.value= 'Aves'
    birds.innerText= 'Aves'
    reptile.value= 'Repteis'
    reptile.innerText= 'Repteis'

    buttonUpdate.innerText='Atualizar'
    buttonUpdate.dataset.id= id
    buttonUpdate.id = "update_pet"

    buttonUpdate.addEventListener('click', async(e) => {
        e.preventDefault()

        updatePet(id)
    })

    species.append(dog, cat, birds, reptile)
    form.append(closeBtn, h2, namePet, bread, species, avatar, buttonUpdate)

    return form
}

async function updatePet(id) {

    const modal = document.querySelector('.update__pet--modal')
    const inputs = document.querySelectorAll('.update__pet--form > input')
    const select = document.querySelector('#select_species')

    const updatedPet = {}

    inputs.forEach(input => {
        updatedPet[input.name] = input.value
    })

    updatedPet[select.name] = select.value

    const pet = await updatePetById(updatedPet, id)

    modal.close()
    renderUserPetsCards()
}

async function renderUserPetsCards() {

    const listPets = document.querySelector(".list__pets--container")

    listPets.innerHTML = ""

    const userPets = await getAllMyPets()

    userPets.forEach(pet => {
        const { id, name, bread, species, available_for_adoption, avatar_url } = pet

        const li = createPetCard(id, name, bread, species, available_for_adoption, avatar_url)

        listPets.appendChild(li)
    })
}

function createPetCard(id, name, bread, species, available_for_adoption, avatar_url) {

    const li = document.createElement("li")
    const divPetImage = document.createElement("div")
    const petImage = document.createElement("img")
    const divPetInfo = document.createElement("div")
    const nameParagraph = document.createElement("p")
    const petName = document.createElement("span")
    const breadParagraph = document.createElement("p")
    const petBread = document.createElement("span")
    const specieParagraph = document.createElement("p")
    const petSpecie = document.createElement("span")
    const adopt = document.createElement("p")
    const petAdopt = document.createElement("span")
    const button = document.createElement("button")
    const deleteBtn = document.createElement("button")

    li.classList.add("list__item")
    divPetImage.classList.add("div__pet--image")
    petImage.src = avatar_url
    petImage.alt = name

    divPetInfo.classList.add("div__pet--info")
    nameParagraph.innerText = "Nome: "
    petName.innerText = name
    breadParagraph.innerText = "Raça: "
    petBread.innerText = bread
    specieParagraph.innerText = "Espécie: "
    petSpecie.innerText = species
    adopt.innerText = "Adotável "

    if (available_for_adoption) {
        petAdopt.innerText = "Sim"
    } else {
        petAdopt.innerText = "Não"
    }

    button.classList.add("update__pet--info")
    button.innerText = "Atualizar"
    button.dataset.id = id

    button.addEventListener("click", () => {

        renderUpdatePetModal(id)
    })

    deleteBtn.classList.add("delete__pet--btn")
    deleteBtn.innerText = "Deletar"
    deleteBtn.dataset.id = id

    deleteBtn.addEventListener("click", () => {

        renderDeletePetModal(id, name)
    })

    divPetImage.appendChild(petImage)

    nameParagraph.appendChild(petName)
    breadParagraph.appendChild(petBread)
    specieParagraph.appendChild(petSpecie)
    adopt.appendChild(petAdopt)
    divPetInfo.append(nameParagraph, breadParagraph, specieParagraph, adopt, button, deleteBtn)

    li.append(divPetImage, divPetInfo)

    return li
}

async function renderDeletePetModal(id, name){
    const modal = document.querySelector(".delete__pet--modal")

    modal.innerHTML = ""

    const bodyModal = creatDeletePetModal(id, name)
    modal.appendChild(bodyModal)

    modal.showModal()

    closeDeletePetModal()
}

function closeDeletePetModal(){
    const modal = document.querySelector(".delete__pet--modal")
    const closeBtn = document.querySelector(".close__delete--pet")

    closeBtn.addEventListener("click", () => {

        modal.close()
    })
}

function creatDeletePetModal(id, name){

    const closeBtn = document.createElement("img")
    const divPetModal = document.createElement("div")
    const message = document.createElement("h2")
    const button = document.createElement("button")

    closeBtn.src = "../assets/close-modal.svg"
    closeBtn.alt = "Fechar modal"
    closeBtn.classList.add("close__delete--pet")

    divPetModal.classList.add("delete__pet--div")
    message.innerText = `Deseja mesmo deletar o pet ${name}?`

    button.innerText = "Deletar"
    button.dataset.id = id

    button.addEventListener("click", () => {

        deletePet(id)
    })

    divPetModal.append(closeBtn, message, button)

    return divPetModal
}

async function deletePet(id){

    const modal = document.querySelector(".delete__pet--modal")
    const petDeleted = await deletePetById(id)

    modal.close()
    renderUserPetsCards()
}

renderProfilePage()
logout()
backHome()
renderDeleteUserModal()
renderUpdateUserModal()
renderRegisterPetModal()
renderUserPetsCards()