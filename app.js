let gameSeq=[];
let userSeq=[];
let btns=["yellow","red","purple","green"];
let started=false;
let level=0;
let h2=document.getElementById("myh2");
let high_score=0;
const h2Element = document.querySelector("h2");
let mediaQuery = window.matchMedia('(max-width: 1030px)');
function startGame() {
    if (!started) {
        started = true;
        levelup();
    }
}

// Keyboard (desktop)
document.addEventListener("keypress", startGame);

// Touch (mobile)
document.addEventListener("touchstart", startGame);

function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}
function levelup(){
    userSeq=[];
    level++;
    h2.innerText=`Level ${level}`;
    let idx=Math.floor(Math.random()*3);
    let randomcolor=btns[idx];
    let randombutton=document.querySelector(`.${randomcolor}`);
    btnFlash(randombutton);
    gameSeq.push(randomcolor);
}
function checkAns(idx){
    if(userSeq[idx]===gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelup,500);
        }
    }
    else{
        if(high_score<level){
            high_score=level;
        }
        h2.innerHTML=`Game Over! Your Score was <b>${level}</b><br>Your High-Score was ${high_score}<br>Press any Key to Start Again`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },150);
        reset();
    }
}
function btnPress(){
    let btn=this;
    btnFlash(btn);
    let usercolor=btn.getAttribute("id");
    userSeq.push(usercolor);
    checkAns(userSeq.length-1);
}
let Allbtn=document.querySelectorAll(".btn");
for(b of Allbtn){
    b.addEventListener("click",btnPress);
}
function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}
function playSound1() {
  const sound = document.getElementById("sound1");
  sound.currentTime = 0;
  sound.play();
}
function playSound2() {
  const sound = document.getElementById("sound2");
  sound.currentTime = 0;
  sound.play();
}
function playSound3() {
  const sound = document.getElementById("sound3");
  sound.currentTime = 0;
  sound.play();
}
function playSound4() {
  const sound = document.getElementById("sound4");
  sound.currentTime = 0;
  sound.play();
}
function handleScreenSizeChange(mediaQueryList) {
    if (mediaQueryList.matches) {
        // Screen width is 1030px or less
        h2Element.innerHTML = 'Press Anywhere to start the Game';
    } else {
        // Screen width is greater than 510px
        h2Element.innerHTML = 'Press any Key to start the Game';
    }
}
// 4. Add a listener to the media query list
// This function will run whenever the screen size crosses the 510px threshold
mediaQuery.addEventListener('change', handleScreenSizeChange);

// 5. Call the handler initially to set the correct text on page load
handleScreenSizeChange(mediaQuery);