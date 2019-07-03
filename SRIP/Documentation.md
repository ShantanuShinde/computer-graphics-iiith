---
# Documentation
---

**Introduction: -**
===================

This is an experiment to demonstrate the translation of a point in 3-dimensional
space. The point in the 3D space is animated to move from a given starting
position to a given destination position using a slider. The transformation
matrix that is applied on the point is also displayed.

**Functionalities: -**
======================

1.  **Coordinate Display:**

On the top of the screen is the display of the 3D coordinate system with the
axes and the point. The view can be rotated and zoomed in and out by dragging
and using scroll wheel respectively.

2.  **Manual:**

The manual is towards the right of the display. The manual contains the
instructions regarding the experiment as well as the theory of the experiment.
The manual is of 4 pages.

3.  **Current Position:**

It is the display of the current coordinates of the point. They change as the
point moves.

4.  **Transform coordinate checkbox:**

Use checkbox to select whether to translate the point or to translate the
coordinate system. If the box is unchecked then the point moves and if it is
checked then the coordinate axes moves. Checking or unchecking the checkbox also
resets the position of the point or the axes to the starting position.

5.  **Show XY Grid checkbox:**

>   Use the check box to turn the XY grid on and off.

6.  **Show YZ Grid checkbox:**

Use the check box to turn the YZ grid on and off.

7.  **Show XZ Grid checkbox:**

Use the check box to turn the XZ grid on and off.

8.  **Transformation matrix:**

Below it is the transformation matrix that is applied on the point.
Multiplication of the transformation matrix with the vector of point’s position
is one of the two ways to represent translation, other being vector addition.
The details of the transformation matrix are explained in the manual.

9.  **Slider:**

The slider is for moving the point from currently set starting position to
currently set destination position. Moving the slider forward moves the point
towards the destination and moving it back moves it away.

10.  **X, Y, Z input and Set New Destination button:**

If the destination coordinates of the point are to be changed, the new value can
be put according to the X, Y, Z values of the position into the input and then
the Set New Destination button is pressed. The default value of the destination
position is (100, 100, -300). This also resets any translation done before
changing the position. Also, this changes the values of the transformation
matrix.

11.  **X, Y, Z input and Set Starting Position button:**

This is same as previous but is for changing the starting position of the point.
To change it, put in the new coordinates in the input and click the button.
Default coordinate of starting position is (0, 0, 0). This also resets any
previous translation and changes the values of the transformation matrix.

12.  **Set XY View button:**

Sets the camera view to XY plane.

13.  **Set YZ View button:**

Sets the camera view to YZ plane.

14.  **Set XZ View button:**

Sets the camera view to XZ plane.

15.  **Reset Camera button:**

This button resets the changes made in the view of the display. The camera of
the display is set to the default position and angle. The default position of
the camera is (300, 300, 300).
