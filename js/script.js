let allUsers = []
let filterUser = ''
let filteredUsers = []

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

  countMale = document.querySelector('#male')
  countFemale = document.querySelector('#female')
  ageSum = document.querySelector('#ageSum')
  ageAverage = document.querySelector('#ageAverage')

  fetchData()
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
  render()
}

function render() {
  renderUsersList()
  renderSummary()
  genderFilter()
  sumAges()
  averageAges()
  activateSearchButton()
  filterNames()
  searchUsersByFilter()
}

function renderUsersList(filteredUsers) {
  let usersHTML = '<div>'

  filteredUsers = allUsers.forEach((user) => {
    const { name, picture, age } = user

    const userHTML = `
        <div>
            <div class='usersEach'>
            <img src='${picture}'>
            ${name}, ${age} anos
            </div>
        </div>
        `

    usersHTML += userHTML
  })

  usersHTML += '</div>'
  usersList.innerHTML = usersHTML
}

function filterNames() {
  const buttonSearch = document.querySelector('#searchButton')
  const inputSearch = document.querySelector('#inputSearch')

  inputSearch.addEventListener('keyup', (evt) => {
    if (evt.keyCode === 13 && filterUser.length > 0) {
      searchUsersByFilter()
    }
  })

  buttonSearch.addEventListener('click', (evt) => {
    searchUsersByFilter()
  })
}

function searchUsersByFilter() {
  const filteredUsers = allUsers.filter((user) =>
    user.name.toLowerCase().includes(filterUser.toLowerCase())
  )
  renderSummary()
}

function renderSummary() {
  countUsers.innerHTML = allUsers.length + ' usuário(s) encontrado(s)'
  countData.innerHTML = 'Estatísticas'
}

function genderFilter() {
  const female = allUsers.filter((user) => {
    const { gender } = user
    return gender == 'female'
  })

  const male = allUsers.filter((user) => {
    const { gender } = user
    return gender == 'male'
  })

  countMale.innerHTML = `Sexo masculino: ${male.length}`
  countFemale.innerHTML = `Sexo feminino: ${female.length}`
}

function sumAges() {
  const totalAges = allUsers.reduce((acc, curr) => {
    return acc + curr.age
  }, 0)

  ageSum.innerHTML = `Soma das idades: ${totalAges}`
}

function averageAges() {
  const averageAges = allUsers.reduce((acc, curr, _, { length }) => {
    return acc + curr.age / length
  }, 0)

  ageAverage.innerHTML = `Média das idades: ${averageAges.toFixed(2)}`
}

function activateSearchButton() {
  document.querySelector('#searchButton').disabled = false
  inputSearch.focus()
}
