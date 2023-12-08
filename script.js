let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
completedArray = localStorage.getItem('completedItems') ? JSON.parse(localStorage.getItem('completedItems')) : [];

document.querySelector("#enter").addEventListener("click", () => {
  const item = document.querySelector("#item")
  createItem(item)
})

document.querySelector("#item").addEventListener("keypress", (e) => {
  if(e.key === "Enter"){
    const item = document.querySelector("#item")
    createItem(item)
  }
})

document.querySelector("#deleteAll").addEventListener("click", () => {
   completedArray = []
   localStorage.setItem('completedItems', JSON.stringify(completedArray))
   location.reload()
})

function displayToDoItems(){
  let toDoItems = ""
  for(let i = 0; i < itemsArray.length; i++){
      toDoItems += `<div class="item" style="border-left: 5px solid #d9534f;">
                      <textarea disabled>${itemsArray[i]}</textarea>
                      <span class="deleteItem" onclick="deleteItem(${i})">&#x2717;</span>
                      <span class="editItem">&#9998;</span>
                      <span class="completeItem" onclick="completeItem(${i})">&#10004;</span>
                      <div class="update-controller">
                        <button class="saveBtn"><i class="fa-solid fa-floppy-disk"></i> save</button>
                        <button class="cancelBtn"><i class="fa-solid fa-ban"></i> cancel</button>
                      </div>
                    </div>`
  }
  document.querySelector(".to-do-list").innerHTML = toDoItems
  if(itemsArray.length)
    document.querySelector("#to-do-items").innerHTML = itemsArray.length + " Tasks"
  activateEditListeners()
  activateSaveListeners()
  activateCancelListeners()
}

function displayCompletedItems(){
  let completedItems = ""
  for(let i = 0; i < completedArray.length; i++){
    completedItems += `<div class="item" style="border-left: 5px solid #5cb85c;">
                <textarea disabled>${completedArray[i]}</textarea>
                <span class="deleteItem" onclick="deleteCompletedItem(${i})">&#x2717;</span>
              </div>`
  }
  document.querySelector(".complete-list").innerHTML = completedItems
  if(completedArray.length)
    document.querySelector("#completed-items").innerHTML = completedArray.length + " Wins"
}

function activateEditListeners(){
  const editBtn = document.querySelectorAll(".editItem")
  const updateController = document.querySelectorAll(".update-controller")
  const inputs = document.querySelectorAll(".item textarea")
  editBtn.forEach((eB, i) => {
    eB.addEventListener("click", () => { 
      updateController[i].style.display = "block"
      inputs[i].disabled = false })
  })
}

function activateSaveListeners(){
  const saveBtn = document.querySelectorAll(".saveBtn")
  const inputs = document.querySelectorAll(".item textarea")
  saveBtn.forEach((sB, i) => {
    sB.addEventListener("click", () => {
      updateItem(inputs[i].value, i)
    })
  })
}

function activateCancelListeners(){
  const cancelBtn = document.querySelectorAll(".cancelBtn")
  const updateController = document.querySelectorAll(".update-controller")
  const inputs = document.querySelectorAll(".item textarea")
  cancelBtn.forEach((cB, i) => {
    cB.addEventListener("click", () => {
      inputs[i].value = itemsArray[i]
      updateController[i].style.display = "none"
      inputs[i].disabled = true
      inputs[i].style.border = "none"
    })
  })
}

function createItem(item){
  if(!item.value)
    return;
  itemsArray.push(item.value)
  localStorage.setItem('items', JSON.stringify(itemsArray))
  location.reload()
}

function completeItem(i){
  completedArray.push(itemsArray[i])
  localStorage.setItem('completedItems', JSON.stringify(completedArray))
  deleteItem(i)
}

function deleteItem(i){
  itemsArray.splice(i,1)
  localStorage.setItem('items', JSON.stringify(itemsArray))
  location.reload()
}

function deleteCompletedItem(i){
  completedArray.splice(i,1)
  localStorage.setItem('completedItems', JSON.stringify(completedArray))
  location.reload()
}

function updateItem(text, i){
  itemsArray[i] = text
  localStorage.setItem('items', JSON.stringify(itemsArray))
  location.reload()
}

window.onload = function() {
  displayToDoItems()
  displayCompletedItems()
};
