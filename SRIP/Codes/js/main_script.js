var graphic_Display;
var vx,vy,vz;
var camera, scene, renderer, control;
var sphere;
var Xaxis, Yaxis, Zaxis;
var transformCo_ordinate = false;


init();

function init(){
    graphic_Display = document.getElementById("point_display");
    vx = 100, vy = 100, vz = -300;

    // initialize camera and scene
    camera = new THREE.PerspectiveCamera( 40, graphic_Display.offsetWidth/graphic_Display.offsetHeight, 1, 1000 );
    camera.position.set(400,400,400);
    camera.lookAt(new THREE.Vector3(0,0,0));
    scene = new THREE.Scene();

    // create and add point to the scene
    var geometry = new THREE.SphereGeometry( 5, 32, 32 );
    var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    sphere = new THREE.Mesh( geometry, material );
    scene.add( sphere );
    sphere.position.set(0,0,0);

    // create and axes to the scene
    //// X axis
    var material = new THREE.LineBasicMaterial({
        color: 0x00ff00
    })
    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(10000,0,0), new THREE.Vector3(-10000,0,0));
    Xaxis = new THREE.Line(geometry,material);
    scene.add(Xaxis);

    //// Y axis
    var material = new THREE.LineBasicMaterial({
        color: 0xff0000
    })
    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(0,10000,0), new THREE.Vector3(0,-10000,0));
    Yaxis = new THREE.Line(geometry,material);
    scene.add(Yaxis);

    //// Z axis
    var material = new THREE.LineBasicMaterial({
        color: 0x0000ff
    })
    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(0,0,10000), new THREE.Vector3(0,0,-10000));
    Zaxis = new THREE.Line(geometry,material);
    scene.add(Zaxis);

    // Create and initialize renderer
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(graphic_Display.offsetWidth,graphic_Display.offsetHeight);
    graphic_Display.appendChild( renderer.domElement );
    render();

    // Add orbit controls
    control = new THREE.OrbitControls( camera, renderer.domElement );
    control.addEventListener( 'change', render ); 
    control.screenSpacePanning = false;
    control.minDistance = 100;
    control.maxDistance = 1000;
    
    window.addEventListener("resize", resizeDisplay);

    displayPosition();
    displayTransformationMatrix();
}
function changePosition(newVal)
{
    if(!transformCo_ordinate) {
        sphere.position.set((vx/100)*newVal,(vy/100)*newVal,(vz/100)*newVal);
    }
    else{
        Xaxis.geometry.vertices[0].set(10000,-(vy/100)*newVal,-(vz/100)*newVal);
        Xaxis.geometry.vertices[1].set(-10000,-(vy/100)*newVal,-(vz/100)*newVal);

        Yaxis.geometry.vertices[0].set(-(vx/100)*newVal,10000,-(vz/100)*newVal);
        Yaxis.geometry.vertices[1].set(-(vx/100)*newVal,-10000,-(vz/100)*newVal);

        Zaxis.geometry.vertices[0].set(-(vx/100)*newVal,-(vy/100)*newVal,10000);
        Zaxis.geometry.vertices[1].set(-(vx/100)*newVal,-(vy/100)*newVal,-10000);

        Xaxis.geometry.verticesNeedUpdate = true;
        Yaxis.geometry.verticesNeedUpdate = true;
        Zaxis.geometry.verticesNeedUpdate = true;
        
    }
    render();
    displayPosition();
}

function setNewDestination()
{
    vx = document.getElementById("newX").value;
    vy = document.getElementById("newY").value;
    vz = document.getElementById("newZ").value;

    resetPoint();
    displayTransformationMatrix();
    displayPosition();
    render();
}

function displayPosition()
{
    var info = document.getElementById("point_info");
    var sliderValue = document.getElementById("slider").getElementsByTagName("input")[0].value;
    var coordinate_info = "(" + (vx/100)*sliderValue + ", " + (vy/100)*sliderValue + ", " + (vz/100)*sliderValue + ")"; 
    info.getElementsByTagName("p")[0].innerHTML = coordinate_info;
}

function render() {
    renderer.render( scene, camera );
}

function resetCamera()
{
    control.reset();
}

function transformCoordinate(transform)
{
    resetPoint();
    transformCo_ordinate = transform;
    displayPosition();
    render();
}

function resetPoint()
{
    if(transformCo_ordinate)
    {
        Xaxis.geometry.vertices[0].set(10000,0,0);
        Xaxis.geometry.vertices[1].set(-10000,0,0);

        Yaxis.geometry.vertices[0].set(0,10000,0);
        Yaxis.geometry.vertices[1].set(0,-10000,0);

        Zaxis.geometry.vertices[0].set(0,0,10000);
        Zaxis.geometry.vertices[1].set(0,0,-10000);

        Xaxis.geometry.verticesNeedUpdate = true;
        Yaxis.geometry.verticesNeedUpdate = true;
        Zaxis.geometry.verticesNeedUpdate = true;
    }
    else
    {
        sphere.position.set(0,0,0);
    }
    document.getElementById("slider").getElementsByTagName("input")[0].value = 0;
}

function displayTransformationMatrix()
{
    var matrix = "$$\\begin{bmatrix} 1 & 0 & 0 & " + vx + "\\\\ 0 & 1 & 0 & " + vy + "\\\\ 0 & 0 & 1 & " + vz + "\\\\ 0 & 0 & 0 & 1 \\end{bmatrix}$$"
    var tranMat = document.getElementById("transformMatrix");
    tranMat.innerHTML = matrix;

    MathJax.Hub.Queue(["Typeset", MathJax.Hub, tranMat]);
}

function resizeDisplay()
{
    camera.aspect = graphic_Display.offsetWidth/graphic_Display.offsetHeight
    camera.updateProjectionMatrix();
    renderer.setSize(graphic_Display.offsetWidth,graphic_Display.offsetHeight);
    render();
}