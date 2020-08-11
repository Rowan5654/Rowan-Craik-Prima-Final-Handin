"use strict";
var Dreamers;
(function (Dreamers) {
    //Subclass of Enemy Superclass
    class SmallEnemy extends Dreamers.Enemy {
        //constructor
        constructor(_spawnpoint) {
            super("smallEnemy", _spawnpoint);
            //Initial variables
            this._spawnpoint = _spawnpoint;
            this._speed = 0.12;
            this._damage = 0.1;
            this._health = 0.1;
            this._radius = 0.3;
            //The node's color
            let enemyMaterial = new ƒ.ComponentMaterial(Dreamers.Enemy.material);
            enemyMaterial.clrPrimary = ƒ.Color.CSS("tomato");
            this.addComponent(enemyMaterial);
            //The shape and scaling of the enemy
            let enemyMesh = new ƒ.ComponentMesh(Dreamers.Enemy.mesh);
            this.addComponent(enemyMesh);
            enemyMesh.pivot.scale(ƒ.Vector3.ONE(this._radius));
            //adds the node to the graph
            Dreamers.viewport.getGraph().addChild(this);
        }
    }
    Dreamers.SmallEnemy = SmallEnemy;
})(Dreamers || (Dreamers = {}));
//# sourceMappingURL=smallEnemy.js.map