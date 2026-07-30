'use strict'

let main = document.querySelector('.game-block'),
    gameWrapper = document.querySelector('.game-wrap'),
    startBtn = document.querySelector('.start-btn'),
    endBtn = document.querySelector('.end-btn'),
    btnAnswers = document.querySelector('.answer'),
    blockQuestion = document.querySelector('.question'),
    helpBtns = document.querySelector('.hints-help'),
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


showBtn.addEventListener('click', () => {
    popup.classList.add("show");


})

popup.addEventListener("click", () => {
    popup.classList.remove("show");
})

const generalMusic = new Audio('./music/end-sound.mp3')
const questionSong = new Audio('./music/questions-sound.mp3')
let count = 0

let fixed1 = new Audio('./music/8,000-question.mp3')

let incorrectSoundFlag = false
generalMusic.loop = true

window.addEventListener('click', () => {
    generalMusic.play()

}, { once: true })

endBtn.addEventListener('click', () => {
    setTimeout(() => {
        game.style.backgroundImage = ""
    }, 2000)
    questionSong.pause()
    mainGame.classList.remove('animate__backInUp')
    mainGame.classList.remove('animate__flipInX')
    mainGame.classList.add('animate__animated', 'animate__backOutDown')

    setTimeout(() => {
        mainGame.style.display = 'none'
        startBtn.style.display = 'block'
        startBtn.classList.remove('animate__backOutUp')
        startBtn.classList.add('animate__backInDown')

    }, 1000);

    setTimeout(() => {
        startBtn.classList.remove('animate__backInDown')

    }, 2000);

    let userWin = document.querySelector('.user-win')


    //////// aystex der kveradarnanq
})


startBtn.addEventListener('click', () => {
    generalMusic.pause()
    generalMusic.currentTime = 0
    game.style.backgroundImage = "url('./img/galaxy.jpg')"
    game.style.backgroundSize = "100vh"

    startBtn.classList.add('animate__animated', 'animatebackOutUp')
    startBtn.classList.remove('animate__backItDown')

    showBtn.remove()
})
//test



btnAnswers.forEach((btnAnswer) => {

    btnAnswer.addEventListener('click', (e) => {
        let numberQuestion = btnAnswers.parentElement.parentElement.classList[1];
        let userAnswer = e.target.innerText
        let blockAnswer = e.target
        let blockQuestionParentElement = blockAnswer.parentElement

        blockQuestionParentElement.classList.add('block-event')
        correctnessAnswer(numberQuestion, userAnswer, blockAnswer, blockQuestionParentElement)
    })


})


btnAnswers.forEach((item)=>{
    item.addEventListener('mouseover',()=>{
        if(item.children[0]){
            item.children[0].style.display = "none"
            item.classList.remove('color-active')
        }
    });
});

let helpSound = new Audio('./music/50-50 .mp3')


helpFifty.addEventListener('click',function removeTwoBlocks(){
    helpSound.play()
    let blockActiveQuestion = getActivBlockQuestion()
    let numRandom = MathFloor(Math.random() * blockActiveQuestion.children[1].children.length)
    let blockChildrenAnswer = blockActiveQuestion.children[1].children
    let nameQuestion = blockActiveQuestion.classList[1]

    let blockCorrectAnswer = getBlockAnswer(blockChildrenAnswer)
    blockCorrectAnswer.classList.add('fifty-active')
    let blockRandom = getBlockRandom(blockChildrenAnswer,blockCorrectAnswer,numRandom)

    removeTwoBlocks(blockChildrenAnswer)

    helpFifty.classList.add('hints-help-spent','block-event')
})



