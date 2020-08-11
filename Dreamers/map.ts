//The namespace
namespace Dreamers {
    import ƒAid = FudgeAid;
    
    //subclass of node superclass node
    export class Map extends ƒ.Node {
        //color
        private static material: ƒ.Material = new ƒ.Material("map", ƒ.ShaderFlat, new ƒ.CoatColored());
        //shapes of map child nodes
        private static northMeshLeft: ƒ.MeshCube = new ƒ.MeshCube();
        private static northMeshRight: ƒ.MeshCube = new ƒ.MeshCube();
        private static eastMeshTop: ƒ.MeshCube = new ƒ.MeshCube();
        private static eastMeshBottom: ƒ.MeshCube = new ƒ.MeshCube();
        private static southMeshLeft: ƒ.MeshCube = new ƒ.MeshCube();
        private static southMeshRight: ƒ.MeshCube = new ƒ.MeshCube();
        private static westMeshTop: ƒ.MeshCube = new ƒ.MeshCube();
        private static westMeshBottom: ƒ.MeshCube = new ƒ.MeshCube();

        //child nodes of map node
        private northWallLeft: ƒ.Node;
        private northWallRight: ƒ.Node;
        private eastWallTop: ƒ.Node;
        private eastWallBottom: ƒ.Node;
        private southWallLeft: ƒ.Node;
        private southWallRight: ƒ.Node;
        private westWallTop: ƒ.Node;
        private westWallBottom: ƒ.Node;

        //constructor
        constructor() {
            super("map");

            //Translation of the node
            this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(new ƒ.Vector3(0, 0, 0))));
            
            //child nodes definitions
            this.northWallLeft = new ƒAid.Node("north", ƒ.Matrix4x4.IDENTITY(), Map.material, Map.northMeshLeft);
            this.northWallRight = new ƒAid.Node("north", ƒ.Matrix4x4.IDENTITY(), Map.material, Map.northMeshRight);
            this.eastWallTop =  new ƒAid.Node("north", ƒ.Matrix4x4.IDENTITY(), Map.material, Map.eastMeshTop);
            this.eastWallBottom =  new ƒAid.Node("north", ƒ.Matrix4x4.IDENTITY(), Map.material, Map.eastMeshBottom);
            this.southWallLeft = new ƒAid.Node("north", ƒ.Matrix4x4.IDENTITY(), Map.material, Map.southMeshLeft);
            this.southWallRight = new ƒAid.Node("north", ƒ.Matrix4x4.IDENTITY(), Map.material, Map.southMeshRight);
            this.westWallTop = new ƒAid.Node("north", ƒ.Matrix4x4.IDENTITY(), Map.material, Map.westMeshTop);
            this.westWallBottom = new ƒAid.Node("north", ƒ.Matrix4x4.IDENTITY(), Map.material, Map.westMeshBottom);

            //North Wall position and scaling
            let northMatrixLeft: ƒ.Matrix4x4 = this.northWallLeft.getComponent(ƒ.ComponentMesh).pivot;
            northMatrixLeft.scale(new ƒ.Vector3(1, 3, 6));
            northMatrixLeft.translate(new ƒ.Vector3(7.5, 0, -0.75));

            let northMatrixRight: ƒ.Matrix4x4 = this.northWallRight.getComponent(ƒ.ComponentMesh).pivot;
            northMatrixRight.scale(new ƒ.Vector3(1, 3, 6));
            northMatrixRight.translate(new ƒ.Vector3(7.5, 0, 0.75));
            
            //East Wall position and scaling
            let eastMatrixTop: ƒ.Matrix4x4 = this.eastWallTop.getComponent(ƒ.ComponentMesh).pivot;
            eastMatrixTop.scale(new ƒ.Vector3(6, 3, 1));
            eastMatrixTop.translate(new ƒ.Vector3(0.75, 0, 7.5));

            let eastMatrixBottom: ƒ.Matrix4x4 = this.eastWallBottom.getComponent(ƒ.ComponentMesh).pivot;
            eastMatrixBottom.scale(new ƒ.Vector3(6, 3, 1));
            eastMatrixBottom.translate(new ƒ.Vector3(-0.75, 0, 7.5));

            //South Wall position and scaling
            let southMatrixLeft: ƒ.Matrix4x4 = this.southWallLeft.getComponent(ƒ.ComponentMesh).pivot;
            southMatrixLeft.scale(new ƒ.Vector3(1, 3, 6));
            southMatrixLeft.translate(new ƒ.Vector3(-7.5, 0, -0.75));

            let southMatrixRight: ƒ.Matrix4x4 = this.southWallRight.getComponent(ƒ.ComponentMesh).pivot;
            southMatrixRight.scale(new ƒ.Vector3(1, 3, 6));
            southMatrixRight.translate(new ƒ.Vector3(-7.5, 0, 0.75));

            //West Wall position and scaling
            let westMatrixTop: ƒ.Matrix4x4 = this.westWallTop.getComponent(ƒ.ComponentMesh).pivot;
            westMatrixTop.scale(new ƒ.Vector3(6, 3, 1));
            westMatrixTop.translate(new ƒ.Vector3(0.75, 0, -7.5));

            let westMatrixBottom: ƒ.Matrix4x4 = this.westWallBottom.getComponent(ƒ.ComponentMesh).pivot;
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
            viewport.getGraph().addChild(this);
        }
    }
}