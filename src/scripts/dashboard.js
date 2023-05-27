import { getUserToken, getAllPets, createNewAdoption } from './requests.js'

function logout() {

    const logoutBtn = document.querySelector("#logout")

    logoutBtn.addEventListener("click", () => {

        localStorage.clear()
        window.location.replace("/")
    })
}

logout()


function validateUser() {
    const user = getUserToken()

    if(!user) {
        window.location.replace('/')
    } 
}

validateUser()



function redirectProfile() {

    const profileBtn = document.querySelector('#profile')
    profileBtn.addEventListener('click', (event) => {
        event.preventDefault()
        window.location.replace('/src/pages/profile.html')
    })
}

redirectProfile()


async function renderCardPets() {
    const renderCards = document.querySelector('.container__pets')

    const array =  await getAllPets()
    
    array.forEach(element => {
        const petCards = createCardPets (element)
        
        renderCards.appendChild(petCards) 
    });    
}

renderCardPets()


function createCardPets(pet) {
    const cardPet = document.createElement('li')
    cardPet.classList.add('container__pets--cards')
    const petImage = document.createElement('img')
   
    petImage.src = pet.avatar_url
    petImage.alt = pet.name
   
    const petName = document.createElement('h2')
    petName.innerText = pet.name
    
    const petSpecie = document.createElement('span')
    petSpecie.innerText = pet.species
    
    const adoptionBtn = document.createElement('button')
    adoptionBtn.dataset.id = pet.id
    adoptionBtn.innerText = "Me adota?"

    adoptionBtn.addEventListener('click' , () => {
        adoptPet(pet.id) 
    })
    if(pet.available_for_adoption) {
        
        cardPet.append(petImage, petName, petSpecie, adoptionBtn)

    } else {
        cardPet.append(petImage, petName, petSpecie)
    }   

    return cardPet
}



async function adoptPet(petId) {
    const listPets = document.querySelector('.container__pets')
    
    listPets.innerHTML = ''
    
    const pet = {
        pet_id: petId
    }
    const adoptedPet = await createNewAdoption(pet)

    
    renderCardPets()
}

