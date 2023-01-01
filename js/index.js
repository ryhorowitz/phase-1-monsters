const monsterURL = 'http://localhost:3000/monsters'

document.addEventListener('DOMContentLoaded', () => {
  const monsterCont = document.querySelector('#monster-container')
  const formContainer = document.querySelector('#create-monster')
  function fetchMonsters() {
    fetch(`${monsterURL}/?_limit=50&_page=1`)
      .then(res => res.json())
      .then(monsters => {
        //create monster div
        monsters.forEach(monster => {
          const monsterDiv = document.createElement('div')
          monsterDiv.innerHTML = `
       <h2>${monster.name}</h2>
       <h4>${monster.age}</h4>
       <p>${monster.description}</p>
      `
          monsterCont.appendChild(monsterDiv)
        })
      })
      .catch(err => console.error(err.message))
  }

  function createMonsterForm() {
    const form = document.createElement('form')
    const name = document.createElement('input')
    const age = document.createElement('input')
    const description = document.createElement('input')
    const button = document.createElement('button')

    name.id = 'name'
    age.id = 'age'
    description.id = 'description'
    button.id = 'submit'

    name.placeholder = 'name...'
    age.placeholder = 'age...'
    description.placeholder = 'description...'
    button.textContent = 'Create'

    form.appendChild(name)
    form.appendChild(age)
    form.appendChild(description)
    form.appendChild(button)
    formContainer.append(form)

    form.addEventListener('submit', e => {
      e.preventDefault()
      // console.log(e.target.childNodes)
      const name = e.target.childNodes[0].value
      const age = e.target.childNodes[1].value
      const description = e.target.childNodes[2].value
      postNewMonster( name, age, description)
    })
  }

  function postNewMonster(name, age, description) {
    const optionsObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        name: name,
        age: age,
        description: description
      })
    }
    fetch(monsterURL, optionsObj)
      .then(res => res.json())
      .then(success => {
        console.log(success)
      })
      .catch(err => console.error(err.message))
  }
// At the end of the list of monsters, show a button. When clicked, the button should load the next 50 monsters and show them.
createMonsterForm()
fetchMonsters()
})