"use strict";
var Dreamers;
(function (Dreamers) {
    var ƒAid = FudgeAid;
    //Subclass of Enemy superclass
    let Boss = /** @class */ (() => {
        class Boss extends Dreamers.Enemy {
            //Constructor
            constructor(_spawnpoint) {
                super("boss", _spawnpoint);
                this.material = new ƒ.Material("player", ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("black")));
                //The time between shots
                this.rateOfFire = 45;
                //The countdown to the next shot
                this.reload = 0;
                //The boss's bullets
                this.enemyBullets = [];
                //Initial variables
                this._speed = 0.05;
                this._damage = 1;
                this._health = 3;
                this._radius = 0.5;
                //This nodes child nodes
                this.body = new ƒAid.Node("body", ƒ.Matrix4x4.IDENTITY(), this.material, Boss.bodyMesh);
                this.horizontalGun = new ƒAid.Node("gun", ƒ.Matrix4x4.IDENTITY(), new ƒ.Material("boss", ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("black"))), Dreamers.Enemy.mesh);
                this.verticalGun = new ƒAid.Node("gun", ƒ.Matrix4x4.IDENTITY(), new ƒ.Material("boss", ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("black"))), Dreamers.Enemy.mesh);
                this.diagonalGun1 = new ƒAid.Node("gun", ƒ.Matrix4x4.IDENTITY(), new ƒ.Material("boss", ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("black"))), Dreamers.Enemy.mesh);
                this.diagonalGun2 = new ƒAid.Node("gun", ƒ.Matrix4x4.IDENTITY(), new ƒ.Material("boss", ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("black"))), Dreamers.Enemy.mesh);
                //The child node's positions and scaling
                let bodyMatrix = this.body.getComponent(ƒ.ComponentMesh).pivot;
                bodyMatrix.scale(ƒ.Vector3.ONE(this._radius));
                let horizontalMatrix = this.horizontalGun.getComponent(ƒ.ComponentMesh).pivot;
                horizontalMatrix.scale(new ƒ.Vector3(0.1, 0.1, 0.9));
                let verticalMatrix = this.verticalGun.getComponent(ƒ.ComponentMesh).pivot;
                verticalMatrix.scale(new ƒ.Vector3(0.9, 0.1, 0.1));
                let diagonalMatrix1 = this.diagonalGun1.getComponent(ƒ.ComponentMesh).pivot;
                diagonalMatrix1.scale(new ƒ.Vector3(0.9, 0.1, 0.1));
                diagonalMatrix1.rotate(new ƒ.Vector3(0, 135, 0), true);
                let diagonalMatrix2 = this.diagonalGun2.getComponent(ƒ.ComponentMesh).pivot;
                diagonalMatrix2.scale(new ƒ.Vector3(0.9, 0.1, 0.1));
                diagonalMatrix2.rotate(new ƒ.Vector3(0, 45, 0), true);
                //Adding all child nodes to the parent node
                this.addChild(this.body);
                this.addChild(this.horizontalGun);
                this.addChild(this.verticalGun);
                this.addChild(this.diagonalGun1);
                this.addChild(this.diagonalGun2);
                //Adding all gun nodes to the body node
                this.body.addChild(this.horizontalGun);
                this.body.addChild(this.verticalGun);
                this.body.addChild(this.diagonalGun1);
                this.body.addChild(this.diagonalGun2);
                //Adding the entire node to the graph
                Dreamers.viewport.getGraph().addChild(this);
            }
            //Instructs the Node when to move, shoot and reload
            update(player) {
                //If the boss has just spawned into the game it will move it into the arena 
                switch (this._spawnpoint) {
                    //1 = top entrance
                    case 1:
                        if (this.mtxLocal.translation.x >= 4) {
                            this.mtxLocal.translateX(-this._speed);
                        }
                        else {
                            this._spawnpoint = 5;
                        }
                        break;
                    //2 = right entrance
                    case 2:
                        if (this.mtxLocal.translation.z >= 4) {
                            this.mtxLocal.translateZ(-this._speed);
                        }
                        else {
                            this._spawnpoint = 5;
                        }
                        break;
                    case 3:
                        //3 = bottom entrance
                        if (this.mtxLocal.translation.x <= -4) {
                            this.mtxLocal.translateX(this._speed);
                        }
                        else {
                            this._spawnpoint = 5;
                        }
                        break;
                    //4 = left entrance
                    case 4:
                        if (this.mtxLocal.translation.z <= -4) {
                            this.mtxLocal.translateZ(this._speed);
                        }
                        else {
                            this._spawnpoint = 5;
                        }
                        break;
                    //Once the boss has entered the arena, it will move in a clockwise direction around the arena
                    case 5:
                        if (Math.round(this.mtxLocal.translation.x) == 4 && this.mtxLocal.translation.z < 4) {
                            this.mtxLocal.translateZ(this._speed);
                        }
                        if (Math.round(this.mtxLocal.translation.z) == 4 && this.mtxLocal.translation.x > -4) {
                            this.mtxLocal.translateX(-this._speed);
                        }
                        if (Math.round(this.mtxLocal.translation.x) == -4 && this.mtxLocal.translation.z > -4) {
                            this.mtxLocal.translateZ(-this._speed);
                        }
                        if (Math.round(this.mtxLocal.translation.z) == -4 && this.mtxLocal.translation.x < 4) {
                            this.mtxLocal.translateX(this._speed);
                        }
                        break;
                }
                //Once the boss has enters the arena, it will continuously shoot bullets in multiple directions.
                if (this._spawnpoint == 5) {
                    //Checks if the boss has reloaded...
                    if (this.reload == 0) {
                        //Creates the 8 Bullets that will be shot out in 8 different directions 
                        let leftBullet = new Dreamers.Bullet(this.mtxLocal.translation, new ƒ.Vector3(0, 0, this.mtxLocal.translation.z - 1));
                        let rightBullet = new Dreamers.Bullet(this.mtxLocal.translation, new ƒ.Vector3(0, 0, this.mtxLocal.translation.z + 1));
                        let topBullet = new Dreamers.Bullet(this.mtxLocal.translation, new ƒ.Vector3(this.mtxLocal.translation.x + 1, 0, 0));
                        let bottomBullet = new Dreamers.Bullet(this.mtxLocal.translation, new ƒ.Vector3(this.mtxLocal.translation.x - 1, 0, 0));
                        let topLeftBullet = new Dreamers.Bullet(this.mtxLocal.translation, new ƒ.Vector3(this.mtxLocal.translation.x + 1, 0, this.mtxLocal.translation.z - 1));
                        let topRightBullet = new Dreamers.Bullet(this.mtxLocal.translation, new ƒ.Vector3(this.mtxLocal.translation.x + 1, 0, this.mtxLocal.translation.z + 1));
                        let bottomLeftBullet = new Dreamers.Bullet(this.mtxLocal.translation, new ƒ.Vector3(this.mtxLocal.translation.x - 1, 0, this.mtxLocal.translation.z - 1));
                        let bottomRightBullet = new Dreamers.Bullet(this.mtxLocal.translation, new ƒ.Vector3(this.mtxLocal.translation.x - 1, 0, this.mtxLocal.translation.z + 1));
                        //Pushes all newly created bullets into the boss's private array of bullets
                        this.enemyBullets.push(leftBullet, rightBullet, topBullet, bottomBullet, topLeftBullet, topRightBullet, bottomLeftBullet, bottomRightBullet);
                        //Resets the reload counter
                        this.reload = this.rateOfFire;
                    }
                    else {
                        //If the boss hasn't finished reloading, continue counting down the reload timer.
                        this.reload -= 1;
                    }
                    //Checks if any of the bullets in the boss's bullet array are colliding with the player.
                    for (let i = 0; i < this.enemyBullets.length; i++) {
                        //Runs the update method for each bullet, moving them forwards
                        this.enemyBullets[i].update();
                        //Checks the bullets translation with the players
                        if (this.enemyBullets[i].mtxLocal.translation.x <= (player.mtxLocal.translation.x + player.getRadius()) && this.enemyBullets[i].mtxLocal.translation.x >= (player.mtxLocal.translation.x - player.getRadius())
                            && this.enemyBullets[i].mtxLocal.translation.z <= (player.mtxLocal.translation.z + player.getRadius()) && this.enemyBullets[i].mtxLocal.translation.z >= (player.mtxLocal.translation.z - player.getRadius())) {
                            //If there is a collision, reduce the player health
                            player.setHealth(player.getHealth() - this.enemyBullets[i].getDamage());
                            //Remove the bullet from the graph and the boss's list of bullets
                            Dreamers.viewport.getGraph().removeChild(this.enemyBullets[i]);
                            this.enemyBullets.splice(i, 1);
                        }
                    }
                }
            }
            //Sets the boss's health and determins the color of the boss's body depending on it's health.
            setHealth(health) {
                //Checks the boss has enetered the arena
                //Before the boss enters the arena, it is invincible.
                if (this._spawnpoint == 5) {
                    this._health = health;
                    //Creates the material that will replace the current material 
                    let newMaterial;
                    //Defines the new material depending on the bosses new health value.
                    if (this._health >= 2.5) {
                        newMaterial = new ƒ.ComponentMaterial(new ƒ.Material("boss", ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("black"))));
                    }
                    if (this._health < 2.5 && this._health >= 2) {
                        newMaterial = new ƒ.ComponentMaterial(new ƒ.Material("boss", ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("dimgrey"))));
                    }
                    else if (this._health < 2 && this._health >= 1.5) {
                        newMaterial = new ƒ.ComponentMaterial(new ƒ.Material("boss", ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("gray"))));
                        this.rateOfFire = 30;
                    }
                    else if (this._health < 1.5 && this._health >= 1) {
                        newMaterial = new ƒ.ComponentMaterial(new ƒ.Material("boss", ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("darkgray"))));
                    }
                    else if (this._health < 1 && this._health >= 0.5) {
                        newMaterial = new ƒ.ComponentMaterial(new ƒ.Material("boss", ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("lightgray"))));
                        this.rateOfFire = 15;
                    }
                    else if (this._health < 0.5) {
                        newMaterial = new ƒ.ComponentMaterial(new ƒ.Material("boss", ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("gainsboro"))));
                    }
                    //Sets the current material in a new variable. Removes it. And then adds the new material
                    let oldBodyColor = this.body.getComponent(ƒ.ComponentMaterial);
                    this.body.removeComponent(oldBodyColor);
                    this.body.addComponent(newMaterial);
                }
            }
        }
        //Initial variables
        //The node's color
        Boss.bodyMesh = new ƒ.MeshSphere(40, 16);
        return Boss;
    })();
    Dreamers.Boss = Boss;
})(Dreamers || (Dreamers = {}));
//# sourceMappingURL=boss.js.map