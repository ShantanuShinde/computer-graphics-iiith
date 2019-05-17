var graphic_Display = document.getElementById("point-display");
var vx=100,vy=100,vz=-200;
var camera, scene, renderer;
camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
camera.position.z = 400;
scene = new THREE.Scene();
        /*var dotGeometry = new THREE.Geometry();
        dotGeometry.vertices.push(new THREE.Vector3( 0, 0, 0));
        var dotMaterial = new THREE.PointsMaterial( { size: 10, sizeAttenuation: false } );
        var dot = new THREE.Points( dotGeometry, dotMaterial );
        scene.add( dot );*/
var geometry = new THREE.SphereGeometry( 10, 32, 32 );
var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
var sphere = new THREE.Mesh( geometry, material );
        
scene.add( sphere );
sphere.position.set(0,0,0);
renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize(/*graphic_Display.style.width,graphic_Display.style.height*/ window.innerWidth, window.innerHeight );
graphic_Display.appendChild( renderer.domElement );
renderer.render(scene,camera);

function changePosition(newVal)
{
    //console.log(newVal);
    sphere.position.set((vx/100)*newVal,(vy/100)*newVal,(vz/100)*newVal);
    renderer.render(scene,camera);
}

function setNewDestination()
{
    vx = document.getElementById("newX").value;
    vy = document.getElementById("newY").value;
    vz = document.getElementById("newZ").value;
    console.log(vx);
    sphere.position.set(0,0,0);
    renderer.render(scene,camera);
}
