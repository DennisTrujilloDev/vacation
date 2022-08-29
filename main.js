const ACCESS_KEY = "6Mu2Bt_34N7h0LxSZxajQ_kinxDfLBxQFvufhT9BK9w"
document.querySelector("button").addEventListener('click', gatherInfo)
let randomNum = Math.random()*10

function gatherInfo(event){
    event.preventDefault()

    let inputOne = document.querySelector("#inputOne")
    let inputTwo = document.querySelector("#inputTwo")
    // let inputThree = document.querySelector("#inputThree")
    let inputFour = document.querySelector("#inputFour")
    const resultSection = document.querySelector("#result")
    let indivSection = document.createElement("div")


    if(inputOne.value && inputTwo.value){
    resultSection.appendChild(indivSection)
    indivSection.className = "indivSection"

    const pOne = document.createElement("p")
    pOne.innerText = inputOne.value
    indivSection.appendChild(pOne)
    
    const pTwo = document.createElement("p")
    pTwo.innerText = inputTwo.value
    indivSection.appendChild(pTwo)

    const pThree= document.createElement("p")
    if(!inputFour.value){
        inputFour.value = ""
    }else{
    pThree.innerText = inputFour.value
    }
    indivSection.appendChild(pThree)
    
    }else{
        alert("Sorry, the first two fields are required!")
    }

    const image = document.createElement("img")
    indivSection.appendChild(image)

    let searchTerm = inputOne.value + " " + inputTwo.value 
    const url = `https://api.unsplash.com/search/photos/?client_id=${ACCESS_KEY}&query=${searchTerm}`
    
    async function grabImage(){
        try{
            let response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            let responseText = await response.json()
            if(responseText.results[randomNum.toFixed(0)]){
                image.setAttribute("src", responseText.results[randomNum.toFixed(0)].urls.regular)
            }else{
                image.setAttribute("src", "https://pbs.twimg.com/media/CCNxWJdUAAEo7Pq.png")
            }
        }catch(error){
            console.log(error)
        }        
    }
    grabImage()

    
    const deleteThis = document.createElement("button")
    indivSection.appendChild(deleteThis)
    deleteThis.innerText = "Bye"
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
    let notes = event.target.parentNode.children[2]
    let img = event.target.parentNode.children[3]
    let editedDest = window.prompt("New Destination:")
    let editedLoc = window.prompt("New Location:")
    let editedNotes = window.prompt("New Notes:")
    // if(editedDest.length){
    //     dest.innerText = editedDest
    // }
    // if(editedLoc.length){
    //     loc.innerText = editedLoc
    // }
    if(editedDest.length || editedLoc.length){
        dest.innerText = editedDest
        loc.innerText = editedLoc
        let searchTerm = editedLoc + " " + editedDest 
        const url = `https://api.unsplash.com/search/photos/?client_id=${ACCESS_KEY}&query=${searchTerm}`
        async function changeImage(){
            try{
                let response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                let responseText = await response.json()
                if(responseText.results[randomNum.toFixed(0)].urls.regular){
                    img.setAttribute("src", responseText.results[randomNum.toFixed(0)].urls.regular)
                }else{
                    img.setAttribute("src", "https://pbs.twimg.com/media/CCNxWJdUAAEo7Pq.png")
                }
            }catch(error){
                console.log(error)
            }
            
        }
        changeImage()
    }
    if(editedNotes.length){
        notes.innerText = editedNotes
    }

}

    // https://www.smashingmagazine.com/2018/01/understanding-using-rest-api/
    // https://javascript.info/async

    // https://javascript.info/network

    //DONE get rid of photo field in input 
    //TODO grab dest and loc, pass them both to unsplash or pixabay to grab a random photo using async await 

    //grab dest and loc values 
        // inputOne inputTwo 

    //create fetch to unsplash
        
    ////const ACCESS_KEY = 6Mu2Bt_34N7h0LxSZxajQ_kinxDfLBxQFvufhT9BK9w
    //let searchTermOne = inputOne.value.trim()
    //let searchTermTwo = inputTwo.value.trim()
    //try{
    //let apiImage= async fetch(`https://api.unsplash.com/search/photos/?client_id=${ACCESS_KEY}&query=${searchTermOne}&query=${searchTermTwo}`)
    //}catch{
        //await apiImage.text()
   // }


        //await 
        //when promise set up, create space for image in original post


    //if they edit des or loc, need to change picture 
    //if you dont get a pic, default pic 
    //challenge: searchign gifs 

        