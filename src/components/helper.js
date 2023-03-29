import { AxesHelper, GridHelper } from "https://cdn.jsdelivr.net/npm/three@0.135.0/build/three.min.js";

function axesHelper() {

    const helper = new AxesHelper(10)
    return helper

}
function gridHelper(){

    const ghelper = new GridHelper()
    return ghelper

}

export { axesHelper, gridHelper }