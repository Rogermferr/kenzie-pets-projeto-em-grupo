import {toast} from "./toast.js"

const red = "#CE4646";
const green = "#4BA036";

const userToken = getUserToken() || {};

const baseUrl = "http://localhost:3333/";

const requestHeaders = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${userToken}`,
}

export function getUserToken(){
    const user = JSON.parse(localStorage.getItem('@kenzie:user'))

    return user
}

export async function createUser(data) {
    const newUser = await fetch(`${baseUrl}users`, {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify(data)
    })
    const newUserJson = await newUser.json()

    if(!newUser.ok){
        toast(newUserJson.message, red)
    }else{
        toast("Usuário criado", green)
    }
    
    return newUserJson
  }
  
  export async function login(data) {
    const loginData = await fetch(`${baseUrl}session/login`, {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify(data)
    })
    
    const loginDataJson = await loginData.json()

    if(!loginData.ok){
        toast(loginDataJson.message, red)
    }
    
    return loginDataJson
  }

  export async function getUsers(){

    const user = await fetch(`${baseUrl}users`, {
        method: 'GET',
        headers: requestHeaders
      })

    const userJson = await user.json()

    if(!user.ok){
        toast(userJson.message, red)
    }
    
    return userJson
  }

  export async function getProfileInfo(){

    const userLogged = await fetch(`${baseUrl}users/profile`, {
        method: 'GET',
        headers: requestHeaders
      })

    const userLoggedJson = await userLogged.json()

    if(!userLogged.ok){
        toast(userLoggedJson.message, red)
    }
    
    return userLoggedJson
  }


  export async function updateProfileInfo(data){

    const userUpdated = await fetch(`${baseUrl}users/profile`, {
        method: 'PATCH',
        headers: requestHeaders,
        body: JSON.stringify(data)
      })

    const userUpdatedJson = await userUpdated.json()

    if(!userUpdated.ok){
        toast(userUpdatedJson.message, red)
    }else{
        toast("informações editatas", green)
    }
    
    return userUpdatedJson
  }

  export async function userDeleteProfile(){

    const userDeleted = await fetch(`${baseUrl}users/profile`, {
        method: 'DELETE',
        headers: requestHeaders
      })

    const userDeletedJson = await userDeleted.json()

    if(!userDeleted.ok){
        toast(userDeletedJson.message, red)
    }else{
        toast("Perfil deletado", green)
    }
    return userDeletedJson
  }

  export async function createNewPet(data){
  
    const newPet = await fetch(`${baseUrl}pets`, {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(data)
      })

    const newPetJson = await newPet.json()
    
    if(!newPet.ok){
        toast(newPetJson.message, red)
    }else{
        toast("Pet cadastrado", green)
    }
    return newPetJson
  }

  export async function getAllPets(){

    const pets = await fetch(`${baseUrl}pets`, {
        method: 'GET',
        headers: requestHeaders
      })

    const petsJson = await pets.json()

    if(!pets.ok){
        toast(petsJson.message, red)
    }
    
    return petsJson
  }

  export async function getAllMyPets(){

    const myPets = await fetch(`${baseUrl}pets/my_pets`, {
        method: 'GET',
        headers: requestHeaders
      })

    const myPetsJson = await myPets.json()

    if(!myPets.ok){
        toast(myPetsJson.message, red)
    }

    return myPetsJson
  }

  export async function updatePetById(data, id){

    const petUpdated = await fetch(`${baseUrl}pets/${id}`, {
        method: 'PATCH',
        headers: requestHeaders,
        body: JSON.stringify(data)
      })

    const petUpdatedJson = await petUpdated.json()

    if(!petUpdated.ok){
        toast(petUpdatedJson.message, red)
    }else{
        toast("irformações de pet atualizadas", green)
    }
    
    return petUpdatedJson
  }

  export async function deletePetById(id){

    const petDeleted = await fetch(`${baseUrl}pets/${id}`, {
        method: 'DELETE',
        headers: requestHeaders
      })

    const petDeletedJson = await petDeleted.json()

    if(!petDeleted.ok){
        toast(petDeletedJson.message, red)
    }else{
        toast("Pet deletado", green)
    }
    
    return petDeletedJson
  }

  export async function createNewAdoption(data){

    const newAdoption = await fetch(`${baseUrl}adoptions`, {
        method: 'POST',
        headers: requestHeaders,
        body:JSON.stringify(data)
      })

    const newAdoptionJson = await newAdoption.json()

    if(!newAdoption.ok){
        toast(newAdoptionJson.message, red)
    }else{
        toast("Nova adoção", green)
    }
    
    return newAdoptionJson
  }

  export async function getAllAdoptions(){

    const adoptions = await fetch(`${baseUrl}adoptions`, {
        method: 'GET',
        headers: requestHeaders
      })

    const adoptionsJson = await adoptions.json()

    if(!adoptions.ok){
        toast(adoptionsJson.message, red)
    }
    
    return adoptionsJson
  }

  export async function getAdoptionById(id){

    const adoption = await fetch(`${baseUrl}adoptions/${id}`, {
        method: 'GET',
        headers: requestHeaders
      })

    const adoptionJson = await adoption.json()

    if(!adoption.ok){
        toast(adoptionJson.message, red)
    }
    
    return adoptionJson
  }

  export async function getMyAdoptions(){

    const myAdoption = await fetch(`${baseUrl}adoptions/myAdoptions`, {
        method: 'GET',
        headers: requestHeaders
      })

    const myAdoptionJson = await myAdoption.json()

    if(!myAdoption.ok){
        toast(myAdoptionJson.message, red)
    }
    
    return myAdoptionJson
  }

  export async function updateAdoptionById(data, id){

    const updatedAdoption = await fetch(`${baseUrl}adoptions/update/${id}`, {
        method: 'PATCH',
        headers: requestHeaders,
        body: JSON.stringify(data)
      })

    const updatedAdoptionJson = await updatedAdoption.json()

    if(!updatedAdoption.ok){
        toast(updatedAdoptionJson.message, red)
    }
    
    return updatedAdoptionJson
  }

  export async function deleteAdoptionById(id){

    const deletedAdoption = await fetch(`${baseUrl}adoptions/delete/${id}`, {
        method: 'DELETE',
        headers: requestHeaders
      })

    const deletedAdoptionJson = await deletedAdoption.json()

    if(!deletedAdoption.ok){
        toast(deletedAdoptionJson.message, red)
    }
    
    return deletedAdoptionJson
  }



