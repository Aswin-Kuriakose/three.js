import { Group } from "https://cdn.jsdelivr.net/npm/three@0.135.0/build/three.min.js";

import { createMesh } from "./meshes";


class Train extends Group {
    constructor() {

        super()

        this.meshes = createMesh()

        this.add(

            this.meshes.bodyMesh,
            this.meshes.nose,
            this.meshes.chimney,
            this.meshes.wheel

        )
    }

    tick( delta ) {

    }
}

export { Train }