/**
 * Created with JetBrains WebStorm.
 * User: ann
 * Date: 7/28/13
 * Time: 5:40 PM
 * To change this template use File | Settings | File Templates.
 */
function drawWorld(world, context) {
    for (var b = world.m_bodyList; b; b = b.m_next) {
        for (var s = b.GetShapeList(); s != null; s = s.GetNext()) {
            drawShape(s, context);
        }
    }
}

function drawShape(shape, context) {
    context.strokeStyle = '#7f7f7f';
    context.beginPath();
    switch (shape.m_type) {
        case b2Shape.e_circleShape:
        {
            var circle = shape;
            var pos = circle.m_position;
            var r = circle.m_radius;
            var segments = 16.0;
            var theta = 0.0;
            var dtheta = 2.0 * Math.PI / segments;
            // draw circle
            context.moveTo(pos.x + r, pos.y);
            for (var i = 0; i < segments; i++) {
                var d = new b2Vec2(r * Math.cos(theta), r * Math.sin(theta));
                var v = b2Math.AddVV(pos, d);
                context.lineTo(v.x, v.y);
                theta += dtheta;
            }
            context.lineTo(pos.x + r, pos.y);

            // draw radius
            context.moveTo(pos.x, pos.y);
            var ax = circle.m_R.col1;
            var pos2 = new b2Vec2(pos.x + r * ax.x, pos.y + r * ax.y);
            context.lineTo(pos2.x, pos2.y);
        }
            break;
        case b2Shape.e_polyShape:
        {
            var poly = shape;
            var tV = b2Math.AddVV(poly.m_position, b2Math.b2MulMV(poly.m_R, poly.m_vertices[0]));
            context.moveTo(tV.x, tV.y);
            for (var i = 0; i < poly.m_vertexCount; i++) {
                var v = b2Math.AddVV(poly.m_position, b2Math.b2MulMV(poly.m_R, poly.m_vertices[i]));
                context.lineTo(v.x, v.y);
            }
            context.lineTo(tV.x, tV.y);
        }
            break;
    }
    context.stroke();
}

function createWorld() {
    var worldAABB = new b2AABB();
    worldAABB.minVertex.Set(-1000, -1000);
    worldAABB.maxVertex.Set(1000, 1000);
    var gravity = new b2Vec2(0, 0);
    var doSleep = true;
    var world = new b2World(worldAABB, gravity, doSleep);
    return world;
}

function createBall(world, x, y) {
    var ballSd = new b2CircleDef();
    ballSd.density = 1.0;
    ballSd.radius = 20;
    ballSd.restitution = 1.0;
    ballSd.friction = 0;
    var ballBd = new b2BodyDef();
    ballBd.AddShape(ballSd);
    ballBd.position.Set(x,y);
    ballBd.linearVelocity = new b2Vec2(-10.0, -10.0);
    ballBd.angularVelocity = 0.5;
    return world.CreateBody(ballBd);
}


function createStaticBox(world, x, y, width, height, userData) {

    var boxSd = new b2BoxDef();
    boxSd.userData = userData;
    boxSd.extents.Set(width, height);

    var boxBd = new b2BodyDef();
    boxBd.AddShape(boxSd);
    boxBd.position.Set(x,y);
    boxBd.restitution = 0;
    boxBd.friction = 0;

    return world.CreateBody(boxBd)
}
