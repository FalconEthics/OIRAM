//Game project final submission

//https://www.youtube.com/watch?v=rLl9XBg7wSs
//https://github.com/linuk/Mario.Run

//https://ian-albert.com/games/super_mario_bros_maps/mario-1-1.gif
// https://ian-albert.com/games/super_mario_bros_maps/mario-1-2.gif
// https://ian-albert.com/games/super_mario_bros_maps/mario-1-3.gif
// https://ian-albert.com/games/super_mario_bros_maps/mario-1-4.gif
// https://ian-albert.com/games/super_mario_bros_maps/mario-2-2.gif
// https://ian-albert.com/games/super_mario_bros_maps/mario-4-4.gif

//TODO: add sounds
//fix the screen size
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
//add css
//add a game ui
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

var jumpHeight;
var jumpSpeed;

var collectable;
var superCollectable;

var canyon;
var trees_x;
var clouds;
var mountain;

var cameraPosX;

var flagpole;
var lives;
var platforms;
var enemies;
var game_score;
let superJump;

var jumpSound;
var collectSound;
var deathSound;
var winSound;
var superJumpSound;
var enemySound;
var powerupSound;
var stageClearSound;
var gameOverSound;
var backgroundSound;


//loading assets
function preload() {

    //load your images here
    //sky
    sky = loadImage('assets/sky.jpg');
    //floor
    soil = loadImage('assets/floorGrass.png');
    //clouds
    cloud1 = loadImage('assets/cloud1.png');
    cloud2 = loadImage('assets/cloud2.png');
    cloud3 = loadImage('assets/cloud3.png');
    cloud4 = loadImage('assets/cloud4.png');
    //mountains
    mountains = loadImage('assets/hills1.png');

    //trees
    tree1 = loadImage('assets/tree1.png');
    tree3 = loadImage('assets/tree3.png');
    tree4 = loadImage('assets/tree4.png');

    //canyons
    canyon1 = loadImage('assets/canyon1.png');
    canyon2 = loadImage('assets/canyon2.png');

    soundFormats('mp3', 'wav');

    //load your sounds here
    jumpSound = loadSound('assets/jump.wav');
    jumpSound.setVolume(1.0);

    collectSound = loadSound('assets/collect.wav');
    collectSound.setVolume(1.0);

    deathSound = loadSound('assets/death.wav');
    deathSound.setVolume(1.0);

    superJumpSound = loadSound('assets/superJump.wav');
    superJumpSound.setVolume(1.0);

    enemySound = loadSound('assets/enemy.wav');
    enemySound.setVolume(1.0);

    powerupSound = loadSound('assets/powerup.wav');
    powerupSound.setVolume(1.0);

    stageClearSound = loadSound('assets/stageClear.wav');
    stageClearSound.setVolume(1.0);

    gameOverSound = loadSound('assets/gameOver.wav');
    gameOverSound.setVolume(1.0);

    backgroundSound = loadSound('assets/bgm.mp3');
    backgroundSound.setVolume(0.5);

    flagpoleSound = loadSound('assets/flagpole.wav');
    flagpoleSound.setVolume(1.0);


    firecrackerSound = loadSound('assets/firecracker.wav');
    firecrackerSound.setVolume(0.5);

    winSound = loadSound('assets/win.wav');
    winSound.setVolume(1.0);

}


//setup code
function setup() {
    createCanvas(1024, 576);
    floorPos_y = (height * 3) / 4;
    //lives
    lives = 3;

    //this function resets the game
    //start game
    startGame();

}

