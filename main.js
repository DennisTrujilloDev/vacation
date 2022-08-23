document.querySelector("button").addEventListener('click', gatherInfo)

function gatherInfo(event){
    event.preventDefault()

    let inputOne = document.querySelector("#inputOne")
    let inputTwo = document.querySelector("#inputTwo")
    let inputThree = document.querySelector("#inputThree")
    let inputFour = document.querySelector("#inputFour")
    const resultSection = document.querySelector("#result")
    let indivSection = document.createElement("div")


    if(inputOne.value !== "" && inputTwo.value !== ""){
    resultSection.appendChild(indivSection)
    indivSection.className = "indivSection"

    const pOne = document.createElement("p")
    pOne.innerText = inputOne.value
    indivSection.appendChild(pOne)
    
    const pTwo = document.createElement("p")
    pTwo.innerText = inputTwo.value
    indivSection.appendChild(pTwo)

    const image = document.createElement("img")
    indivSection.appendChild(image)

    if(inputThree.value !== ""){
    image.setAttribute("src", inputThree.value)
    }else{
        image.setAttribute("src", "https://pbs.twimg.com/media/CCNxWJdUAAEo7Pq.png")
    }

    const pThree= document.createElement("p")
    pThree.innerText = inputFour.value
    indivSection.appendChild(pThree)
    }else{
        alert("Sorry, the first two fields are required!")
    }
    
    const deleteThis = document.createElement("button")
    indivSection.appendChild(deleteThis)
    deleteThis.innerText = "Delete"
    deleteThis.className = "deleteBtn"
    deleteThis.addEventListener('click', deleteInfo)

    const editThis = document.createElement("button")
    indivSection.appendChild(editThis)
    editThis.innerText = "Edit"
    editThis.className = "editBtn"
    editThis.addEventListener('click', editInfo)

function clearAll(){
    inputOne.value = ""
    inputTwo.value = ""
    inputThree.value = ""
    inputFour.value = ""
}
clearAll()
}

function deleteInfo(event){
   let parentElement = event.target.parentNode.remove()
}

function editInfo(event){
    let parentElement = event.target.parentNode
    let dest = event.target.parentNode.children[0]
    let loc = event.target.parentNode.children[1]
    let img = event.target.parentNode.children[2]
    let notes = event.target.parentNode.children[3]
    let editedDest = window.prompt("New Destination:")
    let editedLoc = window.prompt("New Location:")
    let editedImg = window.prompt("New Image:")
    let editedNotes = window.prompt("New Notes:")
    if(editedDest.length){
        dest.innerText = editedDest

    }
    if(editedLoc.length){
        loc.innerText = editedLoc
    }
    if(editedImg.length){
        img.setAttribute("src", editedImg)
    }
    if(editedNotes.length){
        notes.innerText = editedNotes

    }

}

    // https://www.smashingmagazine.com/2018/01/understanding-using-rest-api/
    // https://javascript.info/async

    // https://javascript.info/network