helpFriend.addEventListener('click', function getHelpFrien() {
    // այս ֆունկցիայի միջոցով գտնում և պահպանում ենք այն հարցի բլոկը , որը այդ պահին տեսնում է օգտատերը
    let blockActiveQuestion = getActiveBlockQuestion();
    // blockActiveQuestionChild - պահում է պատասխաններով օբյեկտը
    let blockActiveQuestionChild = blockActiveQuestion.children[1];
    checkBlockChild(blockActiveQuestionChild);
    // Ֆունկցիան վերադարձնում է 0-3 պատահական թիվ և ստուգում բլոների քանակը
    let numRandom = getActiveBlockLength(blockActiveQuestionChild);
    // Վերադարձնում է պատահական թիվ մինիմումից 100
    let percentageRandom = getRandom(100, 100);
    // ավելացնում է գրաֆիկական փոփոխություններ պատահականորեն ընտրված բլոկի մեջ:
    blockActiveQuestionChild.children[numRandom].insertAdjacentHTML('afterbegin', '<div class="answer-active"></div>');
    setTimeout(() => {
      blockActiveQuestionChild.children[numRandom].children[0].style.width = percentageRandom + '%';
      blockActiveQuestionChild.children[numRandom].classList.add('color-active');
    }, 3000);
    // Երաժշտություն՝ սկսելով 13-րդ վայրկյանից և տևելով 5 վայրկյան
    const friendCallSound = new Audio('./music/phone-sound.mp3');
    friendCallSound.currentTime = 13; // Սկսում է 13-րդ վայրկյանից
    friendCallSound.play();
    // 5 վայրկյան անց կանգնեցնում ենք
    setTimeout(() => {
      friendCallSound.pause();
      friendCallSound.currentTime = 0;
    }, 5000);
    // Բլոկի վրա արգելք ենք դնում և անջատում ենք իրադարձություն լսողը
    helpFriend.classList.add('hints-help_spent', 'block-event');
  });


  helpAI.addEventListener('click',async function getHelpAI(){
    let blockActiveQuestion = getActivBlockQuestion()
    let blockActiveQuestionChild = blockActiveQuestion.children[1]
    checkBlockChild(blockActiveQuestionChild)

    let questionText = blockActiveQuestion.children[0].innerText.trim();
    let answerOptions = []

    for(let i = 0 ;i <blockActiveQuestionChild.length;i++){
        answerOptions.push(blockActiveQuestion.children[1].innerText.trim());
    }
    helpAI.classList.add('hints-help_spent','block-event')

    try{
        const aiResult = await askAi(questionText,answerOptions)
        letaiIndex = answerOptions.findIndex(opt => opt.startsWith(aiResult.answer))
        if(aiIndex == -1){
            aiIndex = answerOptions.findIndex(opt => opt.startsWith(aiResult.answer.chartAt(0)));
        }
    }
  })


  



  for (let i = 0; i < blockActiveQuestionChild.children.length; i++) {
    let percentage = (i === aiIndex) ? getRandom(85, 99) : getRandom(1, 30);
    blockActiveQuestionChild.children[i].insertAdjacentHTML('afterbegin', '<div class="answer-active"></div>');
    setTimeout(() => {
      blockActiveQuestionChild.children[i].children[0].style.width = percentage + '%';
      blockActiveQuestionChild.children[i].classList.add('color-active');
    }, 300);
  }

  aiExplainText.innerText = aiResult.explanation;
  aiExplainBlock.classList.add('show');
} catch (err) {
  console.error('ԱԻ օգնության սխալ․', err);
  aiExplainText.innerText = 'ԱԻ-ից պատասխան ստանալ չհաջողվեց։';
  aiExplainBlock.classList.add('show');
}

helpAI.addEventListener('click', async function getHelpAI() {
    // Կանչում ենք ֆունկցիա, որը վերադարձնում է տվյալ պահին ակտիվ հարցի բլոկը
    let blockActiveQuestion = getActiveBlockQuestion();
    // blockActiveQuestionChild - պահպանում ենք պատասխաններով օբյեկտը
    let blockActiveQuestionChild = blockActiveQuestion.children[1];
    checkBlockChild(blockActiveQuestionChild);
  
    let questionText = blockActiveQuestion.children[0].innerText.trim();
    let answerOptions = [];
    for (let i = 0; i < blockActiveQuestionChild.children.length; i++) {
      answerOptions.push(blockActiveQuestionChild.children[i].innerText.trim());
    }
  
    // Անմիջապես անջատում ենք կոճակը, որպեսզի սպասման ընթացքում կրկին չսեղմեն
    helpAI.classList.add('hints-help_spent', 'block-event');
  
    try {
      const aiResult = await askAI(questionText, answerOptions);
      let aiIndex = answerOptions.findIndex(opt => opt === aiResult.answer);
      if (aiIndex === -1) {
        aiIndex = answerOptions.findIndex(opt => opt.startsWith(aiResult.answer.charAt(0)));
      }
  
      for (let i = 0; i < blockActiveQuestionChild.children.length; i++) {
        let percentage = (i === aiIndex) ? getRandom(85, 99) : getRandom(1, 30);
        blockActiveQuestionChild.children[i].insertAdjacentHTML('afterbegin', '<div class="answer-active"></div>');
        setTimeout(() => {
          blockActiveQuestionChild.children[i].children[0].style.width = percentage + '%';
          blockActiveQuestionChild.children[i].classList.add('color-active');
        }, 300);
      }
  
      aiExplainText.innerText = aiResult.explanation;
      aiExplainBlock.classList.add('show');
    } catch (err) {
      console.error('ԱԻ օգնության սխալ․', err);
      aiExplainText.innerText = 'ԱԻ-ից պատասխան ստանալ չհաջողվեց։';
      aiExplainBlock.classList.add('show');
    }
  });
  
  aiExplainClose.addEventListener('click', () => {
    aiExplainBlock.classList.remove('show');
  });
