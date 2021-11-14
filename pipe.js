const HOLE_HEIGHT = 250;
const PIPE_INTERVAL = 1500;
const PIPE_SPEED = 0.70;
const PIPE_WIDTH = 120;
//array of all of the pipes that will be rendered on the screen
let pipes = [];
let timeSinceLastPipe = 0;
let passedPipeCount = 0;

export function setupPipes(){
    document.documentElement.style.setProperty('--pipe-width', PIPE_WIDTH);
    document.documentElement.style.setProperty('--hole-height', HOLE_HEIGHT);
    pipes.forEach((pipe) => pipe.remove());
    timeSinceLastPipe = PIPE_INTERVAL;
    passedPipeCount = 0;
}

export function updatePipes(delta){
    timeSinceLastPipe += delta

    //create a pipe every 1.5 seconds
    if(timeSinceLastPipe > PIPE_INTERVAL){
        timeSinceLastPipe -= PIPE_INTERVAL
        createPipe();
    }
    pipes.forEach((pipe) => {
        if(pipe.left + PIPE_WIDTH < 0){
            passedPipeCount++;
            return pipe.remove();
        }
        pipe.left = pipe.left - delta * PIPE_SPEED;
    })
}

export function getPipesPastCount(){
    return passedPipeCount
}

export function getPipeRects(){
    //flat map - take the array of arrays and convert into 1d array
    return pipes.flatMap((pipe) => pipe.rects());
}

function createPipe(){
    const pipeElem = document.createElement('div');
    const topElem = createPipeSegment('top');
    const bottomElem = createPipeSegment('bottom');
    pipeElem.append(topElem);
    pipeElem.append(bottomElem);
    pipeElem.classList.add('pipe');
    //ensures top and bottom pipes show
    pipeElem.style.setProperty('--hole-top', randomNumberBetween(HOLE_HEIGHT * 1.5, window.innerHeight - HOLE_HEIGHT * 0.5))
    //helper functions for pipe position
    const pipe = {
        get left(){
            return parseFloat(getComputedStyle(pipeElem).getPropertyValue('--pipe-left'))
        },
        set left(value){
            pipeElem.style.setProperty('--pipe-left', value)
        },
        //save memory
        remove(){
            //remove from array
            pipes = pipes.filter((p) => p !== pipe);
            //remove from screen
            pipeElem.remove();
        },
        rects(){
            return [
                topElem.getBoundingClientRect(),
                bottomElem.getBoundingClientRect()
            ]
        }
    }
    pipe.left = window.innerWidth;
    document.body.append(pipeElem);
    pipes.push(pipe)
}

function createPipeSegment(position){
    const segment = document.createElement('div');
    segment.classList.add('segment', position);
    return segment;
}

function randomNumberBetween(min, max){
    //max-min+1 gives value in the range of the hole
    //+1 offsets the .floor (gives round number, not decimal)
    return Math.floor(Math.random() * (max - min + 1) + min);
}