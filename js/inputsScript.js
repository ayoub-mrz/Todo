// Selectors

let statusChoce = document.querySelector('.status');

let ulStatus = document.querySelector('.status ul');

let createNewSubTask = document.querySelector('.newSubTasks');

let subTasksCont = document.querySelector('.subTasksInput');

let deleteSubTasks = document.querySelectorAll(".deleteSubstask");

let message = document.querySelector('.message');

let backgroundTask = document.querySelector('.backgroundInput');

let liStatus = document.querySelectorAll('.status ul li');

let spanStatus = document.querySelector('.status > span');

let backgroundBoard = document.querySelector(".backgroundBoard");

let backgroundSubTask = document.querySelector(".backgroundTask");

let boardInput = document.querySelector('.nameInput input');

let sideBarContent = document.querySelector('.sideBar .content');

let todoCtn = document.querySelector('.todo .content');

let doingCtn = document.querySelector('.doing .content');

let doneCtn = document.querySelector('.done .content');

let intro = document.querySelector('.intro');

let empty = document.querySelector('.empty');

let addNewTask = document.querySelector('.craeteTask');

let ul = document.querySelector('.boardList');

// let ulStatusHeight;






// Get Height Of Status Ul 
// const observer = new ResizeObserver((e) => {
//     let fixE = e[0];
//     let isBig = fixE.contentRect.width >= 776;
//     if (isBig) {
//         ulStatusHeight = 66;
//     } else {
//         ulStatusHeight = 54;
//     }
// })
// observer.observe(backgroundTask);

// ulStatus.style.height = '0';

// // Show & Hide Status Ul
// statusChoce.onclick = (e) => {
//     chowHideUl(ulStatus, ulStatusHeight);
// }

// Create New SubTasks
createNewSubTask.addEventListener('click', (e) => {
    createSubTasks();
})

// create Subtasks and append them to sub container
function createSubTasks() {
    let subtask = document.createElement('div');
    subtask.className = 'subtask';

    let input = document.createElement('input');
    input.placeholder = 'New SubTasks';

    let img = document.createElement('img');
    img.className = 'deleteSubstask';
    img.src = 'img/close.svg';
    img.alt = 'close';

    subtask.appendChild(input);
    subtask.appendChild(img);
    subTasksCont.appendChild(subtask);
}

// Delete Subtasks
document.body.addEventListener('click', (e) => {

    if (e.target.classList.contains('deleteSubstask')) {
        let numSubTasks = document.querySelectorAll('.subTasksInput .subtask').length;

    if (numSubTasks == 1) {
        getMessage("You Can't Creat Task With Out Subtask");
    } else {
        e.target.parentElement.remove();
    }
    }
    
})

// Get Message 
function getMessage(msg) {
    message.innerHTML = msg;

    message.style.display = 'block';
    setTimeout(() => {
        message.style.opacity = '1';
        message.style.transform = "translateY(0px)";
    }, 200);

    setTimeout(() => { hideMessage() }, 7000);
}

// Hide Message
function hideMessage() {
    message.style.opacity = '0';
    message.style.transform = "translateY(-10px)";
}

document.body.addEventListener('click', (e) => {

    // Get New Task
    if (e.target.classList.contains('addTask')) {
        showBoard(backgroundTask, 'block', 1, 'translate(-50%, 0px)');
    }

    // Hide New Task
    if (e.target.classList.contains('backgroundInput')) {
        hideBoard(backgroundTask, 'none', 0, 'translate(-50%, -20px)');
    }

    // Show Create Board Input
    if (e.target.classList.contains('creatBoardBtns')) {
        showBoard(backgroundBoard, 'block', 1, 'translate(-50%, 0px)');
    }
    
    // Show Create Board Input
    if (e.target.classList.contains('backgroundBoard')) {
        hideBoard(backgroundBoard, 'none', 0, 'translate(-50%, -20px)');
    }
    
    // Show Task Status
    if (e.target.classList.contains('task-Details')) {
        showBoard(backgroundSubTask, 'block', 1, 'translate(-50%, 0px)');
    }
    
    // Show Task Status
    if (e.target.classList.contains('backgroundTask')) {
        hideBoard(backgroundSubTask, 'none', 0, 'translate(-50%, -20px)');
    }
    
    if (e.target.classList.contains('createBoardBtn')) {
        if (boardInput.value !== '') {
            window.location.reload();
            hideBoard(backgroundBoard, 'none', 0, 'translate(-50%, -20px)');
            createObjToLS(boardInput.value);
            boardInput.value = '';
        }
    }


})

