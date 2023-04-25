import * as BABYLON from "babylonjs"
let createScene = function (canvas) {
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
  
  let gizmo = new BABYLON.PositionGizmo(utilLayer);

  gizmo.updateGizmoPositionToMatchAttachedMesh = true;

  let currentMesh;

  let pointerDown = function (mesh) {
    currentMesh = mesh;
    gizmo.attachedMesh = sphere
  }

  scene.onPointerObservable.add((pointerInfo) => {      		
  switch (pointerInfo.type) {
    case BABYLON.PointerEventTypes.POINTERDOWN:
      if(pointerInfo.pickInfo.hit && pointerInfo.pickInfo.pickedMesh != ground) {
        pointerDown(pointerInfo.pickInfo.pickedMesh)
        pointerInfo.pickInfo.pickedMesh.material.diffuseColor = BABYLON.Color3.Green();
      }
      else{
        gizmo.attachedMesh = null
        sphere.material = new BABYLON.StandardMaterial("box_mat", scene);
      }
      break;
    }
  });
  
  engine.runRenderLoop(() => {
    scene.render();
  });
};
export { createScene };