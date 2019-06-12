 var canvas = document.getElementById("renderCanvas");
 var engine = new BABYLON.Engine(canvas, true);

 var scene, camera, sphere;
 var Xaxis, Yaxis, Zaxis;
 var vx, vy, vz, px, py, pz;;
 var transformCo_ordinate;
 var textplaneTexture;
 var manual, manualIndex = 0;
 var xy, yz, xz;
 init();

 function init() {

     // Create scene
     scene = new BABYLON.Scene(engine);

     // Create camera
     camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 100, new BABYLON.Vector3(0, 0, 0), scene);
     camera.setPosition(new BABYLON.Vector3(300, 300, 300))
     camera.attachControl(canvas, true);

     // Add lights to the scene
     var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
     light1.specular = new BABYLON.Color3(0, 0, 0);
     var light2 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 1), scene);
     light2.specular = new BABYLON.Color3(0, 0, 0);
     var light3 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 0, 1), scene);
     light3.specular = new BABYLON.Color3(0, 0, 0);
     var light4 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(-1, -1, 0), scene);
     light4.specular = new BABYLON.Color3(0, 0, 0);

     // Create axes
     createAxes();
     // Create axes labels
     createAxesLabels();

     // Create sphere
     createSphere();

     createGrid();
     // Register a render loop to repeatedly render the scene
     engine.runRenderLoop(function () {
         scene.render();
     });

     // Watch for browser/canvas resize events
     window.addEventListener("resize", function () {
         engine.resize();
     });

     // Set initial destination
     vx = 100.00, vy = 100.00, vz = -300.00;

     // Set initial starting point
     px = 0.00, py = 0.00, pz = 0.00;

     // Set transformCo_ordinate
     transformCo_ordinate = false;

     // Add text to the manual
     manual = document.getElementById("manual").getElementsByTagName("p");
     manual[0].innerHTML = "<b><u>Translation</u></b><br><i><u>Introduction to the interface</u>:</i><br> <a href='#' onclick='manualForward()'> Next</a><br><br>This experiment is to demonstrate how translation transformation works on point and coordinate system. The point and coordinate system is displayed in the top part. The point starts at the origin. The current coordinates of the point are displayed above the point as well as below. Below the coordinates is the checkbox to select whether to move the point or the coordinate system. Below it is the transformation matrix applied for translation. Below it is the slider to move the point or the coordinate system to the current destination. Than there are input for X, Y, Z. The <b>Set New Destination</b> button sets the X,Y,Z values as the current destination. Below it are another X,Y,Z values that can be editted. The <b>Set Starting Point</b> changes the starting position of the point to the value of these X, Y, Z. The <b>Reset Camera</b> button resets the camera of the display.<br> <br> <a href='#' onclick='manualForward()'> Next</a>";
     manual[1].innerHTML = "<i><u>Set Up</u>:</i><br> <a href='#' onclick='manualBackward()'> Previous</a> | <a href='#' onclick='manualForward()'>Next</a><br><br>The experiment starts with the point at the origin and the initial destination set to (100,100,-300). Translation transformation is applied to the point. This translation is animated. The slider can be dragged forward and backward to make the point move towards and away from the destination in the animation respectively. The destination of the point can be editted by typing in the coordinates in the first set of X,Y,Z and clicking the <b>Set New Destination</b> button.Starting point of the point can also be changed by putting in the new coordinates in the second set of X,Y,Z and clicking the <b>Set Starting Point</b> button. The point moves in 3D space and the camera can be moved by clicking and dragging in the display area to rotate and scrolling the mourse wheel in that area to change the distance. To reset camera back to deafult view, click the <b>Reset Camera</b> button.<br><br> <a href='#' onclick='manualBackward()'> Previous</a> | <a href='#' onclick='manualForward'>Next</a>";
     manual[2].innerHTML = "<i><u>Vector Addition vs Matrix Product Form</u>:</i><br> <a href='#' onclick='manualBackward()'> Previous</a> | <a href='#' onclick='manualForward()'>Next</a><br><br>Translation can be represented in two ways: -<br> 1.Vector Addition Form: Trnaslation of (tx,ty,tz) units can be represented as vector addition of the units to the position of the point to which the translation is applied.<br>2.Matrix Product Form: This form is used in the experiment to represent translation. In this, translation of (tx,ty,tz) units on a point (px,py,pz) can be represented as the matrix multiplication of the Transformation matrix: <br><br>    $$\\begin{bmatrix} 1 & 0 & 0 & tx\\\\ 0 & 1 & 0 & ty\\\\ 0 & 0 & 1 & tz\\\\ 0 & 0 & 0 & 1 \\end{bmatrix}$$ <br><br>and the vector of the point: <br/<br>    $$\\begin{bmatrix} px \\\\ py \\\\ pz \\\\ 1 \\end{bmatrix}$$ <br/<br> In the experiment, the transformation matrix is displayed for the given starting point and destination.<br><br> <a href='#' onclick='manualBackward()'> Previous</a> | <a href='#' onclick='manualForward()'>Next</a>";
     manual[3].innerHTML = "<i><u>Interpreting Transformations</u>: </i><br> <a href='#' onclick='manualBackward()'> Previous</a><br><br>Any transformation can be interpreted either as a modification of a point in the co-ordinate system or the modification of the co-ordinate system itself.Switch between the two interpretations at the point using the Transform Co-ordinate Systems checkbox.<br><br> <a href='#' onclick='manualBackward()'>Previous</a>"
     MathJax.Hub.Queue(["Typeset", MathJax.Hub, manual[2]]);
     manual[1].hidden = manual[2].hidden = manual[3] = true;

     displayTransformationMatrix();
     displayPosition();
 }

 function displayTransformationMatrix() {
     var matrix = "$$\\begin{bmatrix} 1 & 0 & 0 & " + (vx - px).toFixed(2) + "\\\\ 0 & 1 & 0 & " + (vy - py).toFixed(2) + "\\\\ 0 & 0 & 1 & " + (vz - pz).toFixed(2) + "\\\\ 0 & 0 & 0 & 1 \\end{bmatrix}$$"
     var tranMat = document.getElementById("transformMatrix");
     tranMat.innerHTML = matrix;

     MathJax.Hub.Queue(["Typeset", MathJax.Hub, tranMat]);
 }

 function displayPosition() {
     var info = document.getElementById("point_info");
     var sliderValue = document.getElementById("slider").getElementsByTagName("input")[0].value;
     var coordinate_info = "(" + (((vx - px) / 100) * sliderValue + px).toFixed(2) + "," + (((vy - py) / 100) * sliderValue + py).toFixed(2) + "," + (((vz - pz) / 100) * sliderValue + pz).toFixed(2) + ")";
     info.getElementsByTagName("p")[4].innerHTML = coordinate_info;
 }

 function changePosition(newVal) {
     if (!transformCo_ordinate) {
         sphere.position = new BABYLON.Vector3(((vx - px) / 100) * newVal + px, ((vy - py) / 100) * newVal + py, ((vz - pz) / 100) * newVal + pz);
     } else {
         Xaxis = BABYLON.MeshBuilder.CreateLines("Xaxis", {
             points: [new BABYLON.Vector3(1000, (vy / 100) * newVal, (vz / 100) * newVal), new BABYLON.Vector3(-1000, (vy / 100) * newVal, (vz / 100) * newVal)],
             instance: Xaxis
         });
         Yaxis = BABYLON.MeshBuilder.CreateLines("Yaxis", {
             points: [new BABYLON.Vector3((vx / 100) * newVal, 1000, (vz / 100) * newVal), new BABYLON.Vector3((vx / 100) * newVal, -1000, (vz / 100) * newVal)],
             instance: Yaxis
         });
         Zaxis = BABYLON.MeshBuilder.CreateLines("Zaxis", {
             points: [new BABYLON.Vector3((vx / 100) * newVal, (vy / 100) * newVal, 1000), new BABYLON.Vector3((vx / 100) * newVal, (vy / 100) * newVal, -1000)],
             instance: Zaxis
         });
     }
     updateCoordinates();
     displayPosition();
 }

 function transformCoordinate(transform) {
     resetPoint();
     transformCo_ordinate = transform;
     displayPosition();
 }

 function resetPoint() {
     if (transformCo_ordinate) {
         Xaxis = BABYLON.MeshBuilder.CreateLines("Xaxis", {
             points: [new BABYLON.Vector3(1000, 0, 0), new BABYLON.Vector3(-1000, 0, 0)],
             instance: Xaxis
         });
         Yaxis = BABYLON.MeshBuilder.CreateLines("Yaxis", {
             points: [new BABYLON.Vector3(0, 1000, 0), new BABYLON.Vector3(0, -1000, 0)],
             instance: Yaxis
         });
         Zaxis = BABYLON.MeshBuilder.CreateLines("Zaxis", {
             points: [new BABYLON.Vector3(0, 0, 1000), new BABYLON.Vector3(0, 0, -1000)],
             instance: Zaxis
         });
     } else {
         sphere.position = new BABYLON.Vector3(px, py, pz);
     }
     document.getElementById("slider").getElementsByTagName("input")[0].value = 0;
     updateCoordinates();
 }

 function updateCoordinates() {
     var sliderValue = document.getElementById("slider").getElementsByTagName("input")[0].value;
     var coordinate_info = "(" + (((vx - px) / 100) * sliderValue + px).toFixed(2) + "," + (((vy - py) / 100) * sliderValue + py).toFixed(2) + "," + (((vz - pz) / 100) * sliderValue + pz).toFixed(2) + ")";
     textplaneTexture.drawText(coordinate_info, 0, 140, "bold 40px monospace", "blue", "white", true, true);
 }

 function resetCamera() {
     camera.setPosition(new BABYLON.Vector3(300, 300, 300));
 }

 function changeStartingPoint() {
     var tempPX = parseFloat(document.getElementById("strtX").value);
     var tempPY = parseFloat(document.getElementById("strtY").value);
     var tempPZ = parseFloat(document.getElementById("strtZ").value);
     if ((tempPX > 1000 || tempPX < -1000) || (tempPY > 1000 || tempPY < -1000) || (tempPZ > 1000 || tempPZ < -1000)) {
         alert("Coordinate values must be between 1000 and -1000");
         document.getElementById("strttX").value = px;
         document.getElementById("strtY").value = py;
         document.getElementById("strtZ").value = pz
     } else {
         px = tempPX;
         py = tempPY;
         pz = tempPZ;
     }
     resetPoint();
 }

 function setNewDestination() {
     var tempVX = parseFloat(document.getElementById("destX").value);
     var tempVY = parseFloat(document.getElementById("destY").value);
     var tempVZ = parseFloat(document.getElementById("destZ").value);
     if ((tempVX > 1000 || tempVX < -1000) || (tempVY > 1000 || tempVY < -1000) || (tempVZ > 1000 || tempVZ < -1000)) {
         alert("Coordinate values must be between 1000 and -1000");
         document.getElementById("destX").value = vx;
         document.getElementById("destY").value = vy;
         document.getElementById("destZ").value = vz
     } else {
         vx = tempVX;
         vy = tempVY;
         vz = tempVZ;
     }
     resetPoint();
     displayTransformationMatrix();
     displayPosition();
 }


 function manualBackward() {
     manual[manualIndex].hidden = true;
     manualIndex = (manualIndex - 1) % 4;
     manual[manualIndex].hidden = false;
 }

 function manualForward() {
     manual[manualIndex].hidden = true;
     manualIndex = (manualIndex + 1) % 4;
     manual[manualIndex].hidden = false;
 }

 function createAxesLabels() {
     var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("myUI");
     var xAxis = new BABYLON.GUI.TextBlock();
     xAxis.text = "____";
     xAxis.color = "red";
     xAxis.fontSize = 24;
     xAxis.background = "red";
     xAxis.paddingRight = 80;
     xAxis.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
     xAxis.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
     advancedTexture.addControl(xAxis);
     var yAxis = new BABYLON.GUI.TextBlock();
     yAxis.text = "____";
     yAxis.color = "green";
     yAxis.fontSize = 24;
     yAxis.paddingRight = 80;
     yAxis.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
     yAxis.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
     yAxis.paddingTop = 30;
     advancedTexture.addControl(yAxis);
     var zAxis = new BABYLON.GUI.TextBlock();
     zAxis.text = "____";
     zAxis.color = "blue";
     zAxis.fontSize = 24;
     zAxis.paddingRight = 80;
     zAxis.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
     zAxis.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
     zAxis.paddingTop = 60;
     advancedTexture.addControl(zAxis);

     var xAxisName = new BABYLON.GUI.TextBlock();
     xAxisName.color = "yellow";
     xAxisName.fontSize = 18;
     xAxisName.text = "X axis";
     xAxisName.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
     xAxisName.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
     xAxisName.paddingTop = 15;
     xAxisName.paddingRight = 20;
     advancedTexture.addControl(xAxisName);
     var yAxisName = new BABYLON.GUI.TextBlock();
     yAxisName.color = "yellow";
     yAxisName.fontSize = 18;
     yAxisName.text = "Y axis";
     yAxisName.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
     yAxisName.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
     yAxisName.paddingTop = 45;
     yAxisName.paddingRight = 20;
     advancedTexture.addControl(yAxisName);
     var zAxisName = new BABYLON.GUI.TextBlock();
     zAxisName.color = "yellow";
     zAxisName.fontSize = 18;
     zAxisName.text = "Z axis";
     zAxisName.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
     zAxisName.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
     zAxisName.paddingTop = 75;
     zAxisName.paddingRight = 20;
     advancedTexture.addControl(zAxisName);
 }

 function createAxes() {
     Xaxis = BABYLON.MeshBuilder.CreateLines("Xaxis", {
         points: [new BABYLON.Vector3(1000, 0, 0), new BABYLON.Vector3(-1000, 0, 0)],
         updatable: true
     }, scene);
     Yaxis = BABYLON.MeshBuilder.CreateLines("Yaxis", {
         points: [new BABYLON.Vector3(0, 1000, 0), new BABYLON.Vector3(0, -1000, 0)],
         updatable: true
     }, scene);
     Zaxis = BABYLON.MeshBuilder.CreateLines("Zaxis", {
         points: [new BABYLON.Vector3(0, 0, 1000), new BABYLON.Vector3(0, 0, -1000)],
         updatable: true
     }, scene);
     Xaxis.color = new BABYLON.Color3(1, 0, 0);
     Yaxis.color = new BABYLON.Color3(0, 1, 0);
     Zaxis.color = new BABYLON.Color3(0, 0, 1);
 }

 function createSphere() {
     sphere = new BABYLON.MeshBuilder.CreateSphere("sphere", {
         diameter: 5
     }, scene);
     var material = new BABYLON.StandardMaterial(scene);
     material.alpha = 1;
     material.diffuseColor = new BABYLON.Color3(1, 1, 0);
     sphere.material = material;

     // Display sphere coordinates
     var textPlane = BABYLON.MeshBuilder.CreatePlane("textPlane", {
         width: 170,
         height: 30,
         sideOrientation: 2
     }, scene);
     textPlane.setParent(sphere);
     textPlane.position.y = 30;
     textPlane.position.z = -30;
     textPlane.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;
     var material = new BABYLON.StandardMaterial("textPlaneMaterial", scene);
     textplaneTexture = new BABYLON.DynamicTexture("dynamic texture", {
         width: 550,
         height: 256
     }, scene);
     material.diffuseTexture = textplaneTexture;
     textPlane.material = material;
     textplaneTexture.hasAlpha = true;
     textplaneTexture.drawText("(0,0,0)", 0, 140, "bold 40px monospace", "blue", "white", true, true);
 }

 function createGrid() {
     xy = new BABYLON.MeshBuilder.CreatePlane("xy", {
         width: 2000,
         height: 2000,
         sideOrientation: 2
     }, scene);

     yz = new BABYLON.MeshBuilder.CreatePlane("yz", {
         width: 2000,
         height: 2000,
         sideOrientation: 2
     }, scene);
     yz.rotation.y = Math.PI / 2;

     xz = new BABYLON.MeshBuilder.CreatePlane("xz", {
         width: 2000,
         height: 2000,
         sideOrientation: 2
     }, scene);
     xz.rotation.x = Math.PI / 2;

     var gridMaterial = new BABYLON.GridMaterial("grid", scene);
     gridMaterial.mainColor = new BABYLON.Color3(0, 0, 0);
     gridMaterial.lineColor = new BABYLON.Color3(0, 0, 0);
     gridMaterial.opacity = 0.98;
     xy.material = gridMaterial;
     yz.material = gridMaterial;
     xz.material = gridMaterial;

     xy.setEnabled(false);
     yz.setEnabled(false);
     xz.setEnabled(false);
 }

 function showXYGrid(checked) {
     xy.setEnabled(checked);
 }

 function showYZGrid(checked) {
     yz.setEnabled(checked);
 }

 function showXZGrid(checked) {
     xz.setEnabled(checked);
 }

 function setXY() {
     camera.setPosition(new BABYLON.Vector3(0, 0, 400));
 }

 function setYZ() {
     camera.setPosition(new BABYLON.Vector3(400, 0, 0));
 }

 function setXZ() {
     camera.setPosition(new BABYLON.Vector3(0, 400, 0));
 }

 function stopScroll() {
     document.body.style.overflow = "hidden";
 }

 function startScroll() {
     document.body.style.overflow = "auto";
 }