// Add Active To Chose Status
liStatus.forEach(li => {
    li.addEventListener('click', (e) => {
        spanStatus.innerHTML = e.target.children[0].innerHTML;
        removeActiveStatus();
        li.classList.add('active');
    })
})

//
function removeActiveStatus() {
    liStatus.forEach(li => {
        li.classList.remove('active');
    })
}

//
function showBoard(boardBackground, val1, val2, val3) {
    boardBackground.style.display = val1;
        setTimeout(() => {
                boardBackground.children[0].style.opacity = val2;
                boardBackground.children[0].style.transform = val3;
            }, 200);
}

// 
function hideBoard(boardBackground, val1, val2, val3) {
    setTimeout(() => {
    boardBackground.style.display = val1;
    }, 500);
    boardBackground.children[0].style.opacity = val2;
    boardBackground.children[0].style.transform = val3;
}

// Add Create Board From Ls To Side Bar
function createBoard(val) {
    let board = document.createElement('div');
    board.className = 'board';
    board.setAttribute('id', val);
    
    let img = document.createElement('img');
    img.className = 'imgBoard';
    img.src = 'img/board.png';
    
    let h5 = document.createElement("h5");
    h5.className = 'textBoard';
    h5.appendChild(document.createTextNode(val));
    
    board.appendChild(img);
    board.appendChild(h5);
    sideBarContent.appendChild(board);
    
    countLengthBoard();
}


// 
function createObjToLS(boardNames) {
    let obj = {
        boardTitle: boardNames,
        taskArray: [

        ]
    }
    let array = [];
    if (localStorage.getItem('obj')) {
        array = JSON.parse(localStorage.getItem('obj'));
    }
    array.unshift(obj);
    localStorage.setItem('obj', JSON.stringify(array))

}

//
function createBoardFromLS() {
    let array = JSON.parse(localStorage.getItem('obj'));
    array.forEach(obj => {
        createBoard(obj.boardTitle);
    });
}

if (localStorage.getItem('obj')) {
    createBoardFromLS();
}

//
function craeteTasksFromLS(nameBoard) {

    let arrayOne = JSON.parse(localStorage.getItem('obj'));

    let array = arrayOne.filter(x => x.boardTitle.toLowerCase() === nameBoard.toLowerCase());

    if (array[0].taskArray.length == 0) {

        intro.style.display = 'none';

        empty.style.display = 'block';

        // Display On 
    todoCtn.parentElement.style.display = 'none';
    doingCtn.parentElement.style.display = 'none';
    doneCtn.parentElement.style.display = 'none';

    } else {

        //
        empty.style.display = 'none';
        
        // Empty Tasks Containrs
        todoCtn.innerHTML = '';
        doingCtn.innerHTML = '';
        doneCtn.innerHTML = '';

        // Display On 
        todoCtn.parentElement.style.display = 'block';
        doingCtn.parentElement.style.display = 'block';
        doneCtn.parentElement.style.display = 'block';

        // Display Off 
        intro.style.display = 'none';

        for (let i = 0; i < array[0].taskArray.length; i++) {

            // Count Total Subtasks In One Task
            let subtasksTotal = array[0].taskArray[i].subtasksArray.length;

            // Count Finish SubTasks
            let arrayOfSubtasks = array[0].taskArray[i].subtasksArray;
            let finishSubTasks = arrayOfSubtasks.filter(e => e.done === true);
            
            let task = document.createElement('div');
            task.className = 'task task-Details task-Details-Ctn';
            task.dataset.id_task = array[0].taskArray[i].id;
            
            let h3 = document.createElement('h3');
            h3.className = 'task-Details task-Details-Ttl';
            h3.appendChild(document.createTextNode(array[0].taskArray[i].title));
            
            let span = document.createElement('span');
            span.className = 'task-Details task-Details-Spn';
            span.appendChild(document.createTextNode(`${finishSubTasks.length} of ${subtasksTotal} subTasks`))
            
            // Append All Element To Parent (Task)
            task.appendChild(h3);
            task.appendChild(span);

            // Append Task Depending On Status
            if (array[0].taskArray[i].status.toLowerCase() === 'todo') {
                todoCtn.appendChild(task);
            }
            if (array[0].taskArray[i].status.toLowerCase() === 'doing') {
                doingCtn.appendChild(task);
            }
            if (array[0].taskArray[i].status.toLowerCase() === 'done') {
                doneCtn.appendChild(task);
            }
            
        }

    }

    // All Pro
    if (document.body.clientWidth >= 576) {
        document.querySelector('.btn-55').classList.remove('dont-click');
        document.querySelector('.btn-55').classList.add('addTask');

        document.querySelector('.is-60').classList.remove('dont-click');
        document.querySelector('.is-60').classList.add('toggleMore');
        
        document.querySelector('.is-60 img').classList.remove('dont-click');
        document.querySelector('.is-60 img').classList.add('toggleMore');
    } else {
        document.querySelector('.addTaskBtn').classList.remove('dont-click');
        document.querySelector('.addTaskBtn').classList.add('addTask');
        
        document.querySelector('.is-50').classList.remove('dont-click');
        document.querySelector('.is-50').classList.add('controlUlMore');

        document.querySelector('.is-50 img').classList.add('controlUlMore');
        document.querySelector('.is-50 img').classList.remove('dont-click');
    }

}

