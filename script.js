import * as Three from "/node_modules/three/build/three.module.js"
// import {OrbitControls} from "./node_modules/three/examples/jsm/controls/OrbitControls.js"
// import * as dat from "dat.gui"

const scene = new Three.Scene()


// const geometry = new Three.BoxGeometry(5,4,3)

function createWheels(){
const geometry = new Three.CylinderGeometry(3,3,20,30,20, false,)

const material = new Three.MeshLambertMaterial({color:0x303030})
const wheelMesh = new Three.Mesh(geometry, material)
return wheelMesh
}

function createRim(){
    const geometry = new Three.CylinderGeometry(1.5,1.5,20,30,20, false,)
    
    const material = new Three.MeshLambertMaterial({color:0xffffff})
    const wheelMesh = new Three.Mesh(geometry, material)
    return wheelMesh
    }

function createBody(){
    const body = new Three.Mesh(new Three.BoxGeometry(30,5,17), new Three.MeshLambertMaterial({color:0xeeeeee}))
    return body
}

function createUpperBody(){
    const body = new Three.Mesh(new Three.BoxGeometry(20,5,17), new Three.MeshLambertMaterial({color:0x222222}))
    return body
}

function createCar(){
    const car = new Three.Group()

    const frontWheel = createWheels()
    frontWheel.position.set(10,-2,5)
    frontWheel.rotateX(90/180 * Math.PI)
    car.add(frontWheel)

    const FwheelCup = createRim()
    FwheelCup.position.set(10,-1.8,5)
    FwheelCup.rotateX(90/180 * Math.PI)
    car.add(FwheelCup)

    const backWheel = createWheels()
    backWheel.position.set(-10,-2,5)
    backWheel.rotateX(90/180 * Math.PI)
    car.add(backWheel)

    const BwheelCup = createRim()
    BwheelCup.position.set(-10,-1.8,5)
    BwheelCup.rotateX(90/180 * Math.PI)
    car.add(BwheelCup)

    const mainBody = createBody()
    mainBody.position.set(0,0,4.5)
    car.add(mainBody)

    const upperBody = createUpperBody()
    upperBody.position.set(-2,5,4.5)
    car.add(upperBody)

    // const cabin = new Three.Mesh(
    //     new Three.BoxGeometry(33, 12, 24),
    //     new Three.MeshLambertMaterial({ color: 0xffffff })
    //   );
    // car.position.set(-2,5,4.5)
    // car.add(cabin)

    return car

}

const planeGeometry = new Three.PlaneGeometry(100,100)
const planeMaterial = new Three.MeshLambertMaterial(
{ color:0xbbbbbb,
  side: Three.DoubleSide})
const plane = new Three.Mesh(planeGeometry, planeMaterial)
plane.position.set(0,-5,0)
plane.rotateX(-0.5 * Math.PI)
scene.add(plane)

const gridHelper = new Three.GridHelper(30)

const car = createCar()
scene.add(car)

const ambienLight = new Three.AmbientLight(0xffffff, 0.6)
scene.add(ambienLight)

const directionalLight = new Three.DirectionalLight(0xffffff, 0.6)
directionalLight.position.set(100,500,300)
scene.add(directionalLight)

const aspectRatio = window.innerWidth/ window.innerHeight
const width = 100
const height = width/aspectRatio

const camera = new Three.OrthographicCamera(
    width/-2,
    width/2,
    height/2,
    height/-2,
    1,
    1000
)

// const orbit = new OrbitControls(camera, renderer.domElement)

camera.position.set(30,30,100)
camera.lookAt(0,0,0)
// orbit.update()

const renderer = new Three.WebGLRenderer({antialias: true})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.render(scene, camera)
renderer.shadowMap.enabled = true

document.body.appendChild(renderer.domElement)


// function animate(){
//     requestAnimationFrame(animate)

//     renderer.render(scene, camera)

// }
// renderer.setAnimationLoop(animate)
