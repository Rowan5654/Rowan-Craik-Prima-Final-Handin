//The namespace
namespace Dreamers {
    export class Bullet extends ƒ.Node {
        //Initial variables
        //The nodes color
        private static material: ƒ.Material = new ƒ.Material("Bullet", ƒ.ShaderFlat, new ƒ.CoatColored());
        //The nodes shape
        private static mesh: ƒ.MeshCube = new ƒ.MeshCube();

        private _speed: number = 0.2;
        private _damage: number = 0.1;

        //constructor
        constructor(_startPoint: ƒ.Vector3, direction: ƒ.Vector3) {
            super("bullet");
            
            //Sets the nodes color
            let bulletMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(Bullet.material);
            bulletMaterial.clrPrimary = ƒ.Color.CSS("blue");
            this.addComponent(bulletMaterial);

            //Sets the nodes inital position in the world
            this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(_startPoint)));

            //Sets the nodes shape and scale
            let bulletMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(Bullet.mesh);
            this.addComponent(bulletMesh);
            bulletMesh.pivot.scale(ƒ.Vector3.ONE(0.1));

            //Directs the node in which direction it will be moving
            this.mtxLocal.lookAt(direction);

            //Adds the node to the graph
            viewport.getGraph().addChild(this);
        }///-------end of function-------

        //Moves the bullet
        public update(): boolean {
            this.mtxLocal.translateZ(this._speed);

            //If the bullet reaches the edge of the arena, remove it from the graph
            if (this.mtxLocal.translation.z > 7.5 || this.mtxLocal.translation.z < -7.5 || this.mtxLocal.translation.x > 7.5 || this.mtxLocal.translation.x < -7.5) {
              viewport.getGraph().removeChild(this);
              return true;
            }
            return false;
        }///-------end of function-------
        
        //Checks if the bullet has made a collision with the enemy
        public collisionCheck(enemy: Enemy, enemyRadius: number): boolean {
            //compares the bullets position with the enemy's radius
            if (this.mtxLocal.translation.x <= (enemy.mtxLocal.translation.x + enemyRadius) && this.mtxLocal.translation.x >= (enemy.mtxLocal.translation.x - enemyRadius)
                && this.mtxLocal.translation.z <= (enemy.mtxLocal.translation.z + enemyRadius) && this.mtxLocal.translation.z >= (enemy.mtxLocal.translation.z - enemyRadius)) {
                    //If there is a collision, remove the bullet from the graph
                    viewport.getGraph().removeChild(this);
                    return true;
            } else {
                return false;
            }
        }

        //returns the bullets damage
        public getDamage(): number {
            return this._damage;
        }
    }
}