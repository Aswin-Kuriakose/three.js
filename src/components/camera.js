import { PerspectiveCamera } from "https://cdn.jsdelivr.net/npm/three@0.135.0/build/three.min.js"

const aspectRatio = window.innerWidth / window.innerHeight

function createCamera() {

    const camera = new PerspectiveCamera(
        70,
        aspectRatio,
        1,
        1000
    )
    camera.postion.set( 10, 10, 10 )
    
    return camera

}

export { createCamera } 