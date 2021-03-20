'use strict';

import { allWorks } from './allWorksList.js';


const project = document.querySelector('#project');


//console.log(window.location.href);
console.log(window.location.pathname);
const projectIndex = window.location.pathname.substr(1, 6);
console.log(projectIndex);

window.projectLoader = projectLoader;
function projectLoader(num) {
    const strToNum = parseInt(num);
    const index = allWorks.findIndex(el => el.number === strToNum); //이게 일단 안됨.
    console.log(index);
    project.innerHTML = `
    <div class="project__text">
    <div class="project__text__title">
        <h1 class="en">${allWorks[index].en}</h1>
        <h1 class="ko">${allWorks[index].ko}</h1>
        <h4>Motion, Illustration</h4>
    </div>

    <div class="project__text__description">
        <div class="text__description__en">
            <p class="en description">${allWorks[index].enTxt}
            </p>

            <p class="en etc">${allWorks[index].enEtc}</p>
        </div>
        <div class="text__description__ko">
            <p class="ko description">${allWorks[index].koTxt}</p>
            <p class="ko etc">${allWorks[index].koEtc}</p>
        </div>
    </div>
</div>
<div class="project__images">
    <div class="project__image max-width--1"><img src="imgs/sample/1440.jpg" alt=""></div>
    <div class="project__image text-width--1"><img src="imgs/sample/1440.jpg" alt=""></div>
    <div class="project__image max-width--2">
        <img src="imgs/sample/1440.jpg" alt=""><img src="imgs/sample/1440.jpg" alt="">
    </div>
    <div class="project__images text-width--2"><img src="imgs/sample/1440.jpg" alt=""><img
            src="imgs/sample/1440.jpg" alt=""></div>
</div>
    `
}

if (project) {
    projectLoader(projectIndex);
}