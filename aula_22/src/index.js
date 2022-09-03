import './style.scss'
import img from './image.jpg'

function titleComponent(){
    const elemH1 = document.createElement('h1');
    elemH1.innerHTML = 'Hello World';
    elemH1.classList.add('title')
    return elemH1;
}

function imageComponent(){
    const elemImg = new Image(1200,800)
    elemImg.src = img
    return elemImg
}

function rootStyle(){
    const elemRoot = document.getElementById('root')
    elemRoot.classList.add('container')
}

rootStyle()
document.getElementById('root').appendChild(titleComponent());
document.getElementById('root').appendChild(imageComponent());
// document.body.appendChild(titleComponent());
// document.body.appendChild(imageComponent());