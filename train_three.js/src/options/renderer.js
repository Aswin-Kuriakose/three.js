import { WebGL1Renderer } from "https://cdn.jsdelivr.net/npm/three@0.135.0/build/three.min.js";

function createRenderer() {

    const renderer = new WebGL1Renderer( { antiAliasing: true } )

    renderer.physicallyCorrectLights = true

    return renderer

} 

export { createRenderer }