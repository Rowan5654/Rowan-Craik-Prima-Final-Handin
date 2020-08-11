namespace Dreamers {
    import ƒAid = FudgeAid;

    //subclass of superclass node
    export class Player extends ƒ.Node {
        //Initial Variables
        
        //color and shape 
        private static bodyMesh: ƒ.MeshSphere = new ƒ.MeshSphere(40, 16);
        private static gunMesh: ƒ.MeshCube = new ƒ.MeshCube();
        private material: ƒ.Material = new ƒ.Material("player", ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("mediumseagreen")));

        private _health: number = 1;
        private _speed: number = 0.1;
        private _points: number = 0;
        private _radius: number = 0.5;

        //child node parts
        private body: ƒ.Node;
        private gun: ƒ.Node;

        private isDead: boolean = false;

        public constructor() {
            super("Player");

            //child nodes
            this.body = new ƒAid.Node("body", ƒ.Matrix4x4.IDENTITY(), this.material, Player.bodyMesh);
            this.gun = new ƒAid.Node("gun", ƒ.Matrix4x4.IDENTITY(), new ƒ.Material("player", ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("indigo"))), Player.gunMesh);

            //position and scaling of child nodes
            let bodyMatrix: ƒ.Matrix4x4 = this.body.getComponent(ƒ.ComponentMesh).pivot;
            bodyMatrix.scale(ƒ.Vector3.ONE(this._radius));
            
            let gunMatrix: ƒ.Matrix4x4 = this.gun.getComponent(ƒ.ComponentMesh).pivot;
            gunMatrix.scale(new ƒ.Vector3(0.3, 0.1, 0.1));
            gunMatrix.translateX(0.9);
            this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.ZERO())));  

            //adds child nodes to the parent node
            this.addChild(this.body);
            this.addChild(this.gun);
            this.body.addChild(this.gun);

            //adds parent node to the graph
            viewport.getGraph().addChild(this);
        }

        //checks if the player should be dead and updates the points and health information in the html
        public update(camera: ƒ.ComponentCamera): boolean {
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
            } else {
                return false;
            } 
        }///-------end of function-------

        //rotates the node in the direction of the mouse click
        public lookTowards(pointOfIntersection: ƒ.Vector3): void {
            let gunAimDirection: ƒ.Vector3 = this.mtxWorld.translation.copy;

            gunAimDirection.subtract(pointOfIntersection);

            this.body.mtxLocal.lookAt(gunAimDirection);
            this.body.mtxLocal.rotateY(90);
        }

        //moves the player downwards once they are out of health
        public gameOver(): void {
            this.mtxLocal.translateY(-this._speed / 6);
        }

        //getters
        public getPoints(): number {
            return this._points;
        }

        public getRadius(): number {
            return this._radius;
        }

        public getHealth(): number {
            return this._health;
        }

        //setters
        public setPoints(points: number): void {
            this._points = points;
        }

        public setHealth(health: number): void {
            this._health = health;

             //Creates the material that will replace the current material 
            let newMaterial: ƒ.ComponentMaterial;

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
            let oldBodyColor: ƒ.ComponentMaterial = this.body.getComponent(ƒ.ComponentMaterial);
            this.body.removeComponent(oldBodyColor);
            this.body.addComponent(newMaterial);
        }

        //Translates the player depending on what button is pushed.
        private move(camera: ƒ.ComponentCamera): void {
            //the players current position
            let position: ƒ.Matrix4x4 = this.mtxLocal;
            
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
        }///-------end of function-------
    }
}