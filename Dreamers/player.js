"use strict";
var Dreamers;
(function (Dreamers) {
    var ƒAid = FudgeAid;
    //subclass of superclass node
    let Player = /** @class */ (() => {
        class Player extends ƒ.Node {
            constructor() {
                super("Player");
                this.material = new ƒ.Material("player", ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("mediumseagreen")));
                this._health = 1;
                this._speed = 0.1;
                this._points = 0;
                this._radius = 0.5;
                this.isDead = false;
                //child nodes
                this.body = new ƒAid.Node("body", ƒ.Matrix4x4.IDENTITY(), this.material, Player.bodyMesh);
                this.gun = new ƒAid.Node("gun", ƒ.Matrix4x4.IDENTITY(), new ƒ.Material("player", ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("indigo"))), Player.gunMesh);
                //position and scaling of child nodes
                let bodyMatrix = this.body.getComponent(ƒ.ComponentMesh).pivot;
                bodyMatrix.scale(ƒ.Vector3.ONE(this._radius));
                let gunMatrix = this.gun.getComponent(ƒ.ComponentMesh).pivot;
                gunMatrix.scale(new ƒ.Vector3(0.3, 0.1, 0.1));
                gunMatrix.translateX(0.9);
                this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.ZERO())));
                //adds child nodes to the parent node
                this.addChild(this.body);
                this.addChild(this.gun);
                this.body.addChild(this.gun);
                //adds parent node to the graph
                Dreamers.viewport.getGraph().addChild(this);
            }
            //checks if the player should be dead and updates the points and health information in the html
            update(camera) {
                //if the player is dead, the camera shouldn't move when the player is using the movement keys
                if (!this.isDead) {
                    this.move(camera);
                }
                //updates the html data
                document.getElementById("points").innerHTML = "Points: " + this._points;
                document.getElementById("health").innerHTML = "Health: " + Math.floor(this._health * 10);
                //checks if player should be dead
                if (this._health < 0.1) {
                    this.isDead = true;
                    return true;
                }
                else {
                    return false;
                }
            } ///-------end of function-------
            //rotates the node in the direction of the mouse click
            lookTowards(pointOfIntersection) {
                let gunAimDirection = this.mtxWorld.translation.copy;
                gunAimDirection.subtract(pointOfIntersection);
                this.body.mtxLocal.lookAt(gunAimDirection);
                this.body.mtxLocal.rotateY(90);
            }
            //moves the player downwards once they are out of health
            gameOver() {
                this.mtxLocal.translateY(-this._speed / 6);
            }
            //getters
            getPoints() {
                return this._points;
            }
            getRadius() {
                return this._radius;
            }
            getHealth() {
                return this._health;
            }
            //setters
            setPoints(points) {
                this._points = points;
            }
            setHealth(health) {
                this._health = health;
                //Creates the material that will replace the current material 
                let newMaterial;
                //Defines the new material depending on the players new health value.
                if (this._health >= 0.7) {
                    newMaterial = new ƒ.ComponentMaterial(new ƒ.Material("player", ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("mediumseagreen"))));
                }
                else if (this._health <= 0.3) {
                    newMaterial = new ƒ.ComponentMaterial(new ƒ.Material("player", ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("indianred"))));
                }
                else {
                    newMaterial = new ƒ.ComponentMaterial(new ƒ.Material("player", ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("GoldenRod"))));
                }
                //Sets the current material in a new variable. Removes it. And then adds the new material
                let oldBodyColor = this.body.getComponent(ƒ.ComponentMaterial);
                this.body.removeComponent(oldBodyColor);
                this.body.addComponent(newMaterial);
            }
            //Translates the player depending on what button is pushed.
            move(camera) {
                //the players current position
                let position = this.mtxLocal;
                if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.W])) {
                    //move up
                    if (position.translation.x < 6.5) {
                        position.translateX(this._speed);
                    }
                    //ensures the camera doesn't move upwards unless the player is in the middle of the screen
                    if (camera.pivot.translation.x <= 3 && position.translation.x >= -3) {
                        camera.pivot.translateY(this._speed);
                    }
                }
                if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A])) {
                    //move left
                    if (position.translation.z > -6.5) {
                        position.translateZ(-this._speed);
                    }
                }
                if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D])) {
                    //move right
                    if (position.translation.z < 6.5) {
                        position.translateZ(this._speed);
                    }
                }
                if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.S])) {
                    //move down
                    if (position.translation.x > -6.5) {
                        position.translateX(-this._speed);
                    }
                    //ensures the camera doesn't move downwards unless the player is in the middle of the screen
                    if (camera.pivot.translation.x >= -3 && position.translation.x <= 3) {
                        camera.pivot.translateY(-this._speed);
                    }
                }
            } ///-------end of function-------
        }
        //Initial Variables
        //color and shape 
        Player.bodyMesh = new ƒ.MeshSphere(40, 16);
        Player.gunMesh = new ƒ.MeshCube();
        return Player;
    })();
    Dreamers.Player = Player;
})(Dreamers || (Dreamers = {}));
//# sourceMappingURL=player.js.map