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
                  <div class="update-controller">
                    <button class="saveBtn"><i class="fa-solid fa-floppy-disk"></i> save</button>
                    <button class="cancelBtn"><i class="fa-solid fa-ban"></i> cancel</button>
                  </div>
                  <div class="input-controller">
                    <div class="edit-controller">
                      <button class="completeBtn"><i class="fa-solid fa-check"></i> complete</button>
                      <button class="editBtn"><i class="fa-solid fa-pen-to-square"></i> edit</button>
                    </div>
                  </div>
                </div>`
  }
  document.querySelector(".to-do-list").innerHTML = toDoItems
  activateCompleteListeners()
  activateEditListeners()
  activateSaveListeners()
  activateCancelListeners()
}

function displayCompletedItems(){
  let completedItems = ""
  for(let i = 0; i < completedArray.length; i++){
    completedItems += `<div class="item" style="border-left: 5px solid #5cb85c;">
                <textarea disabled>${completedArray[i]}</textarea>
              </div>`
  }
  document.querySelector(".complete-list").innerHTML = completedItems
}

function activateCompleteListeners(){
  let completeBtn = document.querySelectorAll(".completeBtn")
  completeBtn.forEach((cB, i) => {
    cB.addEventListener("click", () => { completeItem(i) })
  })
}

function activateEditListeners(){
  const editBtn = document.querySelectorAll(".editBtn")
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
      updateController[i].style.display = "none"
      inputs[i].disabled = true
      inputs[i].style.border = "none"
    })
  })
}

function createItem(item){
  itemsArray.push(item.value)
  localStorage.setItem('items', JSON.stringify(itemsArray))
  location.reload()
}

function completeItem(i){
  completedArray.push(itemsArray[i])
  localStorage.setItem('completedItems', JSON.stringify(completedArray))

  itemsArray.splice(i,1)
  localStorage.setItem('items', JSON.stringify(itemsArray))
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
