'use strict';

import { allWorks } from './allWorksList.js';

const container = document.querySelector('#container');
const navbarTypes = document.querySelector('.navbar__types');
const navbarMenus = document.querySelector('.navbar__menus');

const brandings = filterType(allWorks, 'B');
const graphics = filterType(allWorks, 'G');
const motions = filterType(allWorks, 'M');
const editorials = filterType(allWorks, 'E');
const illustrations = filterType(allWorks, 'I');



// Main Load
window.addEventListener('DOMContentLoaded', contentsLoader(allWorks));

//Type Load
navbarTypes.addEventListener('click', (e) => {
    const type = e.target.dataset.type;
    // const typeToContainer = type.replace(/'/gi, '');
    const currentType = document.querySelector('.selected');
    unselecter(currentType);
    typeColorChanger(type);
    switch (type) {
        case 'A':
            contentsLoader(allWorks);
            break;
        case 'B':
            contentsLoader(brandings);
            break;
        case 'G':
            contentsLoader(graphics);
            break;
        case 'M':
            contentsLoader(motions);
            break;
        case 'E':
            contentsLoader(editorials);
            break;
        case 'I':
            contentsLoader(illustrations);
            break;
    }
})

//Hamburger
const toggleBtn = document.querySelector('.toggle-btn');
let opened = false;
toggleBtn.addEventListener('click', () => {
    if (!opened) {
        openBurger();
        opened = true;
    } else {
        closeBurger();
        opened = false;
    }
})

//작은 화면에서 토글 끈 채로 화면 커지면 navbar 안나오는 문제. 
// window.addEventListener('resize', () => {
//     const screenWidth = window.screen.width;
//     if (screenWidth > 768) {
//         openBurger();
//     }
// })

//Link to pages
container.addEventListener('click', (e) => {
    const thumbDiv = e.target.parentNode;
    const itemDiv = thumbDiv.parentNode;
    let dataNum = itemDiv.dataset.number;
    location.href = `http://www.toastedpage.com/${dataNum}`;
})

//functions
function contentsLoader(worksArray) {
    container.innerHTML = '';
    for (let i = 0; i < worksArray.length; i++) {
        const div = document.createElement('div');
        div.dataset.number = worksArray[i].number;
        div.dataset.type = worksArray[i].type;
        div.innerHTML = `
        <div class="item__thumb">
            <img src="imgs/sample/${worksArray[i].number}.png" alt="${allWorks[i].number}" class="item__thumb__img">
        </div>
        <div class="item__description">
            <div class="item__descriptrion__en">
            <h3 class="en">${worksArray[i].en}</h3>
            <h3 class="en typeIndex">${worksArray[i].type}</h3>
            </div>
            <h3 class="ko">${worksArray[i].ko}</h3>
        </div>`
        container.appendChild(div);
    }
}
function filterType(arr, a) {
    const newArr = [];
    for (let i in arr) {
        if (arr[i].type.includes(a)) {
            newArr.push(arr[i]);
        }
    }
    return newArr;
}
function typeColorChanger(type) {
    const selectedType = document.querySelector(`h4[data-type="${type}"]`);
    selectedType.setAttribute('class', 'selected');
}
function unselecter(currentType) {
    currentType.removeAttribute('class', 'selected');
}
function openBurger() {
    navbarTypes.style.display = 'flex';
    navbarMenus.style.display = 'flex';
}
function closeBurger() {
    navbarTypes.style.display = 'none';
    navbarMenus.style.display = 'none';
}