"use strict";
//The namespace
var Dreamers;
//The namespace
(function (Dreamers) {
    var ƒAid = FudgeAid;
    //subclass of node superclass node
    let Map = /** @class */ (() => {
        class Map extends ƒ.Node {
            //constructor
            constructor() {
                super("map");
                //Translation of the node
                this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(new ƒ.Vector3(0, 0, 0))));
                //child nodes definitions
                this.northWallLeft = new ƒAid.Node("north", ƒ.Matrix4x4.IDENTITY(), Map.material, Map.northMeshLeft);
                this.northWallRight = new ƒAid.Node("north", ƒ.Matrix4x4.IDENTITY(), Map.material, Map.northMeshRight);
                this.eastWallTop = new ƒAid.Node("north", ƒ.Matrix4x4.IDENTITY(), Map.material, Map.eastMeshTop);
                this.eastWallBottom = new ƒAid.Node("north", ƒ.Matrix4x4.IDENTITY(), Map.material, Map.eastMeshBottom);
                this.southWallLeft = new ƒAid.Node("north", ƒ.Matrix4x4.IDENTITY(), Map.material, Map.southMeshLeft);
                this.southWallRight = new ƒAid.Node("north", ƒ.Matrix4x4.IDENTITY(), Map.material, Map.southMeshRight);
                this.westWallTop = new ƒAid.Node("north", ƒ.Matrix4x4.IDENTITY(), Map.material, Map.westMeshTop);
                this.westWallBottom = new ƒAid.Node("north", ƒ.Matrix4x4.IDENTITY(), Map.material, Map.westMeshBottom);
                //North Wall position and scaling
                let northMatrixLeft = this.northWallLeft.getComponent(ƒ.ComponentMesh).pivot;
                northMatrixLeft.scale(new ƒ.Vector3(1, 3, 6));
                northMatrixLeft.translate(new ƒ.Vector3(7.5, 0, -0.75));
                let northMatrixRight = this.northWallRight.getComponent(ƒ.ComponentMesh).pivot;
                northMatrixRight.scale(new ƒ.Vector3(1, 3, 6));
                northMatrixRight.translate(new ƒ.Vector3(7.5, 0, 0.75));
                //East Wall position and scaling
                let eastMatrixTop = this.eastWallTop.getComponent(ƒ.ComponentMesh).pivot;
                eastMatrixTop.scale(new ƒ.Vector3(6, 3, 1));
                eastMatrixTop.translate(new ƒ.Vector3(0.75, 0, 7.5));
                let eastMatrixBottom = this.eastWallBottom.getComponent(ƒ.ComponentMesh).pivot;
                eastMatrixBottom.scale(new ƒ.Vector3(6, 3, 1));
                eastMatrixBottom.translate(new ƒ.Vector3(-0.75, 0, 7.5));
                //South Wall position and scaling
                let southMatrixLeft = this.southWallLeft.getComponent(ƒ.ComponentMesh).pivot;
                southMatrixLeft.scale(new ƒ.Vector3(1, 3, 6));
                southMatrixLeft.translate(new ƒ.Vector3(-7.5, 0, -0.75));
                let southMatrixRight = this.southWallRight.getComponent(ƒ.ComponentMesh).pivot;
                southMatrixRight.scale(new ƒ.Vector3(1, 3, 6));
                southMatrixRight.translate(new ƒ.Vector3(-7.5, 0, 0.75));
                //West Wall position and scaling
                let westMatrixTop = this.westWallTop.getComponent(ƒ.ComponentMesh).pivot;
                westMatrixTop.scale(new ƒ.Vector3(6, 3, 1));
                westMatrixTop.translate(new ƒ.Vector3(0.75, 0, -7.5));
                let westMatrixBottom = this.westWallBottom.getComponent(ƒ.ComponentMesh).pivot;
                westMatrixBottom.scale(new ƒ.Vector3(6, 3, 1));
                westMatrixBottom.translate(new ƒ.Vector3(-0.75, 0, -7.5));
                //Map child nodes
                this.addChild(this.northWallLeft);
                this.addChild(this.northWallRight);
                this.addChild(this.eastWallTop);
                this.addChild(this.eastWallBottom);
                this.addChild(this.southWallLeft);
                this.addChild(this.southWallRight);
                this.addChild(this.westWallTop);
                this.addChild(this.westWallBottom);
                //Adds the full Node to the graph
                Dreamers.viewport.getGraph().addChild(this);
            }
        }
        //color
        Map.material = new ƒ.Material("map", ƒ.ShaderFlat, new ƒ.CoatColored());
        //shapes of map child nodes
        Map.northMeshLeft = new ƒ.MeshCube();
        Map.northMeshRight = new ƒ.MeshCube();
        Map.eastMeshTop = new ƒ.MeshCube();
        Map.eastMeshBottom = new ƒ.MeshCube();
        Map.southMeshLeft = new ƒ.MeshCube();
        Map.southMeshRight = new ƒ.MeshCube();
        Map.westMeshTop = new ƒ.MeshCube();
        Map.westMeshBottom = new ƒ.MeshCube();
        return Map;
    })();
    Dreamers.Map = Map;
})(Dreamers || (Dreamers = {}));
//# sourceMappingURL=map.js.map