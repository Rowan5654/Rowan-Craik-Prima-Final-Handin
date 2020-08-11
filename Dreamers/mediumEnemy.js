"use strict";
var Dreamers;
(function (Dreamers) {
    //subclass of superclass Enemy
    class MediumEnemy extends Dreamers.Enemy {
        //constructor
        constructor(_spawnpoint) {
            super("mediumEnemy", _spawnpoint);
            //Inital variables
            this._spawnpoint = _spawnpoint;
            this._speed = 0.08;
            this._damage = 0.2;
            this._health = 0.3;
            this._radius = 0.5;
            //node color
            let enemyMaterial = new ƒ.ComponentMaterial(Dreamers.Enemy.material);
            enemyMaterial.clrPrimary = ƒ.Color.CSS("red");
            this.addComponent(enemyMaterial);
            //node shape and scaling
            let enemyMesh = new ƒ.ComponentMesh(Dreamers.Enemy.mesh);
            this.addComponent(enemyMesh);
            enemyMesh.pivot.scale(ƒ.Vector3.ONE(this._radius));
            //adds the node to the graph
            Dreamers.viewport.getGraph().addChild(this);
        }
    }
    Dreamers.MediumEnemy = MediumEnemy;
})(Dreamers || (Dreamers = {}));
//# sourceMappingURL=mediumEnemy.js.map