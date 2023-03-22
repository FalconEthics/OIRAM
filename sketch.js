//Game project final submission

//fix the bug that the game character can stand on canyons after jump.

//https://www.youtube.com/watch?v=rLl9XBg7wSs
//https://github.com/linuk/Mario.Run
//TODO: complete the game functionality
//TODO: destructure the code
//TODO: add sounds
//TODO: fix the screen size
//TODO: add a score board
//TODO: add auto levels
//TODO: add more enemies
//TODO: add level wise sounds
//TODO: add more collectable items
//TODO: add more platforms
//TODO: add more canyons
//TODO: add background (bioshock infinite)
//TODO: edit HD textures
//TODO: edit character animations
//TODO: add super power collectable items
//TODO: add barriers
//TODO: add weather effects
//TODO: add trophy and a palace at the end of the game
//TODO: add a story
//TODO: add a boss
//TODO: make a start game screen
//TODO: make a game over screen
//TODO: make a game won screen
//TODO: make a game restart button
//TODO: make a game pause button
//TODO: highest score counter
//TODO: add css
//TODO: add a game ui
//TODO: add underground levels
//TODO: add air levels
//TODO: add water levels
//TODO: add desert & forest levels
//TODO: add snow levels
//TODO: add ending
//TODO: add opening trailer
//TODO: add a game screenshot
//TODO: deploy the game

// Global variables
var gameChar_x;
var gameChar_y;
var floorPos_y;
var isLeft;
var isRight;
var isFalling;
var isPlummeting;
var collectable;
var canyon;
var trees_x;
var clouds;
var mountain;
var cameraPosX;
var game_score;
var flagpole;
var lives;
var jumpSound;
var platforms;
var enemies;

function preload() {
    soundFormats('mp3', 'wav');

    //load your sounds here
    jumpSound = loadSound('assets/jump.wav');
    jumpSound.setVolume(0.1);
}


function setup() {
    createCanvas(1024, 576);
    floorPos_y = (height * 3) / 4;
    //lives
    lives = 3;

    //start game
    startGame();

}


