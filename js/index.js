const monsterURL = 'http://localhost:3000/monsters'

document.addEventListener('DOMContentLoaded', () => {
  const monsterCont = document.querySelector('#monster-container')
  console.log(monsterCont)
// When the page loads, show the first 50 monsters. Each monster's name, age, and description should be shown.

function fetchMonsters() {
  fetch(`${monsterURL}/?_limit=50&_page=1`)
  .then(res => res.json())
  .then(monsters => {
    console.log(monsters)
    //create monster div
    monsters.forEach( monster => {
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
// Above your list of monsters, you should have a form to create a new monster. You should have fields for name, age, and description, and a 'Create Monster Button'. When you click the button, the monster should be added to the list and saved in the API.
// At the end of the list of monsters, show a button. When clicked, the button should load the next 50 monsters and show them.

fetchMonsters()
})