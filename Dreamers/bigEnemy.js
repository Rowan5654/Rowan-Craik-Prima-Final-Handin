"use strict";
var Dreamers;
(function (Dreamers) {
    //Subclass of Enemy superclass
    class BigEnemy extends Dreamers.Enemy {
        //constructor
        constructor(_spawnpoint) {
            super("bigEnemy", _spawnpoint);
            //initial variables
            this._spawnpoint = _spawnpoint;
            this._speed = 0.06;
            this._damage = 0.3;
            this._health = 0.5;
            this._radius = 0.7;
            //Node color
            let enemyMaterial = new ƒ.ComponentMaterial(Dreamers.Enemy.material);
            enemyMaterial.clrPrimary = ƒ.Color.CSS("darkred");
            this.addComponent(enemyMaterial);
            //Node shape
            let enemyMesh = new ƒ.ComponentMesh(Dreamers.Enemy.mesh);
            this.addComponent(enemyMesh);
            enemyMesh.pivot.scale(ƒ.Vector3.ONE(this._radius));
            Dreamers.viewport.getGraph().addChild(this);
        }
    }
    Dreamers.BigEnemy = BigEnemy;
})(Dreamers || (Dreamers = {}));
//# sourceMappingURL=bigEnemy.js.map