function draw() {
    ///////////DRAWING CODE//////////
    console.log(isFalling);

    //to control the camera
    if (isLeft == true && isPlummeting == false) {
        cameraPosX -= 4;
    } else if (isRight == true && isPlummeting == false) {
        cameraPosX += 4;
    }

    background(100, 155, 255); //fill the sky blue

    noStroke();
    fill(0, 155, 0);
    rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground

    //start the camera
    push();
    translate(-cameraPosX, 0);

    //clouds
    drawClouds();

    //mountains
    drawMountains();

    //trees
    drawTrees();

    //canyon
    checkCanyon(canyons);
    drawCanyons(canyons);

    //lives
    checkPlayerDie();

    //game over
    if (lives == 0) {
        gameOver();
        return;
    }

    //game won
    if (flagpole.isReached == true) {
        setTimeout(function () {
            gameWon();
            return;
        }, 500);
    }

    //platforms
    for (var i = 0; i < platforms.length; i++) {
        platforms[i].draw();
    }

    //collectable item
    for (var i = 0; i < collectables.length; i++) {
        if (collectables[i].isFound == false) {
            checkCollectable(collectables[i]);
            drawCollectable(collectables[i]);
        }
    }


    //the game character
    if (isLeft && isFalling) {
        // add your jumping-left code
        //head
        fill(255, 219, 172);
        ellipse(gameChar_x, gameChar_y - 58, 30);
        //body
        fill(255, 0, 0);
        rect(gameChar_x - 10, gameChar_y - 45, 20, 28);
        //right hand
        fill(0);
        rect(gameChar_x - 6, gameChar_y - 55, 8, 16);
        //right leg
        fill(0, 0, 255);
        rect(gameChar_x - 6, gameChar_y - 23, 8, 16);
    } else if (isRight && isFalling) {
        // add your jumping-right code
        //head
        fill(255, 219, 172);
        ellipse(gameChar_x, gameChar_y - 58, 30);
        //body
        fill(255, 0, 0);
        rect(gameChar_x - 10, gameChar_y - 45, 20, 28);
        //left hand
        fill(0);
        rect(gameChar_x - 2, gameChar_y - 55, 8, 16);
        //left leg
        fill(0, 0, 255);
        rect(gameChar_x - 2, gameChar_y - 23, 8, 16);
    } else if (isLeft) {
        // add your walking left code
        //head
        fill(255, 219, 172);
        ellipse(gameChar_x, gameChar_y - 58, 30);
        //body
        fill(255, 0, 0);
        rect(gameChar_x - 10, gameChar_y - 45, 20, 28);
        //right hand
        fill(0);
        rect(gameChar_x - 2, gameChar_y - 45, 8, 16);
        //right leg
        fill(0, 0, 255);
        rect(gameChar_x - 2, gameChar_y - 18, 8, 16);
    } else if (isRight) {
        // add your walking right code
        //head
        fill(255, 219, 172);
        ellipse(gameChar_x, gameChar_y - 58, 30);
        //body
        fill(255, 0, 0);
        rect(gameChar_x - 10, gameChar_y - 45, 20, 28);
        //left hand
        fill(0);
        rect(gameChar_x - 6, gameChar_y - 45, 8, 16);
        //left leg
        fill(0, 0, 255);
        rect(gameChar_x - 6, gameChar_y - 18, 8, 16);
    } else if (isFalling || isPlummeting) {
        // add your jumping facing forwards code
        //head
        fill(255, 219, 172);
        ellipse(gameChar_x, gameChar_y - 58, 30);
        //body
        fill(255, 0, 0);
        rect(gameChar_x - 10, gameChar_y - 45, 20, 28);
        //left hand
        fill(0);
        rect(gameChar_x - 18, gameChar_y - 55, 8, 16);
        //right hand
        fill(0);
        rect(gameChar_x + 10, gameChar_y - 55, 8, 16);
        //right leg
        fill(0, 0, 255);
        rect(gameChar_x + 8, gameChar_y - 23, 8, 16);
        //left leg
        fill(0, 0, 255);
        rect(gameChar_x - 16, gameChar_y - 23, 8, 16);
    } else {
        // add your standing front facing code
        //head
        fill(255, 219, 172);
        ellipse(gameChar_x, gameChar_y - 58, 30);
        //body
        fill(255, 0, 0);
        rect(gameChar_x - 10, gameChar_y - 45, 20, 28);
        //left hand
        fill(0);
        rect(gameChar_x - 18, gameChar_y - 45, 8, 16);
        //right hand
        fill(0);
        rect(gameChar_x + 10, gameChar_y - 45, 8, 16);
        //right leg
        fill(0, 0, 255);
        rect(gameChar_x + 2, gameChar_y - 18, 8, 16);
        //left leg
        fill(0, 0, 255);
        rect(gameChar_x - 10, gameChar_y - 18, 8, 16);
    }

    //draw th flagpole
    renderFlagpole();
    checkFlagpole();

    //drawing enemy
    for (var i = 0; i < enemies.length; i++) {
        enemies[i].draw();
        var isContact = enemies[i].checkContact(gameChar_x, gameChar_y);
        if (isContact) {
            if (lives > 0) {
                lives -= 1;
                startGame();
                break;
            } else {
                isGameOver = true;
                break;
            }
        }
    }
    

    //the camera stops
    pop();
    ///////////INTERACTION CODE//////////
    //Put conditional statements to move the game character below here
    //make the character move left
    if (isLeft == true && isPlummeting == false) {
        gameChar_x -= 4;
    }
    //make the character move right
    if (isRight == true && isPlummeting == false) {
        gameChar_x += 4;
    }
    //make the character jump
    if (gameChar_y < floorPos_y && isPlummeting == false) {
        var isContact = false;
        for (var i = 0; i < platforms.length; i++) {
            if (platforms[i].checkContact(gameChar_x, gameChar_y) == true) {
                isContact = true;
                isFalling = false;
                break;
            }
        }
        if (isContact == false) {
            gameChar_y += 3.5;
            isFalling = true;
        }
    } else {
        isFalling = false;
    }

    //score
    fill(255);
    textSize(20);
    text("Score: " + game_score, 20, 20);

    //draw lives
    drawLives();

}

