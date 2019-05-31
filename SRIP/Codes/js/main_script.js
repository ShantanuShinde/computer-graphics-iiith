 var canvas = document.getElementById("renderCanvas");
 var engine = new BABYLON.Engine(canvas,true);

var scene, camera, sphere;
var Xaxis, Yaxis, Zaxis;
var vx,vy,vz, px, py, pz;;
var transformCo_ordinate;
var textplaneTexture; 

init();

function init(){

    // Create scene
    scene = new BABYLON.Scene(engine);

    // Create camera
    camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 100, new BABYLON.Vector3(0,0,0), scene);
    camera.setPosition(new BABYLON.Vector3(300,300,300))
    
    camera.attachControl(canvas,true);
    
    // Add lights to the scene
    var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
    var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);

    // Create axes
    Xaxis =  BABYLON.MeshBuilder.CreateLines("Xaxis",{points:[new BABYLON.Vector3(1000,0,0),new BABYLON.Vector3(-1000,0,0)], updatable:true},scene);
    Yaxis =  BABYLON.MeshBuilder.CreateLines("Yaxis",{points:[new BABYLON.Vector3(0,1000,0),new BABYLON.Vector3(0,-1000,0)], updatable:true},scene);
    Zaxis =  BABYLON.MeshBuilder.CreateLines("Zaxis",{points:[new BABYLON.Vector3(0,0,1000),new BABYLON.Vector3(0,0,-1000)], updatable:true},scene);
    Xaxis.color = new BABYLON.Color3(1,0,0);
    Yaxis.color = new BABYLON.Color3(0,1,0);
    Zaxis.color = new BABYLON.Color3(0,0,1);
    


    // Create sphere
    sphere = new BABYLON.MeshBuilder.CreateSphere("sphere", {diameter:5}, scene);
    var material = new BABYLON.StandardMaterial(scene);
    material.alpha = 1;
    material.diffuseColor = new BABYLON.Color3(1,1,0);
    sphere.material = material;

    // Display sphere coordinates
    var textPlane = BABYLON.MeshBuilder.CreatePlane("textPlane",{width:150,height:20,sideOrientation:2},scene);
    textPlane.setParent(sphere);
    textPlane.position.y = 20;
    textPlane.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;
    var material = new BABYLON.StandardMaterial("textPlaneMaterial", scene);
    textplaneTexture = new BABYLON.DynamicTexture("dynamic texture", {width:512,height:256}, scene);
    material.diffuseTexture = textplaneTexture;
    textPlane.material = material;
    textplaneTexture.hasAlpha = true;
    textplaneTexture.drawText("(0,0,0)",0,140,"bold 55px monospace","blue","white",true,true);
    

    // Register a render loop to repeatedly render the scene
    engine.runRenderLoop(function () { 
        scene.render();
    });

    // Watch for browser/canvas resize events
    window.addEventListener("resize", function () { 
            engine.resize();
    });

    // Set initial destination
    vx = 100, vy = 100, vz = -300;

    // Set initial starting point
    px = 0, py = 0, pz = 0;

    // Set transformCo_ordinate
    transformCo_ordinate = false;

    // Add text to the manual
    var manual = document.getElementById("manual").getElementsByTagName("p");
    manual[0].innerHTML = "<b><u>Translation</u></b><br/><i><u>Introduction to the interface :</u></i><br/>This experiment is to demonstrate how translation transformation works on point and coordinate system. The point and coordinate system is displayed in the top part. The point starts at the origin. The current coordinates of the point are displayed above the point as well as below. Below the coordinates is the checkbox to select whether to move the point or the coordinate system. Below it is the transformation matrix applied for translation. Below it is the slider to move the point or the coordinate system to the current destination. Than there are input for X, Y, Z. The <b>Set New Destination</b> button sets the X,Y,Z values as the current destination. The <b>Set Starting Point</b> changes the starting position of the point to the value of X, Y, Z. The <b>Reset Camera</b> button resets the camera of the display. ";

    displayTransformationMatrix();
    displayPosition();
}

