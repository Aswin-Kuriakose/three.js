import { BoxBufferGeometry, CylinderBufferGeometry } from "https://cdn.jsdelivr.net/npm/three@0.135.0/build/three.min.js";

function createGeometry() {

    const body = new BoxBufferGeometry( 0.5, 0.5, 0.8 )
    const nose = new CylinderBufferGeometry( 0.3, 0.3, 1, 15 )
    const wheel = new CylinderBufferGeometry( 0.1, 0.1, 0.5, 20 )
    const chimney = new CylinderBufferGeometry( 0.1, 0.15, 0.2 )

    return {
        body,
        nose,
        wheel,
        chimney
    }
} 

export { createGeometry }
