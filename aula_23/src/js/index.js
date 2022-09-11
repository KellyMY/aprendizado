import './../scss/index.scss'
import img from './../image/imagem.png'

function imageComponent(){
    const elemImg = document.getElementById('imagemLogo')
    elemImg.src = img
    return elemImg
}

imageComponent()