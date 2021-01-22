let page = 1
document.addEventListener("DOMContentLoaded", (event) => {
  const monsterFormDiv = document.querySelector("#create-monster")
  const monsterContainer = document.querySelector("#monster-container")
  const forwardButton = document.querySelector("#forward")
  const backButton = document.querySelector("#back")

  const monsterForm = monsterFormDiv.appendChild(formHtml())

  fetchMonsters() 

  forwardButton.addEventListener('click', () => {
    page++
    fetchMonsters()
  })

  backButton.addEventListener('click', () => {
    if (page > 1) {
      page--
    }
    fetchMonsters()
  })

  monsterForm.addEventListener('submit', createMonster)

  function fetchMonsters() {
    monsterContainer.innerHTML = ""
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
      .then(resp => resp.json())
      .then(json => {
        console.log(json)
        json.forEach(monster => {
          monsterContainer.innerHTML += monsterHtml(monster)
        })
      })
  }
})



function createMonster(e) {
  e.preventDefault()
  fetch('http://localhost:3000/monsters', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      name: e.target.name.value,
      age: e.target.age.value,
      description: e.target.description.value
    })
  })
  .then(resp => {
    if (resp.ok === true) {
      alert("Monster added!")
    } else {
      error("Error adding monster")
    }
  })
}

function formHtml() {
  const form = document.createElement('form')
  form.id = "monster-form"
  form.innerHTML = `
    <input type="text" name="name" placeholder="name">
    <input type="text" name="age" placeholder="age">
    <input type="text" name="description" placeholder="description">
    <input type="submit" value="create">
  `
  return form
}

function monsterHtml({name, age, description}) {
  return `
    <h2>${name}</h2>
    <h4>${age}</h4>
    <p>${description}</p>
  `
}