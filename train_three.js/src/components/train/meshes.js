import { Mesh } from "https://cdn.jsdelivr.net/npm/three@0.135.0/build/three.min.js";
import { createMaterial } from "./materials";
import { createGeometry } from "./geometry";

function createMesh() {

    const geometries = createGeometry()
    const materials = createMaterial()

    const bodyMesh = new Mesh( geometries.body, materials.body )
    
    const nose = new Mesh( geometries.nose, materials.detail )

    const chimney = new Mesh( geometries.chimney, materials.detail )

    const wheel = new Mesh( geometries.wheel, materials.detail )


    return { bodyMesh, nose, chimney, wheel }

}

export { createMesh }