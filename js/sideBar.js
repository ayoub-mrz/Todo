// Selector

let spanBord = document.querySelector('.content h4 span');


let board = document.querySelector('.content .board');

let titleNavDesktop = document.querySelector('.desktop h1');


// Set Length Of Bords
function countLengthBoard() {
    spanBord.innerHTML = `(${document.querySelectorAll('.content .board').length})`;
}
countLengthBoard();

// Add Active Class To Board
body.addEventListener('click', (e) => {
    if (e.target.classList.contains('board')) {

        // Control Active Class On Board
        removeActive();
        e.target.classList.add('active');

        // Get Content Of Board By Click
        let nameBoard = e.target.children[1].innerHTML;
        craeteTasksFromLS(nameBoard);

        // Change Title When Board Change
        titleNavDesktop.innerHTML = nameBoard;

        //
        calculation();

        // 
        sessionStorage.setItem('currentBoard', nameBoard);

    }

    if (e.target.classList.contains('imgBoard')) {

        // Control Active Class On Board
        removeActive();
        e.target.parentElement.classList.add('active');

        // Get Content Of Board By Click
        let nameBoard = e.target.parentElement.children[1].innerHTML;
        craeteTasksFromLS(nameBoard);
        
        // Change Title When Board Change
        titleNavDesktop.innerHTML = nameBoard;

        //
        calculation();

        //
        sessionStorage.setItem('currentBoard', nameBoard);

    }

    if (e.target.classList.contains('textBoard')) {

        // Control Active Class On Board
        removeActive();
        e.target.parentElement.classList.add('active');

        // Get Content Of Board By Click
        let nameBoard = e.target.innerHTML;
        craeteTasksFromLS(nameBoard);
        
        // Change Title When Board Change
        titleNavDesktop.innerHTML = nameBoard;

        //
        calculation();

        //
        sessionStorage.setItem('currentBoard', nameBoard);

    }

})

// Remove Active Class From All Boards
function removeActive() {
    let allBords = document.querySelectorAll('.content .board');
    allBords.forEach(board => {
        board.classList.remove('active');
    })
}

function addActiveToBoard() {
    if (sessionStorage.getItem('currentBoard')) {

        let myBoard = document.getElementById(sessionStorage.getItem('currentBoard'));

        myBoard.classList.add('active');

        //
        craeteTasksFromLS(sessionStorage.getItem('currentBoard'));

        if (document.body.clientWidth >= 576) {

            // Change Title Board
            titleNavDesktop.innerHTML = sessionStorage.getItem('currentBoard');

        } else {

            // Change Title Board
            titleNavMobile.innerHTML = sessionStorage.getItem('currentBoard');

        }

        //
        calculation();
    
    }
}

