function displayTransformationMatrix()
{
    var matrix = "$$\\begin{bmatrix} 1 & 0 & 0 & " + vx + "\\\\ 0 & 1 & 0 & " + vy + "\\\\ 0 & 0 & 1 & " + vz + "\\\\ 0 & 0 & 0 & 1 \\end{bmatrix}$$"
    var tranMat = document.getElementById("transformMatrix");
    tranMat.innerHTML = matrix;

    MathJax.Hub.Queue(["Typeset", MathJax.Hub, tranMat]);
}

function displayPosition()
{
    var info = document.getElementById("point_info");
    var sliderValue = document.getElementById("slider").getElementsByTagName("input")[0].value;
    var coordinate_info = "(" + (((vx-px)/100)*sliderValue + px) + "," + (((vy-py)/100)*sliderValue + py) + "," + (((vz-pz)/100)*sliderValue + pz) + ")"; 
    info.getElementsByTagName("p")[3].innerHTML = coordinate_info;
    
}

function setNewDestination()
{
    vx = parseFloat(document.getElementById("destX").value);
    vy = parseFloat(document.getElementById("destY").value);
    vz = parseFloat(document.getElementById("destZ").value);
    resetPoint();
    displayTransformationMatrix();
    displayPosition();
   
}

function changePosition(newVal)
{
    if(!transformCo_ordinate) {
        sphere.position = new BABYLON.Vector3(((vx-px)/100)*newVal + px,((vy-py)/100)*newVal + py,((vz-pz)/100)*newVal + pz);
        console.log(sphere.position);
    }
    else{
        Xaxis =  BABYLON.MeshBuilder.CreateLines("Xaxis",{points:[new BABYLON.Vector3(1000,(vy/100)*newVal,(vz/100)*newVal),new BABYLON.Vector3(-1000,(vy/100)*newVal,(vz/100)*newVal)], instance:Xaxis});
        Yaxis =  BABYLON.MeshBuilder.CreateLines("Yaxis",{points:[new BABYLON.Vector3((vx/100)*newVal,1000,(vz/100)*newVal),new BABYLON.Vector3((vx/100)*newVal,-1000,(vz/100)*newVal)], instance:Yaxis});
        Zaxis =  BABYLON.MeshBuilder.CreateLines("Zaxis",{points:[new BABYLON.Vector3((vx/100)*newVal,(vy/100)*newVal,1000),new BABYLON.Vector3((vx/100)*newVal,(vy/100)*newVal,-1000)], instance:Zaxis});        
    }
    updateCoordinates();
    displayPosition();
}

function transformCoordinate(transform)
{
    resetPoint();
    transformCo_ordinate = transform;


    displayPosition();
}

function resetPoint()
{
    if(transformCo_ordinate)
    {
        Xaxis =  BABYLON.MeshBuilder.CreateLines("Xaxis",{points:[new BABYLON.Vector3(1000,0,0),new BABYLON.Vector3(-1000,0,0)],instance:Xaxis});
        Yaxis =  BABYLON.MeshBuilder.CreateLines("Yaxis",{points:[new BABYLON.Vector3(0,1000,0),new BABYLON.Vector3(0,-1000,0)],instance:Yaxis});
        Zaxis =  BABYLON.MeshBuilder.CreateLines("Zaxis",{points:[new BABYLON.Vector3(0,0,1000),new BABYLON.Vector3(0,0,-1000)], instance:Zaxis});
    }
    else
    {
        sphere.position = new BABYLON.Vector3(px,py,pz);
    }
    document.getElementById("slider").getElementsByTagName("input")[0].value = 0;
    updateCoordinates();
}

function updateCoordinates()
{
    var sliderValue = document.getElementById("slider").getElementsByTagName("input")[0].value;
    var coordinate_info = "(" + (((vx-px)/100)*sliderValue + px) + "," + (((vy-py)/100)*sliderValue + py) + "," + (((vz-pz)/100)*sliderValue + pz) + ")"; 
    textplaneTexture.drawText(coordinate_info,0,140,"bold 55px monospace","blue","white",true,true);
}
function resetCamera()
{
    camera.setPosition(new BABYLON.Vector3(300,300,300));
}

function changeStartingPoint()
{
    px = parseFloat(document.getElementById("strtX").value);
    py = parseFloat(document.getElementById("strtY").value);
    pz = parseFloat(document.getElementById("strtZ").value);
    resetPoint();
}