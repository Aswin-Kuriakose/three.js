import { Color, Scene } from "https://cdn.jsdelivr.net/npm/three@0.135.0/build/three.min.js"

function createScene() {

    const scene = new Scene()
    scene.backGround = new Color( "grey" )

    return scene
}

export { createScene }
