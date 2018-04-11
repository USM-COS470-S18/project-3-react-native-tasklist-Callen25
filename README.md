# project-3-react-native-tasklist-Callen25
project-3-react-native-tasklist-Callen25 created by GitHub Classroom

#Usage
Adding a Task:
1. Press the add button in the upper right
2. Fill out the form on this screen with your task info
3. Press save to add this to your task list, or the back arrow to cancel and go back

Editing a Task:
1. Press a task you wish to edit
2. On this screen edit any of the details you wish
3. Press save to save this new version, or the back arrow to cancel and go back
*A task can be marked completed on the main screen by checking off the checkbox

#Running the app
To run this app you need react native installed on your computer.
You can run using either 'react-native run-ios' or 'react-native run-android'
*Note: This was made and tested on ios using the iphone 6 emulator

#Lessons learned
This project mainly taught me how react, in general, works. For instance, when you call setState(),
the render method is called over again. So I learned that it is best to call this as little as possible
so that performance is maximized. Also, if you call setState() in the render method without any conditional
for its running, you will be stuck in an infinite loop since you are effectively in an endlessly recursive 
method. I also learned how easy and useful it can be in react to add packages. I used yarn as my package 
manager because I had some issues with npm previously, but it is still very useful.

