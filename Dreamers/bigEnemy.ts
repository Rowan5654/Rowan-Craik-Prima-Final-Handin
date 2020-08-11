namespace Dreamers {
    //Subclass of Enemy superclass
    export class BigEnemy extends Enemy {

        //constructor
        public constructor(_spawnpoint: number) {
            super("bigEnemy", _spawnpoint);

            //initial variables
            this._spawnpoint = _spawnpoint;
            this._speed = 0.06;
            this._damage = 0.3;
            this._health = 0.5;
            this._radius = 0.7;

            //Node color
            let enemyMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(Enemy.material);
            enemyMaterial.clrPrimary = ƒ.Color.CSS("darkred");
            this.addComponent(enemyMaterial);

            //Node shape
            let enemyMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(Enemy.mesh);
            this.addComponent(enemyMesh);
            enemyMesh.pivot.scale(ƒ.Vector3.ONE(this._radius));

            viewport.getGraph().addChild(this);
        }
    }
}