function keyPressed() {
    // if statements to control the animation of the character when
    // keys are pressed.
    // A to turn left
    if ((keyCode == 65 || key == 'a' || keyCode == 37) && isPlummeting == false) {
        isLeft = true;
        console.log("keyPressed: " + key);
        console.log("keyPressed: " + keyCode);
    }

    // D to turn right
    if ((keyCode == 68 || key == 'd' || keyCode == 39) && isPlummeting == false) {
        isRight = true;
        console.log("keyPressed: " + key);
        console.log("keyPressed: " + keyCode);
    }

    // W to jump
    if ((keyCode == 87 || key == 'w' || keyCode == 38) && isFalling == false && isPlummeting == false) {
        jumpSound.play();
        gameChar_y -= 120;
        console.log("keyPressed: " + key);
        console.log("keyPressed: " + keyCode);
    }
}

function keyReleased() {
    // if statements to control the animation of the character when
    // keys are released.
    // to stop moving left
    if (keyCode == 65) {
        isLeft = false;
        console.log("keyPressed: " + key);
        console.log("keyPressed: " + keyCode);
    }

    // to stop moving right
    if (keyCode == 68) {
        isRight = false;
        console.log("keyPressed: " + key);
        console.log("keyPressed: " + keyCode);
    }
}

function drawMountains() {
    //this function draws the mountains
    for (var i = 0; i < mountain.length; i++) {
        fill(100, 49, 4);
        triangle(
            mountain[i].x_pos + 13,
            mountain[i].y_pos + 33,
            mountain[i].x_pos + 130,
            mountain[i].y_pos - 93.6,
            mountain[i].x_pos + 260,
            mountain[i].y_pos + 32
        );
        fill(255);
        triangle(
            mountain[i].x_pos + 79.3,
            mountain[i].y_pos - 39,
            mountain[i].x_pos + 130,
            mountain[i].y_pos - 93.6,
            mountain[i].x_pos + 187.2,
            mountain[i].y_pos - 40
        );
        //pt2
        fill(120, 49, 4);
        triangle(
            mountain[i].x_pos + 70,
            mountain[i].y_pos + 32,
            mountain[i].x_pos + 200,
            mountain[i].y_pos - 144,
            mountain[i].x_pos + 400,
            mountain[i].y_pos + 32
        );
        fill(255);
        triangle(
            mountain[i].x_pos + 142,
            mountain[i].y_pos - 68,
            mountain[i].x_pos + 200,
            mountain[i].y_pos - 144,
            mountain[i].x_pos + 288,
            mountain[i].y_pos - 68
        );
    }
}

function drawClouds() {
    //this function draws the clouds
    for (var i = 0; i < clouds.length; i++) {
        fill(255);
        ellipse(
            clouds[i].x_pos,
            clouds[i].y_pos,
            clouds[i].size + 150,
            clouds[i].size + 10
        );
        ellipse(
            clouds[i].x_pos + 10,
            clouds[i].y_pos - 4,
            clouds[i].size + 30,
            clouds[i].size + 50
        );
        ellipse(
            clouds[i].x_pos - 30,
            clouds[i].y_pos - 4,
            clouds[i].size + 10,
            clouds[i].size + 30
        );
        ellipse(
            clouds[i].x_pos + 40,
            clouds[i].y_pos - 20,
            clouds[i].size,
            clouds[i].size
        );
    }
}

