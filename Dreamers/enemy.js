"use strict";
var Dreamers;
(function (Dreamers) {
    //Subclass Enemy of superclass Node
    let Enemy = /** @class */ (() => {
        class Enemy extends ƒ.Node {
            //constructor
            constructor(name, _spawnpoint) {
                super(name);
                //Prevents the enemy from hitting the player every frame
                this.hitRecharge = 0;
                this._spawnpoint = _spawnpoint;
                switch (_spawnpoint) {
                    //1 = top entrance     
                    case 1:
                        this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(new ƒ.Vector3(8, 0, 0))));
                        break;
                    //2 = right entrance
                    case 2:
                        this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(new ƒ.Vector3(0, 0, 8))));
                        break;
                    //3 = bottom entrance
                    case 3:
                        this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(new ƒ.Vector3(-8, 0, 0))));
                        break;
                    //4 = left entrance
                    case 4:
                        this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(new ƒ.Vector3(0, 0, -8))));
                        break;
                }
                //Adds the node to the graph
                Dreamers.viewport.getGraph().addChild(this);
            }
            update(player) {
                //makes sure the enemy is 7.25 units away from the center of the arena before it begins moving toward the player
                switch (this._spawnpoint) {
                    //1 = top entrance
                    case 1:
                        if (this.mtxLocal.translation.x >= 6.5) {
                            this.mtxLocal.translateX(-this._speed);
                        }
                        else {
                            this._spawnpoint = 5;
                        }
                        break;
                    //2 = right entrance
                    case 2:
                        if (this.mtxLocal.translation.z >= 6.5) {
                            this.mtxLocal.translateZ(-this._speed);
                        }
                        else {
                            this._spawnpoint = 5;
                        }
                        break;
                    //3 = bottom entrance
                    case 3:
                        if (this.mtxLocal.translation.x <= -6.5) {
                            this.mtxLocal.translateX(this._speed);
                        }
                        else {
                            this._spawnpoint = 5;
                        }
                        break;
                    //4 = left entrance
                    case 4:
                        if (this.mtxLocal.translation.z <= -6.5) {
                            this.mtxLocal.translateZ(this._speed);
                        }
                        else {
                            this._spawnpoint = 5;
                        }
                        break;
                    //Once the enemy has entered the arena, it will move towards the player.
                    //The enemy will remain stationary if it is still recovering from hitting the player
                    case 5:
                        if (this.hitRecharge == 0) {
                            this.mtxLocal.lookAt(player.mtxLocal.translation);
                            this.mtxLocal.translateZ(this._speed);
                        }
                        else {
                            this.hitRecharge -= 1;
                        }
                        break;
                }
            }
            //Checks if the enemy has collided with the player
            collisionCheck(player) {
                //Compares the enemy's position with the player's radius
                if (this.mtxLocal.translation.x <= (player.mtxLocal.translation.x + 0.5) && this.mtxLocal.translation.x >= (player.mtxLocal.translation.x - 0.5)
                    && this.mtxLocal.translation.z <= (player.mtxLocal.translation.z + 0.5) && this.mtxLocal.translation.z >= (player.mtxLocal.translation.z - 0.5) && this.hitRecharge == 0) {
                    //If there is a collision, begin the hit recharge.
                    this.hitRecharge = 20;
                    return true;
                }
                else {
                    return false;
                }
            }
            //Getters
            getDamage() {
                return this._damage;
            }
            getRadius() {
                return this._radius;
            }
            getHealth() {
                return this._health;
            }
            //Setters
            setHealth(health) {
                this._health = health;
            }
        }
        //Initial Variables
        //Node color 
        Enemy.material = new ƒ.Material("Enemy", ƒ.ShaderFlat, new ƒ.CoatColored());
        //Node shape
        Enemy.mesh = new ƒ.MeshCube();
        return Enemy;
    })();
    Dreamers.Enemy = Enemy;
})(Dreamers || (Dreamers = {}));
//# sourceMappingURL=enemy.js.map