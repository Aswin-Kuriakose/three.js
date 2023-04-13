import './style.css'

import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Mesh } from 'three'
import * as dat from 'dat.gui'

const scene = new THREE.Scene()

const parent = new THREE.Object3D()

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/ window.innerHeight, 0.1, 1000 )
camera.position.set( 0, 0, 0 )

const renderer = new THREE.WebGL1Renderer({
  // alpha: true,
  antialias: true,
  canvas: document.querySelector('#bg')

})

renderer.setPixelRatio( window.devicePixelRatio )
renderer.setSize( window.innerHeight, window.innerWidth )

renderer.shadowMap.enabled = true

camera.position.setZ(30)


const shape = new THREE.TorusGeometry( 10, 3, 16, 100 )
const material = new THREE.MeshStandardMaterial({ color: 0xffff45 })

const mesh = new THREE.Mesh( shape, material )

// scene.add( mesh )
parent.add(mesh)

const pointLight = new THREE.PointLight( 0xffffff )
pointLight.position.set( 4, 10, 0 )
 
const ambientLight = new THREE.AmbientLight( 0xffffff, 0.6 )

const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.8)
directionalLight.position.set( 50, 30, 10 )
directionalLight.castShadow = true
directionalLight.shadow.camera.bottom = -12


const spotLight = new THREE.SpotLight( 0xffffff)
spotLight.position.set( 50, 50, 50 )
spotLight.castShadow = true
spotLight.angle = 0.2

scene.fog = new THREE.Fog( 0xffffff, 0.1, 500 )

scene.add( pointLight, ambientLight, directionalLight, spotLight )

const pointHelper = new THREE.PointLightHelper( pointLight )
const gridHelper = new THREE.GridHelper( 200, 50 )
const axisHelper = new THREE.AxesHelper( 50 )

const dLightHelper = new THREE.DirectionalLightHelper( directionalLight, 5 )

const dLightHelperCam = new THREE.CameraHelper( directionalLight.shadow.camera)


scene.add( pointHelper, gridHelper, axisHelper, dLightHelper, dLightHelperCam )


const controls = new OrbitControls( camera, renderer.domElement )

function stars() {
  
  const starShape = new THREE.SphereGeometry( 0.2, 16, 16 )
  const starMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff })
  const star = new THREE.Mesh( starShape, starMaterial )

  const [ x, y, z ] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ))
  star.position.set( x, y, z )

  scene.add( star )

}

Array(500).fill().forEach( stars )

const planeGeometry = new THREE.PlaneGeometry( 100, 100 )
const planeMaterial = new THREE.MeshStandardMaterial( {
  color: 0xffffff,
  side: THREE.DoubleSide
})
const plane = new THREE.Mesh( planeGeometry, planeMaterial )
plane.rotateX( 0.5 * Math.PI )
plane.receiveShadow = true

const sphereGeometry = new THREE.SphereGeometry( 10, 50, 50 )
const sphereMaterial = new THREE.MeshStandardMaterial( {color: 0x000055, wireframe: false })
const sphere = new Mesh( sphereGeometry, sphereMaterial )
sphere.castShadow = true

scene.add( plane, sphere )

const gui = new dat.GUI

let step = 0


const options = {
  sphereColor: 0xff4561,
  wireframe: true,
  speed: 0.01
}


gui.addColor( options, 'sphereColor').onChange((e) => {
  sphere.material.color.set(e)

})

gui.add( options, 'wireframe').onChange((e) => {
  sphere.material.wireframe = e
})

gui.add( options, 'speed', 0, 0.1 )



const cubeTexture = new THREE.CubeTextureLoader()

scene.background = cubeTexture.load([
  './free-space-textures.jpg'
])

const smBoxGeometry = new THREE.BoxGeometry( 5, 5, 5 )
const smBoxMaterial = new THREE.MeshStandardMaterial( {
  map: new THREE.TextureLoader().load('./free-space-textures.jpg')

})

const smBox = new THREE.Mesh( smBoxGeometry, smBoxMaterial )
smBox.position.y = 30


scene.add(smBox)






const texture = new THREE.TextureLoader().load('./free-space-textures.jpg')

scene.background = texture

const moonTxt = new THREE.TextureLoader().load('./Moon_texture.jpg')
const moonSurface = new THREE.TextureLoader().load('./moon-surface.jpg')

const moonShape = new THREE.SphereGeometry( 10, 16, 16 )
const moonMaterial = new THREE.MeshStandardMaterial({ map: moonTxt, normalMap: moonSurface })
const moon = new THREE.Mesh( moonShape, moonMaterial )
moon.castShadow = true


moon.position.set( 50, 50, 50 )
// scene.add( moon )
parent.add(moon)

scene.add(parent)


function moveCamera() {

  const elTop = document.body.getBoundingClientRect().top

     camera.position.x = elTop * -0.01
     camera.position.y = elTop * -0.01
     camera.position.z = elTop * -0.01

}

// document.addEventListener( 'scroll', () => {

//   const elTop = document.body.getBoundingClientRect().top

//   camera.position.x = elTop * -0.01
//   camera.position.y = elTop * -0.01
//   camera.position.z = elTop * -0.01

// } )
document.body.onscroll = moveCamera


function animate() {

  requestAnimationFrame( animate )

  mesh.rotation.x += 0.01
  mesh.rotation.z += 0.01

  moon.rotation.y += 0.002
  // moon.rotation.y += 0.02

  step += options.speed
  sphere.position.y = 15 * Math.abs(Math.sin(step))


  parent.rotateY(0.01)

  controls.update()
  renderer.render( scene, camera )

}



animate()