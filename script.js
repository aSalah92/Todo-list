// name box
let containerName = document.querySelector('#container-name')
let labelName = document.querySelector('#name-label')
let inputName = document.querySelector('#name')
let buttonName = document.querySelector('#name-btn')
let signInBtn = document.querySelector('#sign-in-btn')

// greeting message
let greetingMsg = document.querySelector('#greeting-msg')

// tasks box
let containerTasks = document.querySelector('#container-tasks')
let inputTask = document.querySelector('#tasks-input')
let labelTask = document.querySelector('#tasks-label')
let addBtn = document.querySelector('#add')
let deleteBtn = document.querySelector('#delete')
let tasksBox = document.querySelector('#tasks-box')
let selectAllBtn = document.querySelector('#select-all')
let selectNoneBtn = document.querySelector('#select-none')


// sign out btn
let signOutBtn = document.querySelector('#sign-out')

let names = JSON.parse(localStorage.getItem('users')) || {};
let searchedName;
let userName;
let num = 0;

console.log(names)

// functions

function addTask (){
    event.preventDefault()
    if(inputTask.value === ''){
        labelTask.style.color = 'red'
        labelTask.textContent = 'Please make sure you write your task'
    }else{
        labelTask.style.color = 'black'
        labelTask.textContent = 'Enter your task'

        num++
        let taskAdded = inputTask.value;
        names[userName][`task${num}`] = taskAdded
        names[userName][`numOfTasks`] = num;
        console.log(names)
        localStorage.setItem('users',JSON.stringify(names))

        createElements(taskAdded)
    }
}

function deleteTask (){
    event.preventDefault()
    let allTasks = document.querySelectorAll('.tasks-added')
    allTasks.forEach(task=>{
        if(task.checked){
            task.parentNode.remove()
            delete names[userName][`${task.id}`]
            localStorage.setItem('users',JSON.stringify(names))
            console.log(names)
        }
    })
}

function createElements (taskAdded){
    let divElement = document.createElement('div')
    let inputElement = document.createElement('input')
    let labelElement = document.createElement('label')
    
    divElement.className = 'container-task'
    inputElement.type = 'checkbox'
    inputElement.className = 'tasks-added'
    inputElement.id = `task${num}`
    labelElement.htmlFor = `task${num}`
    labelElement.textContent = taskAdded
    // console.log(divElement)
    // console.log(inputElement)
    // console.log(labelElement)
    appendElements(divElement,inputElement,labelElement)
}

function appendElements (divElement,inputElement,labelElement){
    divElement.appendChild(inputElement)
    divElement.appendChild(labelElement)
    tasksBox.appendChild(divElement)
}

function selectAll (){
    event.preventDefault()
    let allTasks = document.querySelectorAll('.tasks-added')
    console.log(allTasks)
    allTasks.forEach(task=>{
        if(!task.checked){
            task.checked = true
        }
    })
}

function selectNone (){
    event.preventDefault()
    let allTasks = document.querySelectorAll('.tasks-added')
    console.log(allTasks)
    allTasks.forEach(task=>{
        if(task.checked){
            task.checked = false
        }
    })
}

function singUp (){
    event.preventDefault()
    userName = inputName.value
    if(userName === ''){
        labelName.textContent = 'Name is missing'
        labelName.style.color = 'rgb(220, 0, 0)'
     
    }else {
        
        for(ele in names){
            if(ele === userName){
                searchedName = ele
            }
        }

        if(searchedName !== undefined){
            labelName.textContent = 'Name already exists'
            labelName.style.color = 'rgb(220, 0, 0)'

        }else{
            num = 0
            names[userName] = {}
            tasksBox.innerHTML = ''
            inputTask.value = ''
            labelName.textContent = 'Enter your username'
            labelName.style.color = 'var(--primary-color)'
            localStorage.setItem('users', JSON.stringify(names))


                containerName.style.opacity = '0'
            setTimeout(() => {
                containerName.style.userSelect = 'none'
            }, 1500);
            

            greetingMsg.textContent = `Hello, ${userName}`

            setTimeout(()=>{
                greetingMsg.style.display = 'block'
                containerTasks.style.userSelect = 'auto'
            },1000)
            setTimeout(()=>{
            greetingMsg.style.opacity = '1'
            containerTasks.style.opacity = '1'
            },2000)
            searchedName = undefined
        }
    }
}

function signIn (){
    event.preventDefault()
    userName = inputName.value
    if(userName === ''){
        labelName.textContent = 'Name is missing'
        labelName.style.color = 'rgb(220, 0, 0)'
    }else{

        for(ele in names){
            if(ele === userName){
                searchedName = ele
            }
        }

        if (searchedName === undefined){
        labelName.textContent = 'There isn\'t such a name'
        labelName.style.color = 'rgb(220, 0, 0)'
        }else{
            labelName.textContent = 'Enter your name'
            labelName.style.color = 'var(--primary-color)'
            inputTask.value = ''


                containerName.style.opacity = '0'
            setTimeout(() => {
                containerName.style.userSelect = 'none'
            }, 500);
            

            greetingMsg.textContent = `Welcome back, ${userName}`

            setTimeout(()=>{
                greetingMsg.style.display = 'block'
                containerTasks.style.userSelect = 'auto'
            },500)
            setTimeout(()=>{
            greetingMsg.style.opacity = '1'
            containerTasks.style.opacity = '1'
            },1000)
            
            num = names[userName].numOfTasks;
            tasksBox.innerHTML = ''
            
            if(Object.keys(names).length > 0){
                for(element in names[userName]){
                    if (element.startsWith('task')){
                        let divElement = document.createElement('div')
                        let inputElement = document.createElement('input')
                        let labelElement = document.createElement('label')
                        

                        divElement.className = 'container-task'
                        inputElement.type = 'checkbox'
                        inputElement.className = 'tasks-added'
                        inputElement.id = element
                        labelElement.for = element
                        labelElement.textContent = names[userName][element]
                        // console.log(divElement)
                        // console.log(inputElement)
                        // console.log(labelElement)
                        appendElements(divElement,inputElement,labelElement)
                    }
                }    
            }

            searchedName = undefined
            
        }
    }    
}

function signOut(){
    event.preventDefault()
    greetingMsg.style.opacity = '0'
    containerTasks.style.opacity = '0'
    inputName.value = ''
    setTimeout(()=>{
        containerName.style.userSelect = 'auto'
        greetingMsg.style.display = 'none'
        containerTasks.style.userSelect = 'none'
    },500)

    setTimeout(()=>{
        containerName.style.opacity = '1'
    },1000)
    
}




// eventListeners
buttonName.addEventListener('click', singUp)
signInBtn.addEventListener('click', signIn)
signOutBtn.addEventListener('click',signOut)
addBtn.addEventListener('click',addTask)
deleteBtn.addEventListener('click', deleteTask)
selectAllBtn.addEventListener('click', selectAll)
selectNoneBtn.addEventListener('click', selectNone)
