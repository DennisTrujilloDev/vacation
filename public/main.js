let editBtn = document.getElementsByClassName("edit")
let byeBtn = document.getElementsByClassName("bye")
let submitBtnReload = document.querySelector('form')
let containerSection = document.getElementsByClassName('container')

submitBtnReload.addEventListener('submit', function (){
    window.location.reload(true)
})
//this only works sometimes
//also need to refresh page after image edited @ newImage put below
//env situation
//heroku


Array.from(byeBtn).forEach(function (element){
    element.addEventListener('click', function (){
        const destinationName = document.getElementById('destinationName').innerText
        const locationName = document.getElementById('locationName').innerText
        console.log("loc, des", locationName, destinationName);

       fetch('/remove', {
            method: 'delete', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body:JSON.stringify({
                locationName: locationName, 
                destinationName: destinationName
            })
        })
        .then(function (res){
            window.location.reload(true)
        })
        .catch(err=>{
            console.log(err);
        })
    })


})

Array.from(editBtn).forEach(function (element){
    element.addEventListener('click', async function (){
        const oldLocationName = document.getElementById('locationName').innerText
        let editedDest = window.prompt('New destination name:')
        let editedLoc = window.prompt('New location name:')
        let editedNotes = window.prompt('New notes:')
        console.log("loc, des", locationName, destinationName);

       try{
        await fetch('/editText', {
            method: 'put', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body:JSON.stringify({
                newLocationName: editedLoc, 
                newDestinationName: editedDest, 
                newNotes: editedNotes, 
                oldLocationName: oldLocationName
            })
        })
        // .then(function (res){
            // window.location.reload(true)
            // if (res.ok) return res
            // .json()
        // })
        //with asycn await, all of the code waits, whereas with .then, it doesnt
    }catch(err){
            console.log(err);
    }
        try{
            await fetch('/newImage', {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body:JSON.stringify({
                newLocationName: editedLoc, 
                newDestinationName: editedDest, 
            })  
        })        
        // .then(
            window.location.reload(true)
        // )
    }catch(err){
            console.log(err);
        }
    })

})
// Array.from(containerSection).forEach(function (element){
//     element.addEventListener('DOMActivate', function (){
//         window.location.reload()
//     })
// })
// function gatherInfo(event){
//     event.preventDefault()

//     let inputOne = document.querySelector("#inputOne")
//     let inputTwo = document.querySelector("#inputTwo")
//     let inputFour = document.querySelector("#inputFour")
//     const resultSection = document.querySelector("#result")
//     let indivSection = document.createElement("div")


//     // if(inputOne.value && inputTwo.value){
//     // resultSection.appendChild(indivSection)
//     // indivSection.className = "indivSection"

//     // const pOne = document.createElement("p")
//     // pOne.innerText = inputOne.value
//     // indivSection.appendChild(pOne)
    
//     // const pTwo = document.createElement("p")
//     // pTwo.innerText = inputTwo.value
//     // indivSection.appendChild(pTwo)

//     // const pThree= document.createElement("p")
//     // pThree.innerText = inputFour.value

//     // indivSection.appendChild(pThree)
    
//     // }else{
//     //     alert("Sorry, the first two fields are required!")
//     // }






// function clearAll(){
//     inputOne.value = ""
//     inputTwo.value = ""
//     inputFour.value = ""
// }
// clearAll()


// }

// function deleteInfo(event){
//    let parentElement = event.target.parentNode.remove()
// }

// function editInfo(event){
//     let parentElement = event.target.parentNode
//     let dest = event.target.parentNode.children[0]
//     let loc = event.target.parentNode.children[1]
//     let notes = event.target.parentNode.children[2]
//     let img = event.target.parentNode.children[3]
//     let editedDest = window.prompt("New Destination:")
//     let editedLoc = window.prompt("New Location:")
//     let editedNotes = window.prompt("New Notes:")

//     if(editedDest.length || editedLoc.length){
//         dest.innerText = editedDest
//         loc.innerText = editedLoc
//         let searchTerm = editedLoc + " " + editedDest 
//         const url = `https://api.unsplash.com/search/photos/?client_id=${ACCESS_KEY}&query=${searchTerm}`
//         async function changeImage(){
//             try{
//                 let response = await fetch(url, {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     }
//                 })
//                 let responseText = await response.json()
//                 if(responseText.results[randomNum.toFixed(0)].urls.regular){
//                     img.setAttribute("src", responseText.results[randomNum.toFixed(0)].urls.regular)
//                 }else{
//                     img.setAttribute("src", "https://pbs.twimg.com/media/CCNxWJdUAAEo7Pq.png")
//                 }
//             }catch(error){
//                 console.log(error)
//             }
            
//         }
//         changeImage()
//     }
//     if(editedNotes.length){
//         notes.innerText = editedNotes
//     }

// }

//     // https://www.smashingmagazine.com/2018/01/understanding-using-rest-api/
//     // https://javascript.info/async

//     // https://javascript.info/network

        