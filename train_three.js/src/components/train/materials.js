import { MeshLambertMaterial } from "https://cdn.jsdelivr.net/npm/three@0.135.0/build/three.min.js";

function createMaterial() {
    const body = new MeshLambertMaterial({
        color: "firebrick",
        flatShading: true
    })
    const detail = new MeshLambertMaterial({
        color: "darkslategray",
        flatShading: true
    })

    return { detail, body }
}

export { createMaterial }

