import * as BABYLON from "babylonjs"

const myScene = {

  //Переменные 
  action: null,
  MainMesh: null,
  AbstractMesh: null,
  gizmo: null,
  utilLayer: null,
  currentMesh: null,

  createScene: function (canvas) {
    const engine = new BABYLON.Engine(canvas);

    let action

    let scene = new BABYLON.Scene(engine);
  
    let camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
  
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);
  
    let light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;
  
    let sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene);
    let sphereAbstract = new BABYLON.AbstractMesh("sphereAbstract", scene); //Абстрактрая сфера
    sphereAbstract.position.y = 1
    sphere.parent = sphereAbstract
    sphere.material = new BABYLON.StandardMaterial("box_mat", scene);
  
    let ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene);
  
    let utilLayer = new BABYLON.UtilityLayerRenderer(scene);
  
    let currentMesh;
  
    let gizmo = null
    
    let pointerDown = function (mesh) {
      if(gizmo){
        currentMesh = mesh;
        if(action != 'rotate')
          gizmo.attachedMesh = currentMesh
        else
          gizmo.attachedMesh = sphereAbstract
      }
    }
  
    //Слушатель кликов
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
      this.AbstractMesh = sphereAbstract
      this.utilLayer = utilLayer
      this.currentMesh = currentMesh
      gizmo = this.gizmo
      action = this.action
    });

  },

  //Функция которая меняет gizmo
  ChangeGizmo: function(cur_gizmo){
    switch(cur_gizmo){
      case 'cursor':
        this.action = 'cursor'
        this.gizmo.attachedMesh = null
        this.gizmo = null
        break
      case 'offset':
        this.action = 'offset'
        this.ClearGizmo(this.gizmo)
        this.gizmo = new BABYLON.PositionGizmo(this.utilLayer);
        if(this.currentMesh){
          this.gizmo.attachedMesh = this.AbstractMesh
        }
        break
      case 'rotate':
        this.action = 'rotate'
        this.ClearGizmo(this.gizmo)
        this.gizmo = new BABYLON.RotationGizmo(this.utilLayer);
        if(this.currentMesh){
          this.gizmo.updateGizmoRotationToMatchAttachedMesh = true
          this.gizmo.attachedMesh = this.AbstractMesh
        }
        break
      case 'scale':
        this.action = 'scale'
        this.ClearGizmo(this.gizmo)
        this.gizmo = new BABYLON.ScaleGizmo(this.utilLayer);
        this.gizmo.attachedMesh = this.currentMesh //Здесь применяем гизмо к "настоящей" сфере
                                                   //чтобы сохранить возможность вращения для абстрактной
        break
    }
  },

  //Функция очищающая gizmo
  ClearGizmo: function(gizmo){
    if(gizmo !== null){
      if(gizmo.attachedMesh !== null){
        this.gizmo.attachedMesh = null
      }
    }
  }
}

export { myScene };