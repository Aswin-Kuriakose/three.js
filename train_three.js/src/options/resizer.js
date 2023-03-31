function setSize( container, camera, renderer ) {

    camera.aspect = container.clientWidth / container.clientHeight
    camera.updateProjectionMatrix()

    renderer.setPixelRatio( window.devicePixelRatio )
    renderer.setSize()

}

class Resize {
    constructor ( container, camera, renderer ) {
        setSize( container, camera, renderer )

        window.addEventListener("resize", () => {

            setSize( container, camera, renderer )

        })
    }
}

export { Resize }