const todos = document.querySelector('.container__todos');
const add = document.querySelector('.add-task-btn');
const input = document.querySelector('.description-task');

let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

function Task(description){
    this.description = description;
    this.done = false;
}

const updateLocalStorage = () => {
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

const createHTMLTemplate = (item, index) => {
    return ` <div class="todo-item ${item.done ? 'checked' : ''}">
    <div class="desc">${item.description}</div>
    <div class="btns">
        <input onclick="completeTask(${index})" type="checkbox" class="done" ${item.done ? 'checked' : ''}>
        <input onclick="deleteTask(${index})" type="button" class="delete" value="Delete">
    </div>
</div>`
}

add.addEventListener('click', () => {
    tasks.push(new Task(input.value));
    input.value = '';
    updateLocalStorage();
    addHTMLMarkup();
})

const completeTask = (index) => {
    tasks[index].done = !tasks[index].done;
    updateLocalStorage();
    
    addHTMLMarkup();
    setTimeout(()=>{
        deleteTask(index);
    },4000);
    updateLocalStorage();
    addHTMLMarkup();

}
const addHTMLMarkup = () => {
    todos.innerHTML = '';
    if(tasks.length !== 0) {
        tasks.forEach((item,index) => {
            todos.innerHTML += createHTMLTemplate(item,index);
            
        });
    }
}
const deleteTask = (index) => {
    tasks.splice(index,1);
    updateLocalStorage();
    addHTMLMarkup();
}
addHTMLMarkup();


