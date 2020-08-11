namespace Dreamers {

    //Subclass Enemy of superclass Node
    export class Enemy extends ƒ.Node {
        //Initial Variables

        //Node color 
        protected static material: ƒ.Material = new ƒ.Material("Enemy", ƒ.ShaderFlat, new ƒ.CoatColored());
        //Node shape
        protected static mesh: ƒ.MeshCube = new ƒ.MeshCube();

        protected _name: string;
        protected _speed: number;
        protected _health: number;
        protected _damage: number;
        //determines what entrance of the arena the enemy will come from.
        protected _spawnpoint: number;
        protected _radius: number;

        //Prevents the enemy from hitting the player every frame
        private hitRecharge: number = 0;

        //constructor
        public constructor(name: string, _spawnpoint: number) {
            super(name);

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
            viewport.getGraph().addChild(this);
        }

        public update(player: ƒ.Node): void {
            //makes sure the enemy is 7.25 units away from the center of the arena before it begins moving toward the player
            switch (this._spawnpoint) {
                //1 = top entrance
                case 1: 
                    if (this.mtxLocal.translation.x >= 6.5) {
                        this.mtxLocal.translateX(-this._speed);
                    } else {
                        this._spawnpoint = 5;
                    }
                    break;
                //2 = right entrance
                case 2:
                    if (this.mtxLocal.translation.z >= 6.5) {
                        this.mtxLocal.translateZ(-this._speed);
                    } else {
                        this._spawnpoint = 5;
                    }
                    break;
                //3 = bottom entrance
                case 3:
                    if (this.mtxLocal.translation.x <= -6.5) {
                        this.mtxLocal.translateX(this._speed);
                    } else {
                        this._spawnpoint = 5;
                    }
                    break;
                //4 = left entrance
                case 4:
                    if (this.mtxLocal.translation.z <= -6.5) {
                        this.mtxLocal.translateZ(this._speed);
                    } else {
                        this._spawnpoint = 5;
                    }
                    break;
                //Once the enemy has entered the arena, it will move towards the player.
                //The enemy will remain stationary if it is still recovering from hitting the player
                case 5:
                    if (this.hitRecharge == 0) {
                        this.mtxLocal.lookAt(player.mtxLocal.translation);
                        this.mtxLocal.translateZ(this._speed);
                    } else {
                        this.hitRecharge -= 1;
                    }
                    break;
            }
        }

        //Checks if the enemy has collided with the player
        public collisionCheck(player: Player): boolean {
            //Compares the enemy's position with the player's radius
            if (this.mtxLocal.translation.x <= (player.mtxLocal.translation.x + 0.5) && this.mtxLocal.translation.x >= (player.mtxLocal.translation.x - 0.5)
            && this.mtxLocal.translation.z <= (player.mtxLocal.translation.z + 0.5) && this.mtxLocal.translation.z >= (player.mtxLocal.translation.z - 0.5) && this.hitRecharge == 0) {
                //If there is a collision, begin the hit recharge.
                this.hitRecharge = 20;
                return true;
            } else {
                return false;
            }
        }

        //Getters
        public getDamage(): number {
            return this._damage;
        }

        public getRadius(): number {
            return this._radius;
        }

        public getHealth(): number {
            return this._health;
        }

        //Setters
        public setHealth(health: number): void {
            this._health = health;
        }
    }
}