const birdElem = document.querySelector('[data-bird]');
const BIRD_SPEED = 0.5;
//our jump will last 125ms
const JUMP_DURATION = 125;
let timeSinceLastJump = Number.POSITIVE_INFINITY;

//start bird in right position
export function setupBird(){
    //set bird in the middle of the screen
    setTop(window.innerHeight / 2);
    //remove here bc once the game starts, event listeners will compound otherwise
    document.removeEventListener('keydown', handleJump);
    document.addEventListener('keydown', handleJump);

}

export function updateBird(delta){
    //we want our bird to go up when its been longer than a jump duration
    if(timeSinceLastJump < JUMP_DURATION){
        //this is when the bird is moving up
        setTop(getTop() - BIRD_SPEED * delta);

    } else {
        //this is when the bird is moving down (default)
        setTop(getTop() + BIRD_SPEED * delta);
    }
    //multiply BIRD_SPEED by delta to keep it consistent if fps drops
    timeSinceLastJump += delta;
}

export function getBirdRect(){
    //returns position of the bird on the screen (top, left, bottom, right)
    return birdElem.getBoundingClientRect();
}

//helper functions

function setTop(top){
    birdElem.style.setProperty('--bird-top', top);
}

function getTop(){
    //the css value is a COMPUTED value, so therefore need getComputedStyle
    return parseFloat(getComputedStyle(birdElem).getPropertyValue('--bird-top'));
}

function handleJump(event){
    if(event.code !== 'Space') return;
    timeSinceLastJump = 0;
}