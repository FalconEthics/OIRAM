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
var gameOverSound;
var backgroundSound;

var sky;
var soil;
var cloud1;
var cloud2;
var cloud3;
var cloud4;
var mountains;
var tree1;
var tree3;
var tree4;
var canyon1;
var canyon2;
var enemy1;
var enemy2;
var coin;
var star;
var flagUp;
var flagDown;
var Pole;
var superBoard;
var platform;
var palace;

var frontfacing;
var fontfacingjump;
var rightfacing;
var rightfacing2;
var rightfacingjump;
var leftfacing;
var leftfacing2;
var leftfacingjump;
var characteranimation;

var gameWonImg;
var gameOverImg;

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

    //enemy
    enemy1 = loadImage('assets/enemy1.png');
    enemy2 = loadImage('assets/enemy2.png');

    //coins
    coin = loadImage('assets/coin.png');
    star = loadImage('assets/star.png');

    //flag
    flagUp = loadImage('assets/flagUp.png');
    flagDown = loadImage('assets/flagDown.png');
    Pole = loadImage('assets/pole.png');

    //super board
    superBoard = loadImage('assets/superBoard.png');

    //platform
    platform = loadImage('assets/platform.png');

    //palace
    palace = loadImage('assets/palace.png');

    //character
    frontfacing = loadImage('assets/frontfacing.png');
    frontfacingjump = loadImage('assets/frontfacingjump.png');
    rightfacing = loadImage('assets/rightfacing.png');
    rightfacing2 = loadImage('assets/rightfacing2.png');
    rightfacingjump = loadImage('assets/rightfacingjump.png');
    leftfacing = loadImage('assets/leftfacing.png');
    leftfacing2 = loadImage('assets/leftfacing2.png');
    leftfacingjump = loadImage('assets/leftfacingjump.png');

    //game
    gameWonImg = loadImage('assets/win.png');
    gameOverImg = loadImage('assets/lost.png');

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
    characteranimation = 0;
    isLeft = false;
    isRight = false;
    isFalling = false;
    isPlummeting = false;
    jumpSpeed = 3.5;
    jumpHeight = 120;

    //change the below values to change the collectable items spawn position
    collectables = [
        { x_pos: 420, y_pos: floorPos_y, size: 30, isFound: false },
        { x_pos: 660, y_pos: floorPos_y - 100, size: 30, isFound: false },

    ];

    //change the below values to change the canyon spawn position
    superCollectables = [
        { x_pos: 820, y_pos: floorPos_y, size: 50, isFound: false },

    ];

    //change the below values to change the canyon spawn position
    canyons = [
        { x_pos: -100, width: 100, type: 1 },
        { x_pos: 320, width: 70, type: 1 },
        { x_pos: 900, width: 150, type: 2 },
        { x_pos: 1200, width: 150, type: 1 },

    ];

    //platforms the character can stand on
    platforms = [];
    platforms.push(createPlatforms(470, floorPos_y - 100, 200));

    //change the below values to change the tree spawn position
    trees_x = [-200, 70, 330, 600, 920, 1300, 2100, 2600, 2900, 3150];
    trees_x2 = [1050, 1260, 1400, 1600, 1770, 1850, 2300]
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
    flagpole = { isReached: false, x_pos: 1400 };

    //enemies
    enemies = [];
    enemies.push(new Enemy(0, floorPos_y - 5, 100, 1));
    enemies.push(new Enemy(600, floorPos_y - 5, 100, 2));

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
    image(soil, -1024, 0, width, height)
    image(soil, 0, 0, width, height)
    image(soil, width, 0, width, height)
    image(soil, width * 2, 0, width, height)
    image(soil, width * 3, 0, width, height)
    image(soil, width * 4, 0, width, height)
    image(soil, width * 5, 0, width, height)
    image(soil, width * 6, 0, width, height)
    image(soil, width * 7, 0, width, height)

    //canyon
    checkCanyon(canyons);
    drawCanyons(canyons);

    //lives
    checkPlayerDie();

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
        image(leftfacingjump, gameChar_x, gameChar_y - 60, 50, 70);
    } else if (isRight && isFalling) {
        // add your jumping-right code
        image(rightfacingjump, gameChar_x, gameChar_y - 60, 50, 70);
    } else if (isLeft) {
        // add your walking left code
        if (characteranimation % 2 == 0) {
            image(leftfacing, gameChar_x, gameChar_y - 60, 50, 70);
        }
        else {
            image(leftfacing2, gameChar_x, gameChar_y - 60, 50, 70);
        }
    } else if (isRight) {
        // add your walking right code
        if (characteranimation % 2 == 0) {
            image(rightfacing, gameChar_x, gameChar_y - 60, 50, 70);
        }
        else {
            image(rightfacing2, gameChar_x, gameChar_y - 60, 50, 70);
        }
    } else if (isFalling || isPlummeting) {
        // add your jumping facing forwards code
        image(frontfacingjump, gameChar_x, gameChar_y - 60, 50, 70);
    } else {
        // add your standing front facing code
        image(frontfacing, gameChar_x, gameChar_y - 60, 50, 70);
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
            gameChar_y += jumpSpeed;
            isFalling = true;
        }
    } else {
        isFalling = false;
    }

    //draw lives
    drawLives();

    //score
    fill(255);
    textSize(18);
    text(" Score: " + game_score, 69, 67);

    //superJump
    fill(255);
    textSize(14);
    text("Super Jump: " + superJump, 43, 85);

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


}