function drawTrees() {
    //this function draws the trees
    for (var i = 0; i < trees_x.length; i++) {
        fill(0, 100 + [i] * 10, 0);
        triangle(
            trees_x[i] - 48,
            treePos_y - 72,
            trees_x[i] + 28,
            treePos_y - 270,
            trees_x[i] + 112,
            treePos_y - 72
        );
        triangle(
            trees_x[i] - 48,
            treePos_y + 8,
            trees_x[i] + 28,
            treePos_y - 128,
            trees_x[i] + 112,
            treePos_y + 8
        );
        fill(62, 20 + [i] * 10, 4);
        rect(trees_x[i] + 4, treePos_y + 8, 50, 136);
    }
}

function checkCollectable(t_collectable) {
    //this function checks if the character has reached the collectable item
    if (
        dist(
            gameChar_x,
            gameChar_y,
            t_collectable.x_pos,
            t_collectable.y_pos
        ) < 25
    ) {
        t_collectable.isFound = true;
        game_score += 1;
        console.log("collectable item found");
    }
}

function drawCollectable(t_collectable) {
    //this function draws the collectable items
    if (t_collectable.isFound == false) {
        fill(255, 215, 0);
        ellipse(
            t_collectable.x_pos,
            t_collectable.y_pos - 23,
            t_collectable.size - 20,
            t_collectable.size - 20
        );
        noFill();
        stroke(255);
        strokeWeight(2);
        ellipse(
            t_collectable.x_pos,
            t_collectable.y_pos - 23,
            t_collectable.size - 30,
            t_collectable.size - 20
        );
        ellipse(
            t_collectable.x_pos,
            t_collectable.y_pos - 23,
            t_collectable.size - 41,
            t_collectable.size - 20
        );
        strokeWeight(0);
    }
}

function checkCanyon(t_canyon) {
    //this function checks if the character has reached the canyon
    for (let i = 0; i < t_canyon.length; i++) {
        if (
            gameChar_x > t_canyon[i].x_pos &&
            gameChar_x < t_canyon[i].x_pos + t_canyon[i].width - 10 &&
            gameChar_y == floorPos_y
        ) {
            isPlummeting = true;
            console.log("character reached canyon");
        }
    }
}

function drawCanyons(t_canyon) {
    //this function draws the canyon
    for (let i = 0; i < t_canyon.length; i++) {
        if (isPlummeting == true) {
            gameChar_y += 4;
        }
        fill(52, 158, 235);
        rect(t_canyon[i].x_pos, 432, t_canyon[i].width, 150);
        stroke(255);
        strokeWeight(1);
        line(
            t_canyon[i].x_pos + (10 / t_canyon[i].width) * 100,
            474,
            t_canyon[i].x_pos + (10 / t_canyon[i].width) * 100,
            550
        );
        line(
            t_canyon[i].x_pos + (24 / t_canyon[i].width) * 100,
            494,
            t_canyon[i].x_pos + (24 / t_canyon[i].width) * 100,
            570
        );
        stroke(0);
        strokeWeight(0);
    }
}

function renderFlagpole() {
    //this function draws the flagpole
    if (flagpole.isReached == false) {
        stroke(0);
        strokeWeight(5);
        line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 250);
        noStroke();
        fill(255, 0, 0);
        rect(flagpole.x_pos, floorPos_y - 80, 50, 50);
    }
    if (flagpole.isReached == true) {
        stroke(0);
        strokeWeight(5);
        line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 250);
        noStroke();
        fill(0, 255, 0);
        rect(flagpole.x_pos, floorPos_y - 250, 50, 50);
    }
}

function checkFlagpole() {
    //this function checks if the character has reached the flagpole
    var d = abs(gameChar_x - flagpole.x_pos);
    if (d < 15) {
        flagpole.isReached = true;
    }
}