// Calculet Number Of Task In Columns
function calculation() {
    let spanTodo = document.querySelector('.boardContent .todo header span');

    let spanDoing = document.querySelector('.boardContent .doing header span');

    let spanDone = document.querySelector('.boardContent .done header span');

    let numTaskTodo = document.querySelectorAll('.boardContent .todo .content .task');

    let numTaskDoing = document.querySelectorAll('.boardContent .doing .content .task');

    let numTaskDone = document.querySelectorAll('.boardContent .done .content .task');

    spanTodo.innerHTML = `(${numTaskTodo.length})`
    spanDoing.innerHTML = `(${numTaskDoing.length})`
    spanDone.innerHTML = `(${numTaskDone.length})`

}

// Create Taks and put It In the Right Place
addNewTask.addEventListener('click', (e) => {

    let currentBoard;

    if (document.body.clientWidth >= 576) {
        currentBoard = document.querySelector('.desktop h1').innerHTML;
    } else {
        currentBoard = document.querySelector('.mob .choseBoard span').innerHTML;
    }
    
    let titleTask = document.querySelector('.taskInput .titleInput input').value;
    
    let descriptionTask = document.querySelector('.taskInput .descriptionInput textarea').value;

    let subTasks = document.querySelectorAll('.taskInput .subTasksInput .subtask input');

    if (titleTask !== '' && descriptionTask !== '') {
        
        
        let arrayFromLS = JSON.parse(localStorage.getItem('obj'))
        let arrayWithMyObject = arrayFromLS.filter(x => x.boardTitle.toLowerCase() === currentBoard.toLowerCase());
        
        let arrayWithOutMyObject = arrayFromLS.filter(x => x.boardTitle.toLowerCase() !== currentBoard.toLowerCase());
        
        let obj = {
                id: Date.now(),
                title: titleTask,
                description: descriptionTask,
                status: 'todo',
                subtasksArray: []
        }
        
        subTasks.forEach(subtask => {

            if (subtask.value !== '') {
                let newSubTask = {
                    title: subtask.value,
                    done: false
                }
    
                obj.subtasksArray.push(newSubTask);
            }

        });

        // console.log(obj);

        arrayWithMyObject[0].taskArray.push(obj);

        arrayWithOutMyObject.unshift(arrayWithMyObject[0]);

        localStorage.setItem('obj', JSON.stringify(arrayWithOutMyObject));

        location.reload();
        
    } else {
        getMessage('Please Fill All Inputs')
    }

})


let passDlt = true;

body.addEventListener('click', (e) => {
    if (e.target.classList.contains('showDlt')) {
        
        if (passDlt) {
            // Show Delete Task
            document.querySelector('.more-task ul').style.display = 'block';
            passDlt = false;
        } else {
            // Hide Delete Task
            document.querySelector('.more-task ul').style.display = 'none';
            passDlt = true;
        }
    }
})




