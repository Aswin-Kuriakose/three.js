import { DirectionalLight, HemisphereLight } from "https://cdn.jsdelivr.net/npm/three@0.135.0/build/three.min.js"

function createLight() {

    const ambienLight = new HemisphereLight(
        0xffffff,
        "grey",
        0.8
    )
    const directionalLight = new DirectionalLight( 0xffffff, 2 )
    directionalLight.position.set( 10, 10, 20 )

    return { ambienLight ,directionalLight }
}

export {createLight}