function keyPressed() {

    // if statements to control the animation of the character when
    // keys are pressed.

    // A to turn left
    if ((keyCode == 65 || key == 'a' || keyCode == 37) && isPlummeting == false) {
        isLeft = true;
        setInterval(function () {
            characteranimation++;
        }, 190);
        console.log("character is moving left");
    }

    // D to turn right
    if ((keyCode == 68 || key == 'd' || keyCode == 39) && isPlummeting == false) {
        isRight = true;
        setInterval(function () {
            characteranimation++;
        }, 190);
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

    //spacebar to restart the game
    if (keyCode == 32) {
        window.location.reload()
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
    image(mountains, -1024, 0);
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
        image(coin, t_collectable.x_pos, t_collectable.y_pos - 43, t_collectable.size, t_collectable.size);
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
        image(star, t_superCollectable.x_pos, t_superCollectable.y_pos - 60, t_superCollectable.size + 10, t_superCollectable.size);
    }
}


function checkCanyon(t_canyon) {
    //this function checks if the character has reached the canyon
    for (let i = 0; i < t_canyon.length; i++) {
        if (
            gameChar_x > t_canyon[i].x_pos - 20 &&
            gameChar_x < t_canyon[i].x_pos + t_canyon[i].width - 40 &&
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
            image(canyon2, t_canyon[i].x_pos, 424, t_canyon[i].width, 152)
        }
        else if (t_canyon[i].type == 2) {
            image(canyon1, t_canyon[i].x_pos, 424, t_canyon[i].width, 152)
        }
    }
}

function renderFlagpole() {
    //this function draws the flagpole
    image(palace, flagpole.x_pos + 50, floorPos_y - 440, 450, 450);
    if (flagpole.isReached == false) {
        image(Pole, flagpole.x_pos, floorPos_y - 140, 50, 150);
        image(flagDown, flagpole.x_pos + 25, floorPos_y - 50);
    }
    if (flagpole.isReached == true) {
        image(Pole, flagpole.x_pos, floorPos_y - 140, 50, 150);
        image(flagUp, flagpole.x_pos + 25, floorPos_y - 135);
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
        backgroundSound.stop();
        deathSound.play();
        startGame();
    }
}

function drawLives() {
    //this function draws the lives
    image(superBoard, 10, 10, 200, 100);
    fill(255);
    noStroke();
    textSize(18);
    text("Lives: " + lives, 75, 45);
}

function gameWon() {
    backgroundSound.stop();
    enemySound.stop();
    deathSound.stop();
    if(!winSound.isPlaying()){
        winSound.play();
    }
    //this function checks if the character has won the game
    image(gameWonImg, 200, 100);
    fill(255);
    noStroke();
    textSize(18);
    text("Press Space to Restart", 400, 500);
    noLoop();
}

function gameOver() {
    //this function checks if the character has lost the game
    backgroundSound.stop();
    enemySound.stop();
    deathSound.stop();
    gameOverSound.play();
    image(gameOverImg, 200, 0);
    fill(255);
    noStroke();
    textSize(18);
    textFont('Georgia');
    text("Press Space to Restart", 400, 500);

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
            image(platform, this.x + 16, this.y, this.length, 20);
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

function Enemy(x, y, range, type) {
    this.x = x;
    this.y = y;
    this.range = range;
    this.type = type;

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
        if (this.type == 1) {
            image(enemy1, this.currentX, this.y - 30, 40, 40);
        }
        else if (this.type == 2) {
            image(enemy2, this.currentX, this.y - 50, 60, 60);
        }
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