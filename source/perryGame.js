// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    
    var stats = new Stats();
    document.body.appendChild(stats.domElement);
    
    var canvas = document.getElementById("c");
    var ctx = canvas.getContext("2d");
    var world;
	
	animFrame();   
    init();
    requestAnimFrame(update);
	
	
	function animFrame(){
	    window.requestAnimFrame = (function(){
          return  window.requestAnimationFrame       || 
                  window.webkitRequestAnimationFrame || 
                  window.mozRequestAnimationFrame    || 
                  window.oRequestAnimationFrame      || 
                  window.msRequestAnimationFrame     || 
                  function(/* function */ callback, /* DOMElement */ element){
                    window.setTimeout(callback, 1000 / 60);
                  };
    })();
	}
  
    function init() {
       var   b2Vec2 = Box2D.Common.Math.b2Vec2
        , b2BodyDef = Box2D.Dynamics.b2BodyDef
        , b2Body = Box2D.Dynamics.b2Body
        , b2FixtureDef = Box2D.Dynamics.b2FixtureDef
        , b2Fixture = Box2D.Dynamics.b2Fixture
        , b2World = Box2D.Dynamics.b2World
        , b2MassData = Box2D.Collision.Shapes.b2MassData
        , b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
        , b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
        , b2DebugDraw = Box2D.Dynamics.b2DebugDraw
          ;
     
       world = new b2World(
             new b2Vec2(2, 15)    //gravity
          ,  true                 //allow sleep
       );
       
       var SCALE = 30;
     
       var fixDef = new b2FixtureDef;
       fixDef.density = 1.0;
       fixDef.friction = 0.2;
       fixDef.restitution = 0.99;
     
       var bodyDef = new b2BodyDef;
     
       //create walls
       bodyDef.type = b2Body.b2_staticBody;
	   fixDef.shape = new b2PolygonShape;
       
       // bottom & top
        bodyDef.position.x = (canvas.width / SCALE);
        bodyDef.position.y = (canvas.height / SCALE);
        fixDef.shape.SetAsBox((canvas.width / SCALE), 0.5 / 2);
        world.CreateBody(bodyDef).CreateFixture(fixDef);
        bodyDef.position.x = (canvas.width / SCALE)-10;
        bodyDef.position.y = (0);
        world.CreateBody(bodyDef).CreateFixture(fixDef);
        //left & right
        bodyDef.position.x = (canvas.width / SCALE);
        bodyDef.position.y = 0;
        fixDef.shape.SetAsBox(0.5/2, (canvas.height)/SCALE);
        world.CreateBody(bodyDef).CreateFixture(fixDef);
        bodyDef.position.x = 0;
        bodyDef.position.y = 0;
        world.CreateBody(bodyDef).CreateFixture(fixDef);

       //create dynamic circle object
      for (var j=0; j<150; j++){
       bodyDef.type = b2Body.b2_dynamicBody;
       fixDef.shape = new b2CircleShape(
          Math.random()*0.1 + 0.1 //radius
       );
       bodyDef.position.x = Math.random() * 25;
       bodyDef.position.y = Math.random() * 10;
       bodyDef.density = Math.random(); 
       world.CreateBody(bodyDef).CreateFixture(fixDef);
     }

       // create dynamic polygon object
       for(var i=0; i<100; i++){
       bodyDef.type = b2Body.b2_dynamicBody;
       fixDef.shape = new b2PolygonShape;
       fixDef.shape.SetAsBox(
             Math.random()*0.2 + 0.1 //half width
          ,  Math.random()*0.2 + 0.1 //half height
       );
       bodyDef.position.x = Math.random() * 25;
       bodyDef.position.y = Math.random() * 10;
       bodyDef.density = Math.random(); 
       world.CreateBody(bodyDef).CreateFixture(fixDef);
     }
     
       //setup debug draw
       var debugDraw = new b2DebugDraw();
       debugDraw.SetSprite(document.getElementById("c").getContext("2d"));
       debugDraw.SetDrawScale(SCALE);
       debugDraw.SetFillAlpha(0.3);
       debugDraw.SetLineThickness(1.0);
       debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
       world.SetDebugDraw(debugDraw);
     
       // restart
       setTimeout(init, 10000);
    }; // init()
  
    function update() {
       world.Step(
             1 / 60   //frame-rate
          ,  10       //velocity iterations
          ,  10       //position iterations
       );
       world.DrawDebugData();
       world.ClearForces();
     
       stats.update();
       requestAnimFrame(update);
    }; // update()
