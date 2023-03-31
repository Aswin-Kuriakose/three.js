import { createCamera } from "./components/camera";
import { axesHelper, gridHelper } from "./components/helper";
import { createLight } from "./components/light";
import { createScene } from "./components/scene";
import { Train } from "./components/train/train"

import { getControls } from "./options/controls";
import { Loop } from "./options/loops";
import { createRenderer } from "./options/renderer";
import { Resize } from "./options/resizer";


let camera,
    renderer,
    scene,
    loop
 

class World {

    constructor( container ){
        camera = createCamera()
        renderer = createRenderer()
        scene = createScene()
        loop = new Loop( camera, scene, renderer )
        container.append( renderer.domElement )

        const { ambientLight, directionalLight } = createLight()
        const controls = getControls( camera, renderer.domElement )
        const train = new Train()

        loop.updatables.push( controls, train )
        scene.add( ambientLight, directionalLight, train )
        scene.add( axesHelper(), gridHelper() )
        const resize = new Resize( container, camera, renderer )

    }

    async init () {



    }

    render() {
        renderer.render( scene, camera )
    }

    start() {
        loop.start()
    }

    stop() {
        loop.stop()
    }

}

export { World }