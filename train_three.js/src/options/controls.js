import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.135.0/build/three.min.js"

function getControls( camera, canvas ) {

    const controls = new OrbitControls( camera, canvas )

    controls.enableDamping = true

    controls.target.y = 1

    controls.tick() = () => controls.update()

    return controls

}

export { getControls }

