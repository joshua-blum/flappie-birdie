# Flappie Birdie - A Vanilla JavaScript Take on a Classic
Have you ever wanted to play a quick game of a certain popular app, but emulated using vanilla JavaScript and HTML/CSS? You've come to the right place!

![Demonstration](/images/flappie-birdie-explanation)

## Overview 
The game operates exactly like its inspiration, with the user pressing the space bar to keep Flappie Birdie from falling to the ground. There are pipes that may get in the way with which the user is to try and ensure that Flappie does not collide.

## Functionality
`handleStart()` is configured with an event listener to start upon user input, which then triggers the starting message to inherit a class that hides it from view, and triggers `setupBird()` and `setupPipes()`, which configure the default values of the `<div>` elements which constitute the on-screen bird and pipes.

A game loop is initialized upon start of a session, which updates the bird and pipe positions as time progresses, as well as in response to user input. Repeatedly, a boolean value `checkLose()` is evaluated in the event of the bird colliding with the pipes (`insidePipe`) or when the bird touches the top or bottom of the screen (`isOutsideWorld`). When the lose state is triggered, `handleLose()` is activated, which displayes the count of pipes passed by the user, as well as configures the game to be restarted by the user. This is performed in a `setTimeout()` to ensure the user does not accidentally trigger an undesired reset due to the nature of the game input and game activation being triggered by the same action (i.e. pressing 'Space' on the keyboard).
