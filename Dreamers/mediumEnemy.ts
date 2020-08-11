namespace Dreamers {
    //subclass of superclass Enemy
    export class MediumEnemy extends Enemy {

        //constructor
        public constructor(_spawnpoint: number) {
            super("mediumEnemy", _spawnpoint);

            //Inital variables
            this._spawnpoint = _spawnpoint;
            this._speed = 0.08;
            this._damage = 0.2;
            this._health = 0.3;
            this._radius = 0.5;

            //node color
            let enemyMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(Enemy.material);
            enemyMaterial.clrPrimary = ƒ.Color.CSS("red");
            this.addComponent(enemyMaterial);

            //node shape and scaling
            let enemyMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(Enemy.mesh);
            this.addComponent(enemyMesh);
            enemyMesh.pivot.scale(ƒ.Vector3.ONE(this._radius));

            //adds the node to the graph
            viewport.getGraph().addChild(this);
        }
    }
}