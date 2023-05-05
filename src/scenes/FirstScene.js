import * as BABYLON from "babylonjs"
const myScene = {
  gizmo: null,
  utilLayer: null,
  currentMesh: null,
  createScene: function (canvas) {
    const engine = new BABYLON.Engine(canvas);
    let scene = new BABYLON.Scene(engine);
  
    let camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
  
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);
  
    let light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;
  
    let sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene);
    sphere.position.y = 1;
    sphere.material = new BABYLON.StandardMaterial("box_mat", scene);
  
    let ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene);
  
    let utilLayer = new BABYLON.UtilityLayerRenderer(scene);
  
    let currentMesh;
  
    let gizmo = null
    
    let pointerDown = function (mesh) {
      if(gizmo){
        currentMesh = mesh;
        gizmo.attachedMesh = currentMesh
      }
    }
  
    scene.onPointerObservable.add((pointerInfo) => {      		
    switch (pointerInfo.type) {
      case BABYLON.PointerEventTypes.POINTERDOWN:
        if(pointerInfo.pickInfo.hit && pointerInfo.pickInfo.pickedMesh != ground) {
          pointerDown(pointerInfo.pickInfo.pickedMesh)
          pointerInfo.pickInfo.pickedMesh.material.diffuseColor = BABYLON.Color3.Green();
          currentMesh = pointerInfo.pickInfo.pickedMesh
        }
        else{
          if(gizmo && gizmo.attachedMesh)
            gizmo.attachedMesh = null
          currentMesh = null
          sphere.material = new BABYLON.StandardMaterial("box_mat", scene);
        }
        break;
      }
    });
    
    engine.runRenderLoop(() => {
      scene.render();
      this.utilLayer = utilLayer
      this.currentMesh = currentMesh
      gizmo = this.gizmo
    });

  },

  ChangeGizmo: function(cur_gizmo){
    switch(cur_gizmo){
      case 'cursor':
        if(this.gizmo !== null){
          if(this.gizmo.attachedMesh !== null){
            this.gizmo.attachedMesh = null
          }
        }
        this.gizmo = null
        break
      case 'offset':
        if(this.gizmo !== null){
          if(this.gizmo.attachedMesh !== null){
            this.gizmo.attachedMesh = null
          }
        }
        this.gizmo = new BABYLON.PositionGizmo(this.utilLayer);
        this.gizmo.attachedMesh = this.currentMesh
        break
      case 'rotate':
        if(this.gizmo !== null){
          if(this.gizmo.attachedMesh !== null){
            this.gizmo.attachedMesh = null
          }
        }
        this.gizmo = new BABYLON.RotationGizmo(this.utilLayer);
        this.gizmo.attachedMesh = this.currentMesh
        break
      case 'scale':
        if(this.gizmo !== null){
          if(this.gizmo.attachedMesh !== null){
            this.gizmo.attachedMesh = null
          }
        }
        this.gizmo = new BABYLON.ScaleGizmo(this.utilLayer);
        this.gizmo.attachedMesh = this.currentMesh
        break
    }
  }
}

export { myScene };