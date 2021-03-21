'use strict';

import { allWorks } from './allWorksList.js';

const project = document.querySelector('#project');


//console.log(window.location.href);
console.log(window.location.pathname);
const projectIndex = window.location.pathname.substr(1, 6);
const strToNum = parseInt(projectIndex);
const index = allWorks.findIndex(el => el.number === strToNum);

if (project) {
    projectLoader(index);
    projectImgLoader(index);
}




function projectLoader(num) {
    // const strToNum = parseInt(num);
    // const index = allWorks.findIndex(el => el.number === strToNum);
    console.log(index);
    project.innerHTML = `
    <div class="project__text">
    <div class="project__text__title">
        <h1 class="en">${allWorks[index].en}</h1>
        <h1 class="ko">${allWorks[index].ko}</h1>
        <h4>${allWorks[index].type}</h4>
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
    `

}

function projectImgLoader(num) {
    const imgs = allWorks[num].imgs;
    const imgContainer = document.createElement('div');
    imgContainer.setAttribute('class', 'project__images');
    project.appendChild(imgContainer);

    for (let i = 0; i < imgs.length; i++) {
        const imgDiv = document.createElement('div'); //must be inside of 'for'
        const img = document.createElement('img');
        const imgWidth = imgs[i].substr(3, 3);

        imgDiv.setAttribute('class', `${imgWidth} project__image`);
        img.setAttribute('src', `imgs/projects/${projectIndex}/${imgs[i]}`)
        imgDiv.appendChild(img);
        imgContainer.appendChild(imgDiv);

        switch (imgWidth) {
            case 'mw1':
                break;
            case 'tw1':
                break;
            case 'mw2':
                const secondMw = document.createElement('img');
                secondMw.setAttribute('src', `imgs/projects/${projectIndex}/${imgs[i + 1]}`)
                imgDiv.appendChild(secondMw);
                i++;
                break;
            case 'tw2':
                const secondTw = document.createElement('img');
                secondTw.setAttribute('src', `imgs/projects/${projectIndex}/${imgs[i + 1]}`)
                imgDiv.appendChild(secondTw);
                i++;
                break;
        }
        console.log(i);
    }

}

