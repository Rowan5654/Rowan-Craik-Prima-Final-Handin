# Rowan-Craik-Prima-Final-Handin
Final hand in for PRIMA assignment.

Links:

finished application:
https://rowan5654.github.io/Rowan-Craik-Prima-Final-Handin/

source code and design document:
https://github.com/Rowan5654/Prima-assignment-source-design

Checklist:

| No | designation           | content  
|---:|-----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|    | Title                 | **Shooty Tower** |
|    | Name                  | Rowan Craik |
|    | Matriculation number  | 265390 |
|  1 | User interaction      | The user is able to interact with HTML buttons that effect the wave and difficulty of the application. They are also about to reset the game with these buttons. The user also uses 'w', 'a', 's', and 'd' to move thier character inside the application and uses the mouse to shoot at enemies. |
|  2 | Object interaction    | Bullets created by the player interact with enemies by removing a portion of thier health or causing them to vanish if they collide. Enemies generated a fraction of every second during each wave of the application interact with the player by removing a portion of thier health or potentially triggering a gameover if they collide |                                                                                                                                                   
|  3 | Number of objects variable | The camera, canvas, player, plane/floor, and map(walls that surround the player) are all nodes which are added to the graph as child nodes and are generated on runtime. These nodes set up the application that the user see's when they start the game. 
|  4 | Scene hierarchy       | The scene hierarchy is prepared in a way where no two nodes that are added as child nodes to the graph belong to the same parent node. All nodes that make up a parent node are set up within the constructor of the parent node, this way it's more clear to see who belongs to who and less calls are made to add a child to the graph node. The map node for example is made up of 8 child nodes, however the map is only added to the graph once all the children have been added to the parent node within the map constructor.  | 
|  5 | Sound                 | No sound has been added :( In part due to the time constraints, but also in part due to the confusion of how to implement them. |                                                  
|  6 | GUI                   | As mentioned in the user interaction section, the user has access to skipping waves, returing to previous waves, reseting the entire wave, and changing the difficulty through the use of html buttons |                                                            
|  7 | External data         | There is no external data. I'm honestly not sure how you would implement this. The closest thing to this is the reset button which allows the difficulty to stay changed from the default (easy) once the game is reset rather than just refreshing the entire page and having to change the difficulty. |
|  8 | Behavioral classes    | Each enemy type behaves differently, while 3 of the 4 enemy types simply move towards the player at all times, depending on what type they are effects their speed and health. The 4th enemy type, the boss, doesn't move towards the player, it instead moves around the arena in a set path while shooting back at the player. Enemy types are determined by a randomly generated number, but this number is affected by the current difficulty and the wave the user is on. |
|  9 | Subclasses            | Enemy is the superclass of all enemy **types** which are are subclasses, small enemy, medium enemy, large enemy, and the boss are all subclasses. |
| 10 | Dimensions & positions| All objects share the same y axis, and are placed along the x and z axis, except for the camera which is positioned above all other objects and looks down at the player, enemies, bullets and arena. All the walls that surround the player are placed 7.5 units away from the center of the world in their respective places. All the walls are scaled identically depending on if they're horizontal or vertical walls. The player is initially positioned at the centre of the world, with the camera being positioned above the player at all times. Enemies are intitially positioned in one of the four entrances to the arena. Bullets are origionally positioned wherever the player is when they are created.  |
| 11 | Event-System          | Events are used when the user presses certain keys on their keyboard or when they use the mouse. Clicking the mouse causes the MOUSE_DOWN Event to trigger, which creates an instance of a bullet, simply using 'a', 's', 'd' or 'w' KEYBOARD_DOWN Event to trigger which moves the player. Certain other events within objects are used, for example when an enemy is first created, they only move in one direction towards the centre of the world until they have entered the arena iwhich they begin moving towards the player. Another Event occurs when the player has cleared a wave, enemies will stop being created for several seconds, the wave will change, and the players health will increase. |                                                                                                                                                     
