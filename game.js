// Iteration 1: Declare variables required for this game
const game = document.getElementById('game-body')
var seconds = 60;
const timerBox = document.getElementById('timer-box')
let zombie = [
    "zombie-1.png",
    "zombie-2.png",
    "zombie-3.png",
    "zombie-4.png",
    "zombie-5.png",
    "zombie-6.png",
]
var zombieId = 0;
// Iteration 1.2: Add shotgun sound
game.addEventListener('click', function (){
    const shotgun = new Audio("./assets/shotgun.wav");
    shotgun.play()
    shotgun.currentTime = 0;
})
// Iteration 1.3: Add background sound
const bgm = new Audio("./assets/bgm.mp3");
bgm.play()
bgm.loop = true
// Iteration 1.4: Add lives
const maxLives = 4;
var lives = 4
// Iteration 2: Write a function to make a zombie
function zombieMaker(){
    const randomZombie = zombie[getRandomInt(0,zombie.length)]
    game.innerHTML += `<img src="./assets/${randomZombie}" alt="" class="zombie-image" id="zombie${zombieId}">`
    let zoombie = document.getElementById('zombie' + zombieId)
    zoombie.style.transform = `translateX(${getRandomInt(20,80)}vw)`;
    zoombie.style.animationDuration = `${getRandomInt(2,6)}s`;
    zoombie.onclick = () => {
        zombieDestroy(zoombie);
    }
}
// Iteration 3: Write a function to check if the player missed a zombie
function check(zoombie){
    if(zoombie.getBoundingClientRect().top <= 0){
        lives--;
        return true   
    }
    else{
        return false
    }
}
// Iteration 4: Write a function to destroy a zombie when it is shot or missed
function zombieDestroy(zoombie){
    zoombie.style.display = "none"
    zombieId++;
    zombieMaker()
}
// Iteration 5: Creating timer
var timer  = setInterval(function(){
    seconds--;
    document.getElementById('timer').textContent = seconds;
    let zoombie = document.getElementById("zombie"+ zombieId)
    if(check(zoombie) == true){
        zombieDestroy(zoombie)
        if (lives == 0){
            clearInterval(timer)
            location.href = 'game-over.html'
        }
        if(seconds == 0){
            clearInterval(timer)
            location.href = 'win.html'
        }
    }
},1000)
// Iteration 6: Write a code to start the game by calling the first zombie
zombieMaker();
// Iteration 7: Write the helper function to get random integer
function getRandomInt(min,max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random()*(max-min))+min;
}