function startGame() {

    //playBgm
    playBgm();

    //initialise the variables
    gameChar_x = (width / 2) - 300;
    gameChar_y = floorPos_y;
    isLeft = false;
    isRight = false;
    isFalling = false;
    isPlummeting = false;
    jumpSpeed = 3.5;
    jumpHeight = 120;

    //change the below values to change the collectable items spawn position
    collectables = [
        { x_pos: 420, y_pos: floorPos_y, size: 50, isFound: false },
        { x_pos: 660, y_pos: floorPos_y - 100, size: 50, isFound: false },

    ];

    //change the below values to change the canyon spawn position
    superCollectables = [
        { x_pos: 820, y_pos: floorPos_y, size: 50, isFound: false },

    ];

    //change the below values to change the canyon spawn position
    canyons = [
        { x_pos: 320, width: 70, type: 1 },
        { x_pos: 900, width: 70, type: 2 }

    ];

    //platforms the character can stand on
    platforms = [];
    platforms.push(createPlatforms(500, floorPos_y - 100, 200));

    //change the below values to change the tree spawn position
    trees_x = [60, 260, 500, 630, 800, 940, 1020, 1190, 1350, 1410];
    trees_x2 = [1510, 1660, 1710, 1890, 1980, 2020, 2300]
    treePos_y = floorPos_y - 144;


    //change the below values to change the cloud spawn position
    clouds = [
        { x_pos: 80, y_pos: 80 },
        { x_pos: 300, y_pos: 180 },
        { x_pos: 500, y_pos: 90 },
        { x_pos: 760, y_pos: 150 },
    ];

    cameraPosX = 0;

    //score counter
    game_score = 0;

    //super Score counter
    superJump = "Inactive";

    //flagpole
    flagpole = { isReached: false, x_pos: 1000 };

    //enemies
    enemies = [];
    enemies.push(new Enemy(0, floorPos_y - 5, 100));

}

//this function plays the background music
function playBgm() {
    backgroundSound.play();
    backgroundSound.loop();
}

