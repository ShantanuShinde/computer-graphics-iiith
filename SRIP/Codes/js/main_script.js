

 var canvas = document.getElementById("renderCanvas");
 var engine = new BABYLON.Engine(canvas,true);

var scene, camera, sphere;
var Xaxis, Yaxis, Zaxis;
var vx,vy,vz;
var transformCo_ordinate;
var textplaneTexture; 

init();

function init(){

    // Create scene
    scene = new BABYLON.Scene(engine);

    // Create camera
    camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 100, new BABYLON.Vector3(0,0,0), scene);
    camera.setPosition(new BABYLON.Vector3(100,100,100))
    
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
    sphere = new BABYLON.MeshBuilder.CreateSphere("sphere", {diameter:3}, scene);
    var material = new BABYLON.StandardMaterial(scene);
    material.alpha = 1;
    material.diffuseColor = new BABYLON.Color3(1,1,0);
    sphere.material = material;

    // Display sphere coordinates
    var textPlane = BABYLON.MeshBuilder.CreatePlane("textPlane",{width:50,height:10,sideOrientation:2},scene);
    textPlane.setParent(sphere);
    textPlane.position.y = 7;
    textPlane.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;
    var material = new BABYLON.StandardMaterial("textPlaneMaterial", scene);
    textplaneTexture = new BABYLON.DynamicTexture("dynamic texture", {width:512,height:256}, scene);
    material.diffuseTexture = textplaneTexture;
    textPlane.material = material;
    textplaneTexture.hasAlpha = true;
    textplaneTexture.drawText("(0, 0, 0)",0,140,"bold 50px monospace","blue","white",true,true);
    

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

    // Set transformCo_ordinate
    transformCo_ordinate = false;

    

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
    var coordinate_info = "(" + (vx/100)*sliderValue + ", " + (vy/100)*sliderValue + ", " + (vz/100)*sliderValue + ")"; 
    info.getElementsByTagName("p")[0].innerHTML = coordinate_info;
    
}

function setNewDestination()
{
    vx = document.getElementById("newX").value;
    vy = document.getElementById("newY").value;
    vz = document.getElementById("newZ").value;
    resetPoint();
    displayTransformationMatrix();
    displayPosition();
   
}

function changePosition(newVal)
{
    if(!transformCo_ordinate) {
        sphere.position = new BABYLON.Vector3((vx/100)*newVal,(vy/100)*newVal,(vz/100)*newVal);
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
        sphere.position = new BABYLON.Vector3(0,0,0);
    }
    document.getElementById("slider").getElementsByTagName("input")[0].value = 0;
    updateCoordinates();
    
}

function updateCoordinates()
{
    var sliderValue = document.getElementById("slider").getElementsByTagName("input")[0].value;
    var coordinate_info = "(" + (vx/100)*sliderValue + ", " + (vy/100)*sliderValue + ", " + (vz/100)*sliderValue + ")"; 
    textplaneTexture.drawText(coordinate_info,0,140,"bold 50px monospace","blue","white",true,true);
}
function resetCamera()
{
    camera.setPosition(new BABYLON.Vector3(100,100,100));
   // camera.alpha = camera.beta = Math.PI / 2;
}