function checkPlayerDie() {
    //this function checks if the character has fallen off the screen
    if (lives == 0) {
        isGameOver = true;
    }
    else if (gameChar_y > height) {
        lives -= 1;
        startGame();
    }
}

function drawLives() {
    //this function draws the lives
    fill(255);
    noStroke();
    textSize(20);
    text("Lives: " + lives, 20, 45);
}

function startGame() {
    //this function resets the game
    //initialise the variables
    gameChar_x = width / 2;
    gameChar_y = floorPos_y;
    isLeft = false;
    isRight = false;
    isFalling = false;
    isPlummeting = false;
    //change the below values to change the collectable items spawn position
    collectables = [
        { x_pos: 10, y_pos: floorPos_y, size: 50, isFound: false },
        { x_pos: 300, y_pos: floorPos_y, size: 50, isFound: false },
        { x_pos: 850, y_pos: floorPos_y, size: 50, isFound: false },
        { x_pos: 1000, y_pos: floorPos_y, size: 50, isFound: false },
    ];
    //change the below values to change the canyon spawn position
    canyons = [
        { x_pos: 220, width: 70 },
        { x_pos: 690, width: 90 },
        { x_pos: 900, width: 50 },
    ];
    //platforms the character can stand on
    platforms = [];
    platforms.push(createPlatforms(10, floorPos_y - 100, 200));
    //change the below values to change the tree spawn position
    trees_x = [60, 260, 500, 630, 700, 900, 1000];
    treePos_y = floorPos_y - 144;
    //change the below values to change the mountain spawn position
    mountain = [
        { x_pos: -80, y_pos: 400 },
        { x_pos: 200, y_pos: 400 },
        { x_pos: 600, y_pos: 400 },
        { x_pos: 1000, y_pos: 400 },
    ];
    //change the below values to change the cloud spawn position
    clouds = [
        { x_pos: 150, y_pos: 150, size: 50 },
        { x_pos: 400, y_pos: 100, size: 50 },
        { x_pos: 600, y_pos: 200, size: 50 },
        { x_pos: 890, y_pos: 150, size: 50 },
    ];
    cameraPosX = 0;
    //score counter
    game_score = 0;
    //flagpole
    flagpole = { isReached: false, x_pos: 1000 };
    //enemies
    enemies = [];
    enemies.push(new Enemy(0, floorPos_y -5, 100));

}

function gameWon() {
    //this function checks if the character has won the game
    fill(0);
    textSize(30);
    text("You Won!", width / 2, height / 2);
    noLoop();
}

function gameOver() {
    //this function checks if the character has lost the game
    fill(0);
    textSize(30);
    text("Game Over", width / 2, height / 2);
    noLoop();
}

function createPlatforms(x, y, length) {
    var p = {
        x: x,
        y: y,
        length: length,
        draw: function () {
            fill(255, 0, 0);
            rect(this.x, this.y, this.length, 20);
        },
        checkContact: function (gc_x, gc_y) {
            if (gc_x > this.x && gc_x < this.x + this.length) {
                var d = this.y - gc_y;
                if (d >= 0 && d < 5) {
                    return true;
                }
            }
            return false;

        }
    }
    return p;
}

function Enemy(x, y, range) {
    this.x = x;
    this.y = y;
    this.range = range;

    this.currentX = x;
    this.inc = 1;

    this.update = function () {
        this.currentX += this.inc;

        if (this.currentX >= this.x + this.range) {
            this.inc = -1;
        }
        else if (this.currentX <= this.x) {
            this.inc = 1;
        }
    }
    this.draw = function () {
        this.update();
        fill(255, 0, 0);
        rect(this.currentX, this.y, 20, 20);
    }
    this.checkContact = function (gc_x, gc_y) {
        var d = dist(gc_x, gc_y, this.currentX, this.y);

        if (d < 20) {
            return true;
        }
        return false;
    }
}
//submission by Soumik Das - 220383444