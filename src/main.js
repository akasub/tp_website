'use strict';

import { All } from './allWorksList.js';

const container = document.querySelector('#container');
const navbarTypes = document.querySelector('.navbar__types');
const navbarMenus = document.querySelector('.navbar__menus');

// Main Load
window.addEventListener('DOMContentLoaded', () => {
    if (container) {
        contentsLoader(All);
        document.querySelectorAll('.lazyload').forEach(function (el) {//lazyload란 클래스를 가진 태그를 관찰
            io.observe(el);
        });
    }
});

//Type Load
navbarTypes.addEventListener('click', (e) => {
    const type = e.target.dataset.type;
    if (type) {
        if (type === 'All') {
            document.location.href = '/'
        } else {
            const currentType = document.querySelector('.selected');
            unselecter(currentType);
            typeColorChanger(type);
            contentsLoader(filterType(All, type));
            document.querySelectorAll('.lazyload').forEach(function (el) {//lazyload란 클래스를 가진 태그를 관찰
                io.observe(el);
            });
        }
    }
})

//refresh
const home = document.querySelector('.navbar__title');
home.addEventListener('click', () => document.location.href = '/');

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
sender();  //for item pages
function sender() {
    if (!container) { return; }
    container.addEventListener('click', (e) => {
        const thumbDiv = e.target.parentNode;
        const itemDiv = thumbDiv.parentNode;
        const dataNum = itemDiv.dataset.number;
        if (!dataNum) { return; }
        console.log(dataNum);
        location.href = `${dataNum}.html`; //change later!
        projectLoader(dataNum);
    })
}

const options = {//얼마나 노출되었을 때 발동할지 옵션설정
    threshold: 0
}
var io = new IntersectionObserver(function (entries) {//io라는 이름의 IntersectionObserver를 생성
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {//만약 이미지를 관찰하고 있다면 
            io.unobserve(entry.target);//이미지 관찰종료
            entry.target.src = entry.target.dataset.src;//해당되는 이미지의 dataset.src를 src로 변경
        } else {
            return !1;
        }

    });
}, options);



//functions
function contentsLoader(worksArray) {
    container.innerHTML = '';
    for (let i = 0; i < worksArray.length; i++) {
        const div = document.createElement('div');
        div.dataset.number = worksArray[i].number;
        div.dataset.type = worksArray[i].type;
        div.innerHTML = `
        <div class="item__thumb">
            <img src="imgs/blank.png" data-src="imgs/thumbs/${worksArray[i].number}.${worksArray[i].thumb}" alt="${All[i].number}" class="item__thumb__img lazyload">
        </div>
        <div class="item__description">
            <div class="item__descriptrion__en">
            <h3 class="en">${worksArray[i].en}</h3>
            <h3 class="en type-index">${typeAcronym(worksArray[i].type)}</h3>
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
function typeAcronym(type) {
    const shortType = type.map(function (item, index, array) {
        return item.charAt(0);
    })
    return shortType.join(', ');
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