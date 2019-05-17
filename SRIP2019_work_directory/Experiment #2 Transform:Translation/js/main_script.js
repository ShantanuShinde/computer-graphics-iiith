var graphic_Display = document.getElementById("point-display");
var vx=100,vy=100,vz=-200;
var camera, scene, renderer;
camera = new THREE.PerspectiveCamera( 40, /*window.innerWidth / window.innerHeight*/graphic_Display.offsetWidth/graphic_Display.offsetHeight, 1, 1000 );
camera.position.set(400,400,400);
camera.lookAt(new THREE.Vector3(0,0,0));
scene = new THREE.Scene();
var geometry = new THREE.SphereGeometry( 5, 32, 32 );
var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
var sphere = new THREE.Mesh( geometry, material );
var axesHelper = new THREE.AxesHelper( 500 );
scene.add( axesHelper );
scene.add( sphere );
sphere.position.set(0,0,0);
renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize(graphic_Display.offsetWidth,graphic_Display.offsetHeight/*window.innerWidth, window.innerHeight */);
graphic_Display.appendChild( renderer.domElement );
renderer.render(scene,camera);
displayPosition();

function changePosition(newVal)
{
    //console.log(newVal);
    sphere.position.set((vx/100)*newVal,(vy/100)*newVal,(vz/100)*newVal);
    renderer.render(scene,camera);
    displayPosition();
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

function displayPosition()
{
    var info = document.getElementById("point-info");
    var coordinate_info = "(" + sphere.position.x + ", " + sphere.position.y + ", " + sphere.position.z + ")"; 
    info.getElementsByTagName("p")[1].innerHTML = coordinate_info;
}
