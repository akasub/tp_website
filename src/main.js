'use strict';

import { All } from './allWorksList.js';

const container = document.querySelector('#container');
const navbarTypes = document.querySelector('.navbar__types');
const navbarMenus = document.querySelector('.navbar__menus');
const itemBox = document.querySelectorAll('.item__box');


const io = new IntersectionObserver((entries, observer) => {
    console.log(entries);
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            console.log('intersecting');
            console.log(entry.target);
            let lazyImage = entry.target.querySelector('img');
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.classList.remove("lazy");
            lazyImage.style.visibility = 'visible';
            io.unobserve(lazyImage);
        }
    })
});
let dataIndex = 0;
itemBox.forEach((item) => {
    io.observe(item);
    item.dataset.index = dataIndex;
    dataIndex++;
});


// Main Load
//window.addEventListener('DOMContentLoaded', () => { if (container) { contentsLoader(All) } });
// if (container) {
//     contentsLoader(All);
//     const itemBoxes = document.querySelectorAll('.item__box');
//     if (window.innerWidth > 768) {
//         earlyBirds = 12;
//         imgLoader(earlyBirds, itemBoxes);
//     } else { earlyBirds = 6; imgLoader(earlyBirds, itemBoxes); }
// };

//Type Load
// navbarTypes.addEventListener('click', (e) => {
//     const type = e.target.dataset.type;
//     if (type) {
//         if (type === 'All') {
//             document.location.href = '/'
//         } else {
//             const currentType = document.querySelector('.selected');
//             unselecter(currentType);
//             typeColorChanger(type);
//             contentsLoader(filterType(All, type));
//         }
//     }
// })

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



//functions

function contentsLoader(worksArray) {
    container.innerHTML = '';
    for (let i = 0; i < worksArray.length; i++) {
        const div = document.createElement('div');
        div.dataset.index = i;
        div.dataset.number = worksArray[i].number;
        div.dataset.type = worksArray[i].type;
        div.classList.add('item__box');
        div.classList.add('lazy');
        div.innerHTML = `
        <div class="item__thumb">
            <img src="imgs/thumbs/placeholder.jpg" data-src="imgs/thumbs/${worksArray[i].number}.${worksArray[i].thumb}" alt="${All[i].number}" class="item__thumb__img">
        </div>
        <div class="item__description">
            <div class="item__descriptrion__en">
            <h3 class="en">${worksArray[i].en}</h3>
            <h3 class="en type-index">${typeAcronym(worksArray[i].type)}</h3>
            </div>
            <h3 class="ko">${worksArray[i].ko}</h3>
        </div>`;
        //hidden, data-src add! 
        container.appendChild(div);
    }
}



function imgLoader(num, itemBox) {
    for (let i = 0; i < num; i++) {
        const source = itemBox[i].querySelector('img').dataset.src;
        itemBox[i].querySelector('img').setAttribute('src', source);
        itemBox[i].removeAttribute('class');
        itemBox[i].classList.add('item__box');
    }
    lazyItems = document.querySelectorAll('.lazy');
}

// window.addEventListener('scroll', () => {
//     lazyItems.forEach(el => {
//         io.observe(el);
//     });
// })




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



//Intersection Observer


// const io = new IntersectionObserver((entries, observer) => {
//     entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//             let lazyImage = entry.target;
//             lazyImage.src = lazyImage.dataset.src;
//             lazyImage.classList.remove("lazy");
//             lazyImageObserver.unobserve(lazyImage);
//         }
//     });

