'use strict';

import { All } from './allWorksList.js';
console.log(All);

const options = {//얼마나 노출되었을 때 발동할지 옵션설정
    threshold: 0
}
const io = new IntersectionObserver(function (entries) {//io라는 이름의 IntersectionObserver를 생성
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {//만약 이미지를 관찰하고 있다면 
            io.unobserve(entry.target);//이미지 관찰종료
            entry.target.querySelectorAll('img').forEach(function (el) {
                el.src = el.dataset.src;
            })
            //entry.target.src = entry.target.dataset.src;//해당되는 이미지의 dataset.src를 src로 변경
        } else {
            return !1;
        }

    });
}, options);

const project = document.querySelector('#project');
const tail = document.querySelector('#tail');
const tailLeft = document.querySelector('.tail__left');
const tailRight = document.querySelector('.tail__right');

//console.log(window.location.href);
//console.log(window.location.pathname);
const projectIndex = window.location.pathname.substr(1, 6);
const strToNum = parseInt(projectIndex);
const index = All.findIndex(el => el.number === strToNum);

const home = document.querySelector('.navbar__title');
home.addEventListener('click', () => document.location.href = '/');

if (project) {
    projectLoader(index);
    projectImgLoader(index);
    document.querySelectorAll('.lazyload').forEach(function (el) {//lazyload란 클래스를 가진 태그를 관찰
        io.observe(el);
    });
}

if (index === 0) {
    tailLeft.style.visibility = 'hidden';
} else if (index === All.length - 1) {
    tailRight.style.visibility = 'hidden';
}

tail.addEventListener('click', (e) => {
    const way = e.target.parentNode.classList;
    //console.log(index);

    switch (way[0]) {
        case 'tail__left':
            location.href = `${All[index - 1].number}.html`;
            break;
        case 'tail__random':
            const randomNum = Math.floor(Math.random() * (All.length - 1));
            location.href = `${All[randomNum].number}.html`;
            break;
        case 'tail__right':
            location.href = `${All[index + 1].number}.html`;
            break;
    }
})




function projectLoader(num) {
    // const strToNum = parseInt(num);
    // const index = All.findIndex(el => el.number === strToNum);
    project.innerHTML = `
    <div class="project__text">
    <div class="project__text__title">
    <h4 class="type-under-title">${All[index].type.join(", ")}</h4>
        <h1 class="en">${All[index].en}</h1>
        <h1 class="ko">${All[index].ko}</h1>
    
    </div>

    <div class="project__text__description">
        <div class="text__description__en">
            <p class="en description">${All[index].enTxt}
            </p>

            <p class="en etc">${All[index].enEtc}</p>
        </div>
        <div class="text__description__ko">
            <p class="ko description">${All[index].koTxt}</p>
            <p class="ko etc">${All[index].koEtc}</p>
        </div>
    </div>
</div>
    `
}

function projectImgLoader(num) {
    const imgs = All[num].imgs;
    const imgContainer = document.createElement('div');
    imgContainer.setAttribute('class', 'project__images');
    project.appendChild(imgContainer);

    for (let i = 0; i < imgs.length; i++) {
        const imgDiv = document.createElement('div'); //must be inside of 'for'
        const img = document.createElement('img');
        const imgWidth = imgs[i].substr(3, 3);

        imgDiv.setAttribute('class', `${imgWidth} project__image`);
        imgDiv.classList.add('lazyload'); //여기서 setAttribute 하면 위에서 정한 클래스가 지워짐...
        img.dataset.src = `imgs/projects/${projectIndex}/${imgs[i]}`
        img.setAttribute('src', `imgs/blank.png`)
        imgDiv.appendChild(img);
        imgContainer.appendChild(imgDiv);

        switch (imgWidth) {
            case 'mw1':
                break;
            case 'tw1':
                break;
            case 'mw2':
                const secondMw = document.createElement('img');
                secondMw.dataset.src = `imgs/projects/${projectIndex}/${imgs[i + 1]}`;
                secondMw.setAttribute('src', '/imgs/blank.png')
                imgDiv.appendChild(secondMw);
                i++;
                break;
            case 'tw2':
                const secondTw = document.createElement('img');
                secondTw.dataset.src = `imgs/projects/${projectIndex}/${imgs[i + 1]}`;
                secondTw.setAttribute('src', '/imgs/blank.png')
                imgDiv.appendChild(secondTw);
                i++;
                break;
        }
    }
}

