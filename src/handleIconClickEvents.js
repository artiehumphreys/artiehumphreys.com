import { route } from "./utils/router.js";

export function handleIconClickEvents(scene, camera, raycaster, mouse) {
  return function (event) {
    event.preventDefault();
    const path = window.location.hash;
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster
      .intersectObjects(scene.children)
      .filter((intersect) => {
        return (
          intersect.object.userData &&
          ["text", "icon"].includes(intersect.object.userData.type)
        );
      });
    console.log(intersects);
    if (intersects.length > 0) {
      const intersectedObject = intersects[0].object;
      console.log(intersects);
      if (intersectedObject.userData.type === "icon" && path == "") {
        const targetPath = `/${intersectedObject.userData.text.toLowerCase()}`;
        route().navigate(targetPath);
      } else if (
        path === "#/contact" &&
        intersectedObject.userData.type === "text"
      ) {
        const targetPath = `/${intersectedObject.userData.text.toLowerCase()}`;
        const newTab = window.open(targetPath, "_blank");
        if (newTab) {
          newTab.focus();
        } else {
          alert("Please allow popups for this site.");
        }
      }
    }
  };
}
