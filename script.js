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
                      <span class="deleteItem" onclick="deleteItem(${i})">&#x2718;</span>
                      <span class="editItem" onclick="editItem(${i})">&#9998;</span>
                      <span class="completeItem" onclick="completeItem(${i})">&#10004;</span>
                      <div class="update-controller">
                        <span class="updateItem" onclick="updateItem(${i})"><i class="fa-solid fa-floppy-disk"></i></span> 
                        <span class="cancelUpdate" onclick="cancelUpdate(${i})"><i class="fa-solid fa-rotate-left"></i></span> 
                      </div>
                    </div>`
  }
  document.querySelector(".to-do-list").innerHTML = toDoItems
  if(itemsArray.length && itemsArray.length === 1)
    document.querySelector("#to-do-items").innerHTML = itemsArray.length + " Task"
  if(itemsArray.length && itemsArray.length > 1)
    document.querySelector("#to-do-items").innerHTML = itemsArray.length + " Tasks"
  
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
  if(completedArray.length && completedArray.length === 1)
    document.querySelector("#completed-items").innerHTML = completedArray.length + " Win"
  if(completedArray.length && completedArray.length > 1)
    document.querySelector("#completed-items").innerHTML = completedArray.length + " Wins"
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

function editItem(i){
  const updateController = document.querySelectorAll(".update-controller"),
  input = document.querySelectorAll(".item textarea")
  updateController[i].style.display = "block"
  input[i].disabled = false
}

function updateItem(i){
  const input = document.querySelectorAll(".item textarea")
  itemsArray[i] = input[i].value
  localStorage.setItem('items', JSON.stringify(itemsArray))
  location.reload()
}

function cancelUpdate(i){
  const updateController = document.querySelectorAll(".update-controller"),
  input = document.querySelectorAll(".item textarea")
  input[i].value = itemsArray[i]
  updateController[i].style.display = "none"
  input[i].disabled = true
}

window.onload = function() {
  displayToDoItems()
  displayCompletedItems()
};
