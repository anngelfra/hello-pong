/**
 * Created with JetBrains WebStorm.
 * User: ann
 * Date: 7/28/13
 * Time: 5:40 PM
 * To change this template use File | Settings | File Templates.
 */

var player = function(){
    this.object = null;
};
var world;
var graphicContext;
var canvasWidth;
var canvasHeight;
var canvasTop;
var canvasLeft;
var keys = [];




function initGame(){

    world = createWorld();

    // create 2 big platforms
    var platform_width = 10;
    var platform_height = 60;
    var vertical_center = canvasHeight/2;

    createStaticBox(world, platform_width/2, platform_height/2, platform_width, platform_height, 'ground');
    //createStaticBox(world,canvasWidth-platform_width, vertical_center, platform_width, platform_height, 'ground');

/*
    createBox(world, 30, vertical_center, platform_width, platform_height, true, 'ground');
    createBox(world, canvasWidth-platform_width, vertical_center, platform_width, platform_height, true, 'ground');
    createBox(world, 0, 10, canvasWidth, 1, true);
    createBox(world, 0, canvasHeight-10, canvasWidth, 1, true);
*/
    createBall(world, canvasWidth/2, canvasHeight/2);


}




function step() {

    var timeStep = 1.0/60;
    var iteration = 1;
    world.Step(timeStep, iteration);
    graphicContext.clearRect(0, 0, canvasWidth, canvasHeight);
    drawWorld(world, graphicContext);
    setTimeout('step()', 10);
}

Event.observe(window, 'load', function() {

    graphicContext = $('game').getContext('2d');

    var canvasElm = $('game');
    canvasWidth = parseInt(canvasElm.width);
    canvasHeight = parseInt(canvasElm.height);
    canvasTop = parseInt(canvasElm.style.top);
    canvasLeft = parseInt(canvasElm.style.left);

    initGame();
    step();

    /*window.addEventListener('keydown',handleKeyDown,true);
    window.addEventListener('keyup',handleKeyUp,true);*/
});