body.addEventListener('click', (e) => {
    
    if (e.target.classList.contains('task-Details-Ctn')) {

        let taskId = e.target.dataset.id_task;
        getTaskFromLS(taskId);

    }

    if (e.target.classList.contains('task-Details-Ttl')) {

        let taskId = e.target.parentElement.dataset.id_task;
        getTaskFromLS(taskId);

    }

    if (e.target.classList.contains('task-Details-Spn')) {

        let taskId = e.target.parentElement.dataset.id_task;
        getTaskFromLS(taskId);

    }
    

})

function getTaskFromLS(taskId) {
    let currentBoard;

        if (document.body.clientWidth >= 576) {
            currentBoard = document.querySelector('.desktop h1').innerHTML;
        } else {
            currentBoard = document.querySelector('.mob .choseBoard span').innerHTML;
        }

        let arrayFromLs = JSON.parse(localStorage.getItem('obj'));
        let arrayWithMyObj = arrayFromLs.filter(x => x.boardTitle.toLowerCase() === currentBoard.toLowerCase());

        let tasksArray = arrayWithMyObj[0].taskArray;

        let tasksArrayWithMyId = tasksArray.filter(x => x.id == taskId);

        showDetailsFromTaks(tasksArrayWithMyId);
}

function showDetailsFromTaks(array) {

    let headingTitle = document.querySelector('.taskStatus .heading h3');

    headingTitle.innerHTML = array[0].title;

    let description = document.querySelector('.taskStatus .description');

    description.innerHTML = array[0].description;

    let subtasksArray = array[0].subtasksArray;

    document.querySelector('.taskStatus .subtasks').innerHTML = '';

    let h4 = document.createElement('h4');
    h4.appendChild(document.createTextNode('Subtasks'));
    document.querySelector('.taskStatus .subtasks').appendChild(h4);

    subtasksArray.forEach((subtask, i) => {

        
        let subtaskCtn = document.createElement('div');
        subtaskCtn.className = 'inputSubtasks';

        let input = document.createElement('input');
        input.className ='checkIn-3';
        input.type = 'checkbox';
        input.id = i;
        if (subtask.done) {
            input.checked = true;
        }

        let label = document.createElement('label');
        label.className = 'checkIn-3';
        label.setAttribute('for', i);
        label.appendChild(document.createTextNode(subtask.title));

        subtaskCtn.appendChild(input);
        subtaskCtn.appendChild(label);
        document.querySelector('.taskStatus .subtasks').appendChild(subtaskCtn);

    })

}

// Delete Task 
body.addEventListener('click', (e) => {

    if (e.target.classList.contains('delete-Task')) {

        let nameTask = e.target.parentElement.parentElement.parentElement.children[0].innerHTML;

        console.log(nameTask)

        let currentBoard;

        if (document.body.clientWidth >= 576) {
            currentBoard = document.querySelector('.desktop h1').innerHTML;
        } else {
            currentBoard = document.querySelector('.mob .choseBoard span').innerHTML;
        }

        let arrayFromLS = JSON.parse(localStorage.getItem('obj'));

        let arrayWithOutMyObject = arrayFromLS.filter(x => x.boardTitle.toLowerCase() !== currentBoard.toLowerCase());

        let myArrayWithBoard = arrayFromLS.filter(x => x.boardTitle.toLowerCase() === currentBoard.toLowerCase());
        
        let arrayOfSubtasks = myArrayWithBoard[0].taskArray;
        
        let arrayWithOutMyTask = arrayOfSubtasks.filter(x => x.title.toLowerCase() !== nameTask.toLowerCase());
        
        myArrayWithBoard[0].taskArray = arrayWithOutMyTask;
        
        console.log(myArrayWithBoard);
        
        arrayWithOutMyObject.unshift(myArrayWithBoard[0]);
        
        localStorage.setItem('obj', JSON.stringify(arrayWithOutMyObject));

        location.reload();

    }

})

