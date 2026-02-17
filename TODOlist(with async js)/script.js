
//to do with js
let taskinput=document.querySelector(`#taskinput`)
let addbtn = document.querySelector(`.addbtn`)
let todocontainer = document.querySelector('.todocontainer')

let api = `https://6992df038f29113acd3f33f9.mockapi.io/api/v1/todos`
addbtn.addEventListener(`click`,postdata)

async function fetchdata(){
    let response = await fetch(api)
    let data = await response.json()

    if(data){
        todocontainer.innerHTML=''
        data.forEach(obj => {
            let div = document.createElement('div')
            div.className='todo'
            div.innerHTML = `
            <p class='paratext'>${obj.text}</p>
            <input id="editinput" type="text" placeholder="enter your words" value='${obj.text}'>
            <div >
                <button class='deletebtn'>delete</button>
                <button class='editbtn'>edit</button>
                <button class='savebtn'>save</button>
            </div>
        `
            let deletebtn = div.querySelector('.deletebtn')
            let editbtn = div.querySelector('.editbtn')
            let savebtn = div.querySelector('.savebtn')
            let paratext = div.querySelector('.paratext')
            let editinput = div.querySelector('#editinput')
            deletebtn.addEventListener('click',function(){
                deletdata(obj.id)
            })
            editbtn.addEventListener('click',function(){
                
                editbtn.style.display = 'none'
                savebtn.style.display = 'inline'
                paratext.style.display = 'none'
                editinput.style.display = 'inline'
                 
            })
            savebtn.addEventListener('click',async function(){
                let editvalue = editinput.value;
                await updatedata(obj.id, editvalue)
                editbtn.style.display = 'inline'
                savebtn.style.display = 'none'
                paratext.style.display = 'inline'
                editinput.style.display = 'none'
                 
            })
            todocontainer.append(div)
        })
    }
}

async function postdata(){
    let value = taskinput.value;
    let objdata = {
        text:value.trim()
    }

    let response = await fetch(api, {
        method: 'POST',
        headers:{
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(objdata),
    })
    if(response.status === 201){
        fetchdata()
        taskinput.value=""
    }
    // let data = await response.json()
}

async function updatedata(id,value){
    console.log(id,value)

    let objdata = {
        text:value.trim()
    }

    let response = await fetch(`${api}/${id}`, {
        method: 'PUT',
        headers:{
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(objdata),
    })
    if(response.status === 200){
        fetchdata()
    }

}

async function deletdata(id){
    console.log(id)
    let response = await fetch(`${api}/${id}`,{
        method: 'DELETE'
    })
    if(response.status === 201){
        fetchdata()
    }
}
fetchdata();





















