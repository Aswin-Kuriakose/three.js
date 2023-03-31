// import * as THREE from "https://cdn.skypack.dev/three@0.132.2"
// import { OrbitControls } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js'
// import * as THREE from "three"
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
// const container = document.querySelector(".container")
const scene = new THREE.Scene()

function createWheels() {
    
const geometry = new THREE.CylinderGeometry ( 3,3,20,30,20, false )
const material = new THREE.MeshLambertMaterial ( { color: 0x303030 } )
const wheelMesh = new THREE.Mesh ( geometry, material )
return wheelMesh

}

function createRim() {
    
    const geometry = new THREE.CylinderGeometry ( 1.5,1.5,20,30,20, false ) 
    const material = new THREE.MeshLambertMaterial ( { color: 0xffffff } )
    const wheelMesh = new THREE.Mesh ( geometry, material )
    return wheelMesh

}

function createBody() {
    
    const metalTexture = new THREE.TextureLoader().load("./metal-texture.jpg")
    // const body = new THREE.Mesh (new THREE.BoxGeometry(30,5,17), new THREE.MeshLambertMaterial({color:0xeeeeee}))
    const body = new THREE.Mesh (new THREE.BoxGeometry(30,5,17), new THREE.MeshLambertMaterial({ map: metalTexture }))
    return body

}

function createUpperBody() {
    
    const body = new THREE.Mesh(new THREE.BoxGeometry(20,5,17), new THREE.MeshLambertMaterial({color:0x222222}))
    return body

}

function createCar() {
    
    const car = new THREE.Group()

    const frontWheel = createWheels()
    frontWheel.position.set ( 10, -2, 5 )
    frontWheel.rotateX  ( 90/180 * Math.PI  )
    car.add ( frontWheel )

    const FwheelCup = createRim()
    FwheelCup.position.set ( 10,-1.8,5 )
    FwheelCup.rotateX ( 90/180 * Math.PI )
    car.add ( FwheelCup )

    const backWheel = createWheels()
    backWheel.position.set  (-10,-2,5 )
    backWheel.rotateX ( 90/180 * Math.PI )
    car.add ( backWheel )

    const BwheelCup = createRim()
    BwheelCup.position.set  (-10,-1.8,5 )
    BwheelCup.rotateX ( 90/180 * Math.PI )
    car.add ( BwheelCup )

    const mainBody = createBody()
    mainBody.position.set ( 0,0,4.5 )
    car.add ( mainBody )

    const upperBody = createUpperBody()
    upperBody.position.set  ( -2,5,4.5 )
    car.add ( upperBody )

    // const cabin = new THREE.Mesh(
    //     new THREE.BoxGeometry(33, 12, 24),
    //     new THREE.MeshLambertMaterial({ color: 0xffffff })
    //   );
    // car.position.set(-2,5,4.5)
    // car.add(cabin)

    return car

}

const texture = new THREE.TextureLoader().load("./road.jpg")

const planeGeometry = new THREE.PlaneGeometry ( 100, 100 )
// const planeMaterial = new THREE.MeshLambertMaterial (
// { color: 0xbbbbbb,
//   side: THREE.DoubleSide})
const planeMaterial = new THREE.MeshBasicMaterial ({
    map: texture,
    side: THREE.DoubleSide
})
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.position.set(0,-5,0)
plane.rotateX(-0.5 * Math.PI)
scene.add(plane)

const gridHelper = new THREE.GridHelper(30)

const car = createCar()
scene.add(car)

const ambienLight = new THREE.AmbientLight(0xffffff, 0.6)
scene.add(ambienLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
directionalLight.position.set(100,500,300)
scene.add(directionalLight)

const aspectRatio = window.innerWidth/ window.innerHeight
const width = 100
const height = width/aspectRatio

const camera = new THREE.OrthographicCamera(

    width/-2,
    width/2,
    height/2,
    height/-2,
    1,
    1000
    
)

const renderer = new THREE.WebGLRenderer({antialias: true})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio);
renderer.physicallyCorrectLights = true
// container.append(renderer.domElement)
renderer.render(scene, camera)
renderer.shadowMap.enabled = true

document.body.appendChild(renderer.domElement)


camera.position.set(30,30,100)
camera.lookAt(0,0,0)
camera.updateProjectionMatrix()
const orbit = new THREE.OrbitControls(camera, renderer.domElement)       
orbit.maxPolarAngle = Math.PI / 2

function animate() {
    requestAnimationFrame(animate);
    orbit.autoRotate = true
    orbit.update()
    renderer.render(scene, camera);
  }
  animate()