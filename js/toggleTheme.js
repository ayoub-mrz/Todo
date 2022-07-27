// // Selectors 

let root = document.querySelector(':root');

// let toggle = document.querySelector('.toggle');

// let toggleStatus = 'light';

// Set Colors Variables
root.style.cssText = '--Color1: #21212d; --Color2: #2c2c38; --Color3: #645fc6; --Color4: #fff; --Color5: #818181;';



// // Toggle Active
// toggle.addEventListener('click', (e) => {
//     if (toggleStatus === 'light') {
//         toggleControl('translateX(30px)', 'dark')
//     } else {
//         toggleControl('unset', 'light')
//     }
// })

// // function Toggle Control 
// function toggleControl(val1, val2) {
//     toggle.style.transform = val1;
//     toggleStatus = val2;
//     localStorage.setItem('theme', val2)
// }