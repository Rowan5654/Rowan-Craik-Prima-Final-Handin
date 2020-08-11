namespace Dreamers {
    //Subclass of Enemy Superclass
    export class SmallEnemy extends Enemy {

        //constructor
        public constructor(_spawnpoint: number) {
            super("smallEnemy", _spawnpoint);

            //Initial variables
            this._spawnpoint = _spawnpoint;
            this._speed = 0.12;
            this._damage = 0.1;
            this._health = 0.1;
            this._radius = 0.3;

            //The node's color
            let enemyMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(Enemy.material);
            enemyMaterial.clrPrimary = ƒ.Color.CSS("tomato");
            this.addComponent(enemyMaterial);

            //The shape and scaling of the enemy
            let enemyMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(Enemy.mesh);
            this.addComponent(enemyMesh);
            enemyMesh.pivot.scale(ƒ.Vector3.ONE(this._radius));

            //adds the node to the graph
            viewport.getGraph().addChild(this);
        }
    }
}