"use strict";
//The namespace
var Dreamers;
//The namespace
(function (Dreamers) {
    let Bullet = /** @class */ (() => {
        class Bullet extends ƒ.Node {
            //constructor
            constructor(_startPoint, direction) {
                super("bullet");
                this._speed = 0.2;
                this._damage = 0.1;
                //Sets the nodes color
                let bulletMaterial = new ƒ.ComponentMaterial(Bullet.material);
                bulletMaterial.clrPrimary = ƒ.Color.CSS("blue");
                this.addComponent(bulletMaterial);
                //Sets the nodes inital position in the world
                this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(_startPoint)));
                //Sets the nodes shape and scale
                let bulletMesh = new ƒ.ComponentMesh(Bullet.mesh);
                this.addComponent(bulletMesh);
                bulletMesh.pivot.scale(ƒ.Vector3.ONE(0.1));
                //Directs the node in which direction it will be moving
                this.mtxLocal.lookAt(direction);
                //Adds the node to the graph
                Dreamers.viewport.getGraph().addChild(this);
            } ///-------end of function-------
            //Moves the bullet
            update() {
                this.mtxLocal.translateZ(this._speed);
                //If the bullet reaches the edge of the arena, remove it from the graph
                if (this.mtxLocal.translation.z > 7.5 || this.mtxLocal.translation.z < -7.5 || this.mtxLocal.translation.x > 7.5 || this.mtxLocal.translation.x < -7.5) {
                    Dreamers.viewport.getGraph().removeChild(this);
                    return true;
                }
                return false;
            } ///-------end of function-------
            //Checks if the bullet has made a collision with the enemy
            collisionCheck(enemy, enemyRadius) {
                //compares the bullets position with the enemy's radius
                if (this.mtxLocal.translation.x <= (enemy.mtxLocal.translation.x + enemyRadius) && this.mtxLocal.translation.x >= (enemy.mtxLocal.translation.x - enemyRadius)
                    && this.mtxLocal.translation.z <= (enemy.mtxLocal.translation.z + enemyRadius) && this.mtxLocal.translation.z >= (enemy.mtxLocal.translation.z - enemyRadius)) {
                    //If there is a collision, remove the bullet from the graph
                    Dreamers.viewport.getGraph().removeChild(this);
                    return true;
                }
                else {
                    return false;
                }
            }
            //returns the bullets damage
            getDamage() {
                return this._damage;
            }
        }
        //Initial variables
        //The nodes color
        Bullet.material = new ƒ.Material("Bullet", ƒ.ShaderFlat, new ƒ.CoatColored());
        //The nodes shape
        Bullet.mesh = new ƒ.MeshCube();
        return Bullet;
    })();
    Dreamers.Bullet = Bullet;
})(Dreamers || (Dreamers = {}));
//# sourceMappingURL=bullet.js.map