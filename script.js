const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask(){
    if(inputBox.value === ''){
        alert("You must write something!");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();

}




listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);


/*function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");

}
showTask();*/


function saveData() {
    const listItems = listContainer.querySelectorAll("li");
    const data = [];
    
    listItems.forEach(item => {
        data.push({
            content: item.textContent,
            checked: item.classList.contains("checked")
        });
    });

    localStorage.setItem("data", JSON.stringify(data));
}

function removeItemFromStorage(index) {
    const savedData = localStorage.getItem("data");

    if (savedData) {
        const parsedData = JSON.parse(savedData);
        parsedData.splice(index, 1); // Remove the item at the specified index
        localStorage.setItem("data", JSON.stringify(parsedData));
    }
}

function showTask() {
    const savedData = localStorage.getItem("data");

    if (savedData) {
        const parsedData = JSON.parse(savedData);

        parsedData.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item.content;
            if (item.checked) {
                li.classList.add("checked");
            }
            listContainer.appendChild(li);
        });
    }
}

//showTask();





