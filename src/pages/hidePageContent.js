export function hidePageContent(scene) {
  const objectsToRemove = [];
  scene.children.forEach((child) => {
    if (
      ["icon", "text", "redirect", "image", "dropdown", "nav"].includes(
        child.userData.type
      )
    ) {
      objectsToRemove.push(child);
    }
  });
  objectsToRemove.forEach((object) => {
    scene.remove(object);
  });
}
