'use strict' 

let  main = document.querySelector('.game-block'),
gameWrapper = document.querySelector('.game-wrap'),
startBtn = document.querySelector('.startBtn'),
endBtn = document.querySelector('.end-btn'),
btnAnswers = document.querySelector('.answer'),
blockQuestion = document.querySelector('.question'),
helpBtns= document.querySelector('.hints-help'),
winBlock = document.querySelector('.wins-block'),
helpFifty = document.querySelector('.fifty-fifty'),
helpHall = document.querySelector('.hall-help'),
helpFriend = document.querySelector('.call-friend'),
helpAI = document.querySelector('.ai-help'),
game = document.querySelector('.game')
// <=============>

let changeQuestion = document.getElementById('hintBox')
let extraQuestion = document.getElementById('extra')
let flagExtra = true



let endB = document.getElementById('end')


const popup = document.getElementById('rulesPopup')
const showBtn = document.getElementById('showRules')

let aiExplainBlock = document.getElementById('aiExplayinBlock')
let aiExplainText = document.getElementById('aiExplainText')
let aiExplainClose = document.getElementById('aiExplainClose')

const OPEN_AI_KEY = ''
const OPENAI_MODEL = ''
 

showBtn.addEventListener('click', () =>{
       popup.classList.add("show");


})

popup.addEventListener("click", () =>{
    popup.classList.remove("show");
})

const  generalMusic = new Audio('./music/end-sound.mp3')
const questionSong = new Audio('./music/questions-sound.mp3')
let count = 0

let fixed1 = new Audio('./music/8,000-question.mp3')

let incorrectSoundFlag = false
generalMusic.loop = true

window.addEventListener('click', () => {
    generalMusic.play()

},{ once : true})

endBtn.addEventListener('click', () => {
    setTimeout(()=>{
        game.style.backgroundImage = ""
    },2000)
    questionSong.pause()
    mainGame.classList.remove('animate__backInUp')
    mainGame.classList.remove('animate__flipInX')
    mainGame.classList.add('animate__animated' , 'animate__backOutDown')

    setTimeout(()=>{
        mainGame.style.display = 'none'
        startBtn.style.display = 'block'
        startBtn.classList.remove('animate__backOutUp')
        startBtn.classList.add('animate__backInDown')

    },1000);

    setTimeout(()=>{
       startBtn.classList.remove('animate__backInDown')

    },2000);

    let userWin = document.querySelector('.user-win')


    //////// aystex der kveradarnanq
})


startBtn.addEventListener('click', ()=>{
    generalMusic.pause()
    generalMusic.currentTime = 0
    game.style.backgroundImage = "url('./img/galaxy.jpg')"
    game.style.backgroundSize = "100vh"

    startBtn.classList.add('animate__animated', 'animatebackOutUp')
    startBtn.classList.remove('animate__backItDown')

    showBtn.remove()
})
//test