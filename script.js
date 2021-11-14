import {updateBird, setupBird, getBirdRect} from './bird.js';
import {updatePipes, setupPipes, getPipesPastCount, getPipeRects} from './pipe.js';


//allows for user to start game by pressing a key; set to once to prevent restarts
document.addEventListener('keypress', handleStart, {once: true});
const title = document.querySelector('[data-title]');
const subtitle = document.querySelector('[data-subtitle]');

let lastTime;

//time - time since the page started running
function updateLoop(time){
    //skip very first loop
    if(lastTime == null){
        lastTime = time;
        window.requestAnimationFrame(updateLoop);
        return;
    }
    //time between animation frames - important to determine bird position
    const delta = time - lastTime;
    updateBird(delta);
    updatePipes(delta);
    if(checkLose()) return handleLose();
    lastTime = time;
    window.requestAnimationFrame(updateLoop);
}

function checkLose(){
    const birdRect = getBirdRect();
    const insidePipe = getPipeRects().some((pipeRect) => isCollision(birdRect, pipeRect));
    //top of webpage = 0, anything less is 'above'
    //bottom of webpage is innerHeight, anything greater is 'below'
    const isOutsideWorld = birdRect.top < 0 || birdRect.bottom > window.innerHeight;
    return isOutsideWorld || insidePipe;
}

function isCollision(bird, pipe){
    return (
        //intersections
        bird.left < pipe.right &&
        bird.top < pipe.bottom &&
        bird.right > pipe.left &&
        bird.bottom > pipe.top
    )
}

function handleStart(){
    //upon start, class of 'hide' is added to hide the 'Press any key...' prompt
    title.classList.add('hide');
    setupBird();
    setupPipes();
    //set lastTime to null to ensure it does not carry over upon restart
    lastTime = null;
    //game loop - runs infinitely and quickly
    window.requestAnimationFrame(updateLoop)
}

function handleLose(){
    setTimeout(() => {
        title.classList.remove('hide');
        subtitle.classList.remove('hide');
        if(getPipesPastCount() < 2) subtitle.textContent = `You can do better than that...`;
        else subtitle.textContent = `You passed ${getPipesPastCount()} pipes!`;
        document.addEventListener('keypress', handleStart, {once: true});
    }, 100)
}