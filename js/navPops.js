// Selectors

let body = document.querySelector("body");

let ulBoard = document.querySelector('.boardList');

let ulMore = document.querySelector('.more ul');

let choseBoard = document.querySelector('.choseBoard');

let arrow = document.querySelector('.choseBoard img');

let toggleMore = document.querySelector(".is-60");

let moreUlD = document.querySelector('.is-60 ul');

let titleNavMobile = document.querySelector('.mob .choseBoard span');

let pass = true;

// Trigger Create Board Name In Mobile
if (localStorage.getItem('obj')) {
    CreateBoardNameMobile();
}

// Get Ul Height 
let ulBoardHeight = ulBoard.offsetHeight;
ulBoard.style.height = '0';

// Get Ul Height 
let ulMoreHeight = ulMore.offsetHeight;
ulMore.style.height = '0';

//
body.addEventListener('click', (e) => {

    // Board Ul
    if (e.target.classList.contains('controlUlBoard')) {
        chowHideUl(ulBoard, ulBoardHeight);
    }
    
    // More Ul
    if (e.target.classList.contains('controlUlMore')) {
        chowHideUl(ulMore, ulMoreHeight);
    }

})


//chow and Hide Uls
function chowHideUl(ul, ulHeight) {
    let ulChildCount = ul.children.length;

    // Get and Hide Ul
    if (pass) {
        controlAnimationUl('rotate(180deg)', ulHeight);
        pass = false;
    } else {
        controlAnimationUl('rotate(0deg)', -ulChildCount);
        pass = true;
    }

    // control Animation Ul
    function controlAnimationUl(direction, valueHeight,) {
        arrow.style.transform = direction;
        ul.style.height = `${valueHeight + ulChildCount}px`;
    }
}

// Show and Hide More On Desktop
let UlheightD = moreUlD.offsetHeight;
moreUlD.style.height = "0";

let moreUlChildD = moreUlD.children.length;

toggleMore.addEventListener('click', (e) => {
    if (pass) {
        moreUlD.style.height = `${UlheightD + moreUlChildD}px`;
        pass = false;
    } else {
        moreUlD.style.height = `${0}px`;
        pass = true;
    }
})

// Create Board Name In Nav Mobile
function CreateBoardNameMobile() {
    let ul = document.querySelector('.boardList');

    let arrayFromLS = JSON.parse(localStorage.getItem('obj'));
    arrayFromLS.forEach(board => {
        let li = document.createElement('li');
        li.className = 'boardMB';

        let img = document.createElement('img');
        img.src = 'img/board.png';
        img.alt = 'board';
        img.className = 'boardimgMB';

        let span = document.createElement('span');
        span.className = 'textBoardMB';
        span.appendChild(document.createTextNode(board.boardTitle));

        li.appendChild(img);
        li.appendChild(span);

        ul.prepend(li);

    });

}

// Add Class For Current Li
body.addEventListener('click', (e) => {

    if (e.target.classList.contains('boardMB')) {
        removeClassLi();
        e.target.classList.add('active');

        // Get Name Of Board
        let nameBoardLi = e.target.children[1].innerHTML;
        craeteTasksFromLS(nameBoardLi);

        // Change Title When Board Change
        titleNavMobile.innerHTML = nameBoardLi;

        //
        calculation();

        //
        sessionStorage.setItem('currentBoard', nameBoardLi);

    }
    
    if (e.target.classList.contains('boardimgMB')) {
        removeClassLi();
        e.target.parentElement.classList.add('active');

        // Get Name Of Board
        let nameBoardLi = e.target.parentElement.children[1].innerHTML;
        craeteTasksFromLS(nameBoardLi);

        // Change Title When Board Change
        titleNavMobile.innerHTML = nameBoardLi;

        //
        calculation();

        //
        sessionStorage.setItem('currentBoard', nameBoardLi);

    }
    
    if (e.target.classList.contains('textBoardMB')) {
        removeClassLi();
        e.target.parentElement.classList.add('active');

        // Get Name Of Board
        let nameBoardLi = e.target.innerHTML;
        craeteTasksFromLS(nameBoardLi);

        // Change Title When Board Change
        titleNavMobile.innerHTML = nameBoardLi;

        //
        calculation();

        //
        sessionStorage.setItem('currentBoard', nameBoardLi);

    }

    // Delete Current Board
    if (e.target.classList.contains('dlt-Btn')) {

        let currentBoard;

        if (document.body.clientWidth >= 576) {
            currentBoard = document.querySelector('.desktop h1').innerHTML;
        } else {
            currentBoard = document.querySelector('.mob .choseBoard span').innerHTML;
        }

        DeleteBoard(currentBoard);

    }

})

// Remove Active Class from Li Mobile
function removeClassLi() {
    let allLi = document.querySelectorAll('.boardList li');

    allLi.forEach(x => {
        x.classList.remove('active');
    })
}

// 
function DeleteBoard(val) {

    let arrayfromLs = JSON.parse(localStorage.getItem('obj'));
    let array = arrayfromLs.filter(x => x.boardTitle.toLowerCase() !== val.toLowerCase());

    localStorage.setItem('obj', JSON.stringify(array));

    sessionStorage.removeItem('currentBoard');

    location.reload();

}