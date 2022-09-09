let editBtn = document.getElementsByClassName("edit")
let byeBtn = document.getElementsByClassName("bye")
let submitBtnReload = document.querySelector('form')
let containerSection = document.getElementsByClassName('container')

submitBtnReload.addEventListener('submit', function (){
    window.location.reload(true)
})

Array.from(byeBtn).forEach(function (element){
    element.addEventListener('click', function (event){
        const destinationName = event.target.parentNode.children[0].innerText
        const locationName = event.target.parentNode.children[1].innerText
        console.log("LOC IS", locationName)
        console.log("DEST IS", destinationName);

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
        // console.log("loc, des", locationName, destinationName);

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
        //with async await, all of the code waits, 
        //whereas with .then, it doesnt
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
            window.location.reload(true)
    }catch(err){
            console.log(err);
        }
    })

})
//resources
// https://www.smashingmagazine.com/2018/01/understanding-using-rest-api/
// https://javascript.info/async
//https://javascript.info/network

        