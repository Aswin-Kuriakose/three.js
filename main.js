import './style.css'

import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/ window.innerHeight, 0.1, 1000 )

const renderer = new THREE.WebGL1Renderer({

  canvas: document.querySelector('#bg')

})

renderer.setPixelRatio( window.devicePixelRatio )
renderer.setSize( window.innerHeight, window.innerWidth )

camera.position.setZ(30)


const shape = new THREE.TorusGeometry( 10, 3, 16, 100 )
const material = new THREE.MeshStandardMaterial({ color: 0xffff45 })

const mesh = new THREE.Mesh( shape, material )

scene.add( mesh )

const pointLight = new THREE.PointLight( 0xffffff )
pointLight.position.set( 4, 10, 0 )
 
const ambientLight = new THREE.AmbientLight( 0xffffff, 0.6 )

scene.add( pointLight, ambientLight )

const pointHelper = new THREE.PointLightHelper( pointLight )
const gridHelper = new THREE.GridHelper( 200, 50 )
const axisHelper = new THREE.AxesHelper( 50 )

scene.add( pointHelper, gridHelper, axisHelper)

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

function animate() {

  requestAnimationFrame( animate )

  mesh.rotation.x += 0.01
  mesh.rotation.z += 0.01

  controls.update()
  renderer.render( scene, camera )

}

animate()