import { Clock } from "https://cdn.jsdelivr.net/npm/three@0.135.0/build/three.min.js"

const clock = new Clock()

class Loop {

    constructor( camera, scene, renderer ){

        this.camera  = camera
        this.scene   = scene
        this.renderer = renderer
        this.updatables = []

    }

    start() {

        this.renderer.setAnimationLoop( () => {

            this.tick()
            
            this.renderer.render( this.scene, this.camera )

        })
    }

    stop() { 

        this.renderer.setAnimationLoop( null )

    }

    tick() {

        const delta = clock.getDelta()

        for ( const object of this.updatables ){

            object.tick(delta)
        }

    }

}

export { Loop }