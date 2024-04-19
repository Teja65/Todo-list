const inputtxt = document.getElementById('todo-text');
const inputbtn = document.getElementById('todo-btn');
const ullist = document.getElementById('todo-list-id');

let edittodotxt;

const autofilltodolist = () => {
  if (localStorage.getItem('todolist') != null) {
    const todos = JSON.parse(localStorage.getItem('todolist'));
    todos.forEach((todo) => {
      const li = document.createElement('li');
      const p = document.createElement('p');
      p.innerHTML = todo;
      const edit = document.createElement('button');
      edit.innerHTML = 'Edit';
      const delet = document.createElement('button');
      delet.innerHTML = 'Delete';
      edit.classList.add('btn', 'editBtn');
      delet.classList.add('btn', 'deleteBtn');
      li.appendChild(p);
      li.appendChild(edit);
      li.appendChild(delet);
      ullist.appendChild(li);
    });
  }
};

const addtodolist = () => {
  const txttodo = inputtxt.value.trim();
  if (txttodo.length <= 0) {
    alert('Please Enter a todo text in the input field');
  } else if (inputbtn.value === 'Edit') {
    // console.log(edittodotxt.previousElementSibling.innerHTML);
    localedittodolist(edittodotxt.previousElementSibling.innerHTML);
    edittodotxt.previousElementSibling.innerHTML = txttodo;
    inputbtn.value = 'Add';
    inputtxt.value = '';
  } else {
    const li = document.createElement('li');
    const p = document.createElement('p');
    p.innerHTML = txttodo;
    const edit = document.createElement('button');
    edit.innerHTML = 'Edit';
    const delet = document.createElement('button');
    delet.innerHTML = 'Delete';
    edit.classList.add('btn', 'editBtn');
    delet.classList.add('btn', 'deleteBtn');
    li.appendChild(p);
    li.appendChild(edit);
    li.appendChild(delet);
    ullist.appendChild(li);
    savetodolist(txttodo);
    inputtxt.value = '';
  }
};

const savetodolist = (todovalue) => {
  let todolist;
  if (localStorage.getItem('todolist') === null) {
    todolist = [];
  } else {
    todolist = JSON.parse(localStorage.getItem('todolist'));
  }
  todolist.push(todovalue);
  localStorage.setItem('todolist', JSON.stringify(todolist));
};

const updatetodolist = (ele) => {
  if (ele.target.innerHTML === 'Edit') {
    inputtxt.value = ele.target.previousElementSibling.innerHTML;
    inputtxt.focus();
    inputbtn.value = 'Edit';
    edittodotxt = ele.target;
  }
  if (ele.target.innerHTML === 'Delete') {
    localdeletetodolist(ele.target.parentElement);
    ullist.removeChild(ele.target.parentElement);
  }
};

const localedittodolist = (ele) => {
  const edittodolist = JSON.parse(localStorage.getItem('todolist'));
  const editindex = edittodolist.indexOf(ele);
  edittodolist[editindex] = inputtxt.value;
  localStorage.setItem('todolist', JSON.stringify(edittodolist));
};

const localdeletetodolist = (del) => {
  const deletetodolist = JSON.parse(localStorage.getItem('todolist'));
  const deleteindex = deletetodolist.indexOf(del.children[0].innerHTML);
  deletetodolist.splice(deleteindex, 1);
  localStorage.setItem('todolist', JSON.stringify(deletetodolist));
};
document.addEventListener('DOMContentLoaded', autofilltodolist);
inputbtn.addEventListener('click', addtodolist);
ullist.addEventListener('click', updatetodolist);