// const fill = document.querySelector('.fill')
const empties = document.querySelectorAll('.empty')

// fill.addEventListener('dragstart', dragStart)
// fill.addEventListener('dragend', dragEnd)

let todos = [
    {   
        time: new Date().getHours() + ":" + new Date().getMinutes(),
        id: Math.random(),
        title: 'buy milk',
        description: 'description will be here',
        status: 'inprogress'
    },
    {
        time: new Date().getHours() + ":" + new Date().getMinutes(),
        id: Math.random(),
        title: 'chek h w',
        description: 'description will be here',
        status: 'inprogress'
    },
    {
        time: new Date().getHours() + ":" + new Date().getMinutes(),
        id: Math.random(),
        title: 'todo h/t',
        description: 'description will be here',
        status: 'inprogress'
    },
    {
        time: new Date().getHours() + ":" + new Date().getMinutes(),
        id: Math.random(),
        title: 'fff  h/t',
        description: 'description will be here',
        status: 'inprogress'
    }
]

let temp = []
let form = document.forms.add_task_form;
let container = document.querySelector(".container");
let status

form.onsubmit = (event) => {
	event.preventDefault();

	let todo = {
        time: new Date().getHours() + ":" + new Date().getMinutes(),
        id: Math.random(),
        title: '',
        description: 'description will be here',
        status: 'inprogress'
	};

    let addInp = document.querySelector('#add')

    todo.title = addInp.value

	todos.push(todo)
	console.log(todos);
    reload(todos)
};


const reload = (arr) => {
    empties.forEach(empty => empty.innerHTML = '');
    for(let todo of todos) {
        let div = document.createElement('div')
        let time = document.createElement('span')
        let b = document.createElement('b')
        let p = document.createElement('p')
        let editImg = document.createElement('img')
        let cancelImg = document.createElement('img')
        let doneImg = document.createElement('img')

        doneImg.src = './assets/check.svg'
        doneImg.classList.add('edit')
        cancelImg.src = './assets/x.svg'
        cancelImg.classList.add('edit')
        editImg.src = './assets/edit-3.svg'
        editImg.classList.add('edit')
        div.setAttribute('id', todo.id)
        div.setAttribute('class', 'fill')
        div.setAttribute('draggable', true)

        time.innerHTML = todo.time
        b.innerHTML = todo.title
        p.innerHTML = todo.description
    

        div.append(b , editImg , doneImg , cancelImg , p , time)
        empties[0].append(div)


        doneImg.onclick = () => {
            todo.status = 'done';
            status = todo.status;
            empties[1].append(div);
            b.classList.remove('canceled')
        }

        cancelImg.onclick = () => {
            todo.status = 'canceled';
            status = todo.status;
            empties[2].append(div);
            b.classList.add('canceled')
        }

        temp.push(div)

        status = todo.status
        console.log(status);

    
        let modal = document.createElement("div");
        let inputTitle = document.createElement("h3")
        inputTitle.innerHTML = 'Write new todos task'
        let modalContent = document.createElement("div");
        let input = document.createElement('input')
        let close = document.createElement("span");
        let saveBtn = document.createElement('button')
        let br = document.createElement('br')

        close.innerHTML = "&times;";
        close.onclick = () => {
            modal.style.display = "none";
        };

        editImg.onclick = () => {
            modal.style.display = "block";
        }

        modal.style.display = "none";

        modal.append(modalContent);
        document.body.append(modal);
        modalContent.append(close,inputTitle,input,br,saveBtn);

        saveBtn.innerHTML = "Save Changes";
        saveBtn.onclick = () => {
            todo.title = input.value;
            b.innerHTML = input.value;
            modal.style.display = "none";
            reload(todos);
        };

        modal.classList.add('modal')
        input.classList.add('md-inp')
        modalContent.classList.add('modal-content')
        close.classList.add('close-btn')
    }
    
}
reload(todos);

temp.forEach((item, index) => {
    item.addEventListener('dragstart', dragStart)
    item.addEventListener('dragend', dragEnd)
})

for(empty of empties) {
    empty.addEventListener('dragover', dragOver)
    empty.addEventListener('dragenter', dragEnter)
    empty.addEventListener('dragleave', dragLeave)
    empty.addEventListener('drop', dragDrop)
}

let temp_id

function dragStart() {
    console.log('dragStart');   
    temp_id = this.id
    this.className += ' hold'
    setTimeout(() => (this.className = 'invisible'), 0)
}

function dragEnd() {
    console.log('dragEnd');
    this.className = 'fill'
}

function dragOver(event) {
    event.preventDefault()
}

function dragEnter(event) {
    console.log('');
    event.preventDefault()
    this.className += ' hovered'
}


function dragLeave() {
    console.log('dragLeave');
    this.className = 'empty'
    console.log(this);
}

function dragDrop(params) {
    console.log('dragDrop');
    this.className = 'empty'
    temp.forEach((item, index) => {
        if(item.id === temp_id) {
            this.append(item)
        }
    })
}