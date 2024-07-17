export function handleIconClickEvents (scene, camera, raycaster, mouse) {
    return function(event) {
        event.preventDefault();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children, true);
        if (intersects.length > 0) {
            const intersectedObject = intersects[0].object;
            if (intersectedObject.userData.type === 'icon') {
                console.log(`Icon clicked: ${intersectedObject.userData.text}`);
            }
        }
    }
}