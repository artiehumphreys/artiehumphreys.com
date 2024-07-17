export function handleIconClickEvents (scene, camera) {
    preventDefault();
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects.length > 0) {
        const intersectedObject = intersects[0].object;
        if (intersectedObject.userData.type === 'icon') {
            console.log(`Icon clicked: ${intersectedObject.userData.text}`);
        }
    }
}