//draw frames
function draw() {
    ///////////DRAWING CODE//////////

    //to control the camera
    if (isLeft == true && isPlummeting == false) {
        cameraPosX -= 4;
    } else if (isRight == true && isPlummeting == false) {
        cameraPosX += 4;
    }

    //fill the sky blue
    background(sky);

    //start the camera
    push();
    translate(-cameraPosX, 0);

    //clouds
    drawClouds();

    //mountains
    drawMountains();

    //trees
    drawTrees();

    //draw some green ground
    image(soil, 0, 0, width, height)
    image(soil, width, 0, width, height)
    image(soil, width * 2, 0, width, height)
    image(soil, width * 3, 0, width, height)

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

    //super collectable item
    for (var i = 0; i < superCollectables.length; i++) {
        if (superCollectables[i].isFound == false) {
            checkSuperCollectable(superCollectables[i]);
            drawSuperCollectable(superCollectables[i]);
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
                backgroundSound.stop();
                enemySound.play();
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
    // if (gameChar_y < floorPos_y && isPlummeting == false) {
    //     var isContact = false;
    //     for (var i = 0; i < platforms.length; i++) {
    //         if (platforms[i].checkContact(gameChar_x, gameChar_y) == true) {
    //             isContact = true;
    //             isFalling = false;
    //             break;
    //         }
    //     }
    //     if (isContact == false) {
    //         gameChar_y += jumpSpeed;
    //         isFalling = true;
    //     }
    // } else {
    //     isFalling = false;
    // }

    //score
    fill(255);
    textSize(20);
    text("Score: " + game_score, 20, 20);

    //superJump
    fill(255);
    textSize(20);
    text("Super Jump: " + superJump, 20, 70);

    //draw lives
    drawLives();

}

function keyPressed() {

    // if statements to control the animation of the character when
    // keys are pressed.

    // A to turn left
    if ((keyCode == 65 || key == 'a' || keyCode == 37) && isPlummeting == false) {
        isLeft = true;
        console.log("character is moving left");
    }

    // D to turn right
    if ((keyCode == 68 || key == 'd' || keyCode == 39) && isPlummeting == false) {
        isRight = true;
        console.log("character is moving right");
    }

    // W to jump
    if ((keyCode == 87 || key == 'w' || keyCode == 38) && isFalling == false && isPlummeting == false) {
        if (superJump == "Inactive") {
            jumpSound.play();
        }
        else if (superJump == "Active") {
            superJumpSound.play();
        }
        gameChar_y -= jumpHeight;
        console.log("character is jumping");
    }

    //for developer to test the game
    if (keyCode == 33) {
        gameChar_y = 10;
    }
}

function keyReleased() {

    // if statements to control the animation of the character when

    // keys are released.
    // to stop moving left
    if (keyCode == 65 || key == 'a' || keyCode == 37) {
        isLeft = false;
    }

    // to stop moving right
    if (keyCode == 68 || key == 'd' || keyCode == 39) {
        isRight = false;
    }
}

function drawMountains() {

    //this function draws the mountains
    image(mountains, 0, 0);
    image(mountains, width, 0);
    image(mountains, width * 2, 0);
    image(mountains, width * 3, 0);
    image(mountains, width * 4, 0);
    image(mountains, width * 5, 0);
    image(mountains, width * 6, 0);
    image(mountains, width * 7, 0);
}

function drawClouds() {

    //this function draws the clouds
    for (var i = 0; i < clouds.length; i++) {

        image(cloud1, clouds[i].x_pos, clouds[i].y_pos);
        image(cloud2, clouds[i].x_pos + 10, clouds[i].y_pos - 4);
        image(cloud3, clouds[i].x_pos - 30, clouds[i].y_pos - 4);
        image(cloud4, clouds[i].x_pos + 40, clouds[i].y_pos - 20);
    }
}

function drawTrees() {

    //this function draws the trees
    for (var i = 0; i < trees_x.length; i++) {
        image(tree3, trees_x[i], treePos_y - 100);
        image(tree4, trees_x[i] - 200, treePos_y - 100);
    }

    for (var i = 0; i < trees_x2.length; i++) {

        image(tree1, trees_x2[i], treePos_y - 25);
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
        collectSound.play();
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

function checkSuperCollectable(t_superCollectable) {
    //this function checks if the character has reached the super collectable item
    if (
        dist(
            gameChar_x,
            gameChar_y,
            t_superCollectable.x_pos,
            t_superCollectable.y_pos
        ) < 25
    ) {
        t_superCollectable.isFound = true;
        jumpHeight = 175;
        jumpSpeed = 2.9;
        superJump = "Active";
        powerupSound.play();
        setTimeout(function () {
            jumpHeight = 120;
            jumpSpeed = 3.5;
            superJump = "Inactive";
        }, 4500);
        console.log("superCollectable item found");
    }
}

function drawSuperCollectable(t_superCollectable) {
    //this function draws the super collectable items
    if (t_superCollectable.isFound == false) {
        fill(255, 010, 0);
        ellipse(
            t_superCollectable.x_pos,
            t_superCollectable.y_pos - 23,
            t_superCollectable.size - 20,
            t_superCollectable.size - 20
        );
        noFill();
        stroke(0);
        strokeWeight(2);
        ellipse(
            t_superCollectable.x_pos,
            t_superCollectable.y_pos - 23,
            t_superCollectable.size - 30,
            t_superCollectable.size - 20
        );
        ellipse(
            t_superCollectable.x_pos,
            t_superCollectable.y_pos - 23,
            t_superCollectable.size - 41,
            t_superCollectable.size - 20
        );
        strokeWeight(0);
    }
}


function checkCanyon(t_canyon) {
    //this function checks if the character has reached the canyon
    for (let i = 0; i < t_canyon.length; i++) {
        if (
            gameChar_x > t_canyon[i].x_pos + 8 &&
            gameChar_x < t_canyon[i].x_pos + t_canyon[i].width - 8 &&
            (floorPos_y - gameChar_y) < 5
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
        if (t_canyon[i].type == 1) {
            image(canyon2, t_canyon[i].x_pos, 422, t_canyon[i].width, 156)
        }
        else if (t_canyon[i].type == 2) {
            image(canyon1, t_canyon[i].x_pos, 422, t_canyon[i].width, 156)
        }
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
    // var d = abs(gameChar_x - flagpole.x_pos);
    // if (d < 15) {
    //     flagpole.isReached = true;
    // }
}

function checkPlayerDie() {
    //this function checks if the character has fallen off the screen
    if (lives == 0) {
        isGameOver = true;
    }
    else if (gameChar_y > height) {
        lives -= 1;
        backgroundSound.stop();
        deathSound.play();
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

function gameWon() {
    backgroundSound.stop();
    stageClearSound.play();
    //this function checks if the character has won the game
    fill(0);
    textSize(30);
    text("You Won!", width / 2, height / 2);
    noLoop();
}

function gameOver() {
    //this function checks if the character has lost the game
    backgroundSound.stop();
    enemySound.stop();
    deathSound.stop();
    gameOverSound.play();
    fill(0);
    textSize(30);
    text("Game Over", width / 2, height / 2);
    noLoop();
}

function playFlagpoleSound() {
    //this function plays the flagpole sound
    flagpoleSound.play();
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