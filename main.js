const inputNewTodo = document.querySelector('.new-todo'),
      main = document.querySelector('.todo-list'),
      clearCompleteButton = document.querySelector('.clear-completed');

addButtonUseful();
todoCount()
inputNewTodo.addEventListener("keydown", (e)=>{
    if(e.code == "Enter" && inputNewTodo.value.length >0){
        const j = document.createElement('li');
        j.innerHTML = `
        <div class="view">
          <input class="toggle" type="checkbox" />
          <label>
            <span class="description">${inputNewTodo.value}</span>
          </label>
          <button class="icon icon-edit"></button>
          <button class="icon icon-destroy"></button>
        </div>
        `;
        inputNewTodo.value = '';
        main.prepend(j);
        addButtonUseful();
        todoCount()
    }
});
clearCompleteButton.addEventListener('click', clearComplete);



/// Make button useful, button works
function addButtonUseful(){
    const buttonDestroy = document.querySelectorAll('.icon.icon-destroy'),
          toggle = document.querySelectorAll('.toggle'),
          destroy = document.querySelectorAll('.icon.icon-edit');

    buttonDestroy.forEach((button)=>{
        button.addEventListener('click', (e)=>{
            button.parentElement.parentElement.remove();
            todoCount();
        });
    });

    toggle.forEach((togl)=>{
        togl.addEventListener('click', (e)=>{
            if(togl.checked){
                togl.parentElement.parentElement.classList.add('completed');
            }
            else{
                togl.parentElement.parentElement.classList.remove('completed');
            }
        });
    });

    destroy.forEach((destr)=>{
        destr.addEventListener('click', (e)=>{
            parent = destr.parentElement.parentElement;
            parent.classList.add('editing');
            parent.firstElementChild.insertAdjacentHTML('afterend',`<input type="text" class="edit" value="${parent.querySelector('.description').textContent}" />`);
            inputUse();
        })
    });
}
// Делает что бы инпуты работали на ENter
function inputUse() {
    const inputAll = document.querySelectorAll('.edit');
    inputAll.forEach((input)=>{
        input.addEventListener('keydown',(e)=>{
            if(e.code == "Enter" && input.value.length > 0){
                parent = input.parentElement;
                parent.classList.remove('editing');
                parent.querySelector('.description').textContent = input.value;
                input.remove();
            }
        });
    });
}

// functiot for delete all completed task
function clearComplete(){
    const toggle = document.querySelectorAll('.toggle');
    toggle.forEach( elem =>{
        if(elem.checked)
        {
            elem.parentElement.parentElement.remove();
        }
    })
    todoCount();
}

// Todo Counter
function todoCount(){
    const count = document.querySelector('.todo-count'),
          main = document.querySelector('.todo-list'),
          elem = main.querySelectorAll('li');
    count.textContent = `${elem.length} items left`;
}