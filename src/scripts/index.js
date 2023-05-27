import { createUser, login, getUserToken, getAllPets} from "./requests.js"

async function renderPets(){
  const allPets = document.querySelector('.all_pets')
  allPets.innerHTML = ''
  const data = await getAllPets()

  data.forEach(element => {
    const cardPet = createPet(element)
    allPets.appendChild(cardPet)
  })
}

function createPet(element){
  const card = document.createElement('li')
  const name = document.createElement('p')
  const species = document.createElement('p')
  const avatar = document.createElement('img')

  name.innerText = element.name
  species.innerText = element.species
  avatar.src = element.avatar_url
  avatar.alt = element.name

  card.classList.add('cardPet')
  name.classList.add('namePet')
  species.classList.add('species')
  avatar.classList.add('avatar')

  card.append(avatar, name, species)

  return card
}

function newUser() {
  const inputs = document.querySelectorAll('.formulario_cadastro >input')
  const form = document.querySelector('.formulario_cadastro')
  const novoFuncionario = {}
  form.addEventListener('submit', async event => {
    event.preventDefault()
    inputs.forEach(input => {
      novoFuncionario[input.name] = input.value
    })
    const request = await createUser(novoFuncionario)

    document.querySelector('#modalSign').close()
  })
}

function loginUser() {
  const inputs = document.querySelectorAll('.formulario > input')
  const form = document.querySelector('.formulario')
  const loginUser = {}
  form.addEventListener('submit', async event => {
    event.preventDefault()
    inputs.forEach(input => {
      loginUser[input.name] = input.value
    })
    const request = await login(loginUser)

    if (request.token != undefined) {
      localStorage.setItem('@kenzie:user', JSON.stringify(request.token))
      window.location.replace('./src/pages/dash.html')
    }
  })
}

function verifyUser(){
  const verify = getUserToken()
  if(verify){
    window.location.replace('./src/pages/dash.html')
  }
}

function showModalLogin(){
const modalLogin = document.querySelector('#login')
modalLogin.addEventListener('click', ()=>{
  document.querySelector('#modalLogin').showModal()
})
}

function closeModalLogin(){
const modalClose = document.querySelector('.botao_fechar')
modalClose.addEventListener('click', ()=>{
  document.querySelector('#modalLogin').close()
})
}

function showModalSign(){
const modalSign = document.querySelector('#signup')
modalSign.addEventListener('click', ()=>{
  document.querySelector('#modalSign').showModal()
})
}

function closeModalSign(){
const modalCloseSign = document.querySelector('#closeSign')
modalCloseSign.addEventListener('click', ()=>{
  document.querySelector('#modalSign').close()
})
}

function replaceSign(){
  const btn = document.querySelector('#button_replace_sign')
  btn.addEventListener('click', ()=>{
    document.querySelector('#modalLogin').close()
    document.querySelector('#modalSign').showModal()
  })
}

function replaceLogin(){
  const btn = document.querySelector('#button_replace')
  btn.addEventListener('click', ()=>{
    document.querySelector('#modalSign').close()
    document.querySelector('#modalLogin').showModal()
  })
}

async function filterPets(){

  const select = document.querySelector("#select_species")
  const searchBtn = document.querySelector("#search_specie")
  const listPet = document.querySelector(".all_pets")

  const data = await getAllPets()

  searchBtn.addEventListener("click", () => {
    listPet.innerHTML = ""

    data.filter(element => {

      if(select.value === element.species){

        const cardPet = createPet(element)
        listPet.appendChild(cardPet)
      }else if(select.value === ""){

        const cardPet = createPet(element)
        listPet.appendChild(cardPet)
      }
    })
  })
}

replaceSign()
replaceLogin()
showModalSign()
closeModalSign()
closeModalLogin()
showModalLogin()
verifyUser()
renderPets()
loginUser()
newUser()
filterPets()
