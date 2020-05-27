let allUsers = []
let filterUser = ''
let foundUsers = []

// loading()

// function loading() {
//   let loading = document.querySelector('#loading')
//   time = setTimeout(() => {
//     loading.textContent = 'Loading...'
//   }, 0)
// }

window.addEventListener('load', () => {
  usersList = document.querySelector('#usersList')
  statisticalData = document.querySelector('#statisticalData')

  countUsers = document.querySelector('#countUsers')
  countData = document.querySelector('#countData')

  dataDetails = document.querySelector('.dataDetails')
  fetchData()
  inputSearch.focus()
})

async function fetchData() {
  const dataPromise = await fetch(
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
  )
  const json = await dataPromise.json()
  allUsers = json.results.map((user) => {
    const { name, picture, dob, gender } = user
    return {
      name: name.first + ' ' + name.last,
      picture: picture.large,
      age: dob.age,
      gender,
    }
  })
  filterNames()
  activateSearchButton()
}

function activateSearchButton() {
  document.querySelector('#searchButton').disabled = false
}

function render() {
  renderUsersList()
  details()
  renderFoundUsers()
}

function renderUsersList(filteredUsers) {
  let usersHTML = '<div>'

  filteredUsers = allUsers.forEach((user) => {
    const { name, picture, age } = user

    const userHTML = `
        
            <p class='usersEach'>
            <img src='${picture}'>
            ${name}, ${age} anos
            </p>
        
        `

    usersHTML += userHTML
  })

  usersHTML += '</div>'
  usersList.innerHTML = usersHTML
}

function renderFoundUsers() {
  countUsers.innerHTML = `${foundUsers.length} usuário(s) encontrado(s)`
  countData.innerHTML = 'Estatísticas'

  let foundHTML = `<div>`
  foundUsers.forEach((user) => {
    const { name, age, picture } = user
    const userHTML = `
        <p class='usersEach'>
          <img src='${picture}' alt='${name}'>
          <span class='align'>${name}, ${age} anos</span>
        </p>
      `

    foundHTML += userHTML
  })

  foundHTML += '</div>'
  usersList.innerHTML = foundHTML
}

function filterNames() {
  const buttonSearch = document.querySelector('#searchButton')
  const inputSearch = document.querySelector('#inputSearch')

  inputSearch.addEventListener('keyup', (evt) => {
    filterUser = inputSearch.value
    if (evt.keyCode === 13 && filterUser.length > 0) {
      searchUsersByFilter()
    }
  })

  buttonSearch.addEventListener('click', (evt) => {
    searchUsersByFilter()
  })
}

function searchUsersByFilter() {
  foundUsers = allUsers.filter((user) =>
    user.name.toLowerCase().includes(filterUser.toLowerCase())
  )
  filterUser = inputSearch.value

  render()
}

function details() {
  const female = foundUsers.filter((user) => {
    const { gender } = user
    return gender == 'female'
  })
  const male = foundUsers.filter((user) => {
    const { gender } = user
    return gender == 'male'
  })

  const totalAges = foundUsers.reduce((acc, curr) => {
    return acc + curr.age
  }, 0)
  const averageAges = foundUsers.reduce((acc, curr, _, { length }) => {
    return acc + curr.age / length
  }, 0)

  let datasHTML = '<div>'

  const dataHTML = `
  <p class='parag'> Sexo masculino: ${male.length}</p>
  <p class='parag'>Sexo feminino: ${female.length}</p>
  <p class='parag'>Soma das idades: ${totalAges}</p>
  <p class='parag'>Média das idades: ${averageAges.toFixed(2)}</p>
`
  datasHTML += dataHTML
  datasHTML += '</div>'

  dataDetails.innerHTML = datasHTML
}