// Add Check To SubTask
body.addEventListener('click', (e) => {

    if (e.target.classList.contains('checkIn-3')) {
        
        // let nameTask = e.target.parentElement.parentElement.parentElement.children[0].innerHTML;

        let nameTask = document.querySelector('.taskStatus .heading h3').innerHTML;

        let nameSubtask = e.target.parentElement.children[1].innerHTML;

        let currentBoard;

        if (document.body.clientWidth >= 576) {
            currentBoard = document.querySelector('.desktop h1').innerHTML;
        } else {
            currentBoard = document.querySelector('.mob .choseBoard span').innerHTML;
        }

        let arrayFromLS = JSON.parse(localStorage.getItem('obj'));

        let arrayWithOutMyObject = arrayFromLS.filter(x => x.boardTitle.toLowerCase() !== currentBoard.toLowerCase());

        let arrayWithMyObject = arrayFromLS.filter(x => x.boardTitle.toLowerCase() === currentBoard.toLowerCase());

        let arrayOfTasks = arrayWithMyObject[0].taskArray;

        let arrayWithOutMyTask = arrayOfTasks.filter(x => x.title.toLowerCase() !== nameTask.toLowerCase());
        
        let arrayWithMyTask = arrayOfTasks.filter(x => x.title.toLowerCase() === nameTask.toLowerCase());

        let arrayofMySubtasks = arrayWithMyTask[0].subtasksArray;

        let arrayWithOutMySubtask = arrayofMySubtasks.filter(x => x.title.toLowerCase() !== nameSubtask.toLowerCase());
        
        let arrayWithMySubtask = arrayofMySubtasks.filter(x => x.title.toLowerCase() === nameSubtask.toLowerCase());

        if (arrayWithMySubtask[0].done) {
            arrayWithMySubtask[0].done = false
        } else {
            arrayWithMySubtask[0].done = true
        }

        arrayWithOutMySubtask.push(arrayWithMySubtask[0]);

        arrayWithMyTask[0].subtasksArray = arrayWithOutMySubtask;
        
        arrayWithOutMyTask.unshift(arrayWithMyTask[0]);
        
        arrayWithMyObject[0].taskArray = arrayWithOutMyTask;
        
        arrayWithOutMyObject.unshift(arrayWithMyObject[0]);

        localStorage.setItem('obj', JSON.stringify(arrayWithOutMyObject));

    }

})

// 
addActiveToBoard();

body.addEventListener('click', (e) => {

    if (e.target.classList.contains('checkIn-3')){
        
        let nameTask = document.querySelector(".taskStatus .heading h3").innerHTML;

        let currentBoard;

        if (document.body.clientWidth >= 576) {
            currentBoard = document.querySelector('.desktop h1').innerHTML;
        } else {
            currentBoard = document.querySelector('.mob .choseBoard span').innerHTML;
        }

        let arrayFromLS = JSON.parse(localStorage.getItem('obj'));

        let arrayWithOutMyObject = arrayFromLS.filter(x => x.boardTitle.toLowerCase() !== currentBoard.toLowerCase());

        let arrayWithMyObject = arrayFromLS.filter(x => x.boardTitle.toLowerCase() === currentBoard.toLowerCase());

        let arrayOfTasks = arrayWithMyObject[0].taskArray;

        let arrayWithOutMyTask = arrayOfTasks.filter(x => x.title.toLowerCase() !== nameTask.toLowerCase());
        
        let arrayWithMyTask = arrayOfTasks.filter(x => x.title.toLowerCase() === nameTask.toLowerCase());

        console.log(arrayWithMyTask)
        
        let arrayofMySubtasks = arrayWithMyTask[0].subtasksArray;

        let arrayWithTrueSubtasks = arrayofMySubtasks.filter(x => x.done === true);
        
        if (arrayofMySubtasks.length == arrayWithTrueSubtasks.length) {
            
            arrayWithMyTask[0].status = 'done';
            console.log(arrayWithMyTask)

        }
        
        if (arrayWithTrueSubtasks.length > 0 && arrayofMySubtasks.length > arrayWithTrueSubtasks.length) {

            arrayWithMyTask[0].status = 'doing';
            console.log(arrayWithMyTask)

        }
        
        if (arrayWithTrueSubtasks.length == 0) {

            arrayWithMyTask[0].status = 'todo';
            console.log(arrayWithMyTask)

        }

        arrayWithOutMyTask.unshift(arrayWithMyTask[0]);
        
        arrayWithMyObject[0].taskArray = arrayWithOutMyTask;
        
        arrayWithOutMyObject.unshift(arrayWithMyObject[0]);

        localStorage.setItem('obj', JSON.stringify(arrayWithOutMyObject));

    }

})

