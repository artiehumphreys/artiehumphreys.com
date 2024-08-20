import { route } from "./utils/router.js";

export function handleClickEvents(scene, camera, raycaster, mouse) {
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
          ["redirect", "icon"].includes(intersect.object.userData.type)
        );
      });
    if (intersects.length > 0) {
      const intersectedObject = intersects[0].object;
      if (intersectedObject.userData.type === "icon" && path == "") {
        const targetPath = `/${intersectedObject.userData.text.toLowerCase()}`;
        route().navigate(targetPath);
      } else if (
        path === "#/contact" &&
        intersectedObject.userData.type === "redirect"
      ) {
        const targetPath = `/${intersectedObject.userData.text.toLowerCase()}`;
        const newTab = window.open(
          "@".includes(targetPath)
            ? `mailto:${targetPath}`
            : `https://${targetPath}`,
          "_blank"
        );
        if (newTab) {
          newTab.focus();
        } else {
          alert("Please allow popups for this site.");
        }
      }
    }
  };
}

export function handleHoverEvents(scene, camera, raycaster, mouse) {
  return function (event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    let hovering = false;
    let path = window.location.hash;
    intersects.forEach((intersect) => {
      if (
        intersect.object.userData.type === "redirect" ||
        (path === "" && intersect.object.userData.type === "icon")
      ) {
        hovering = true;
      }
    });

    document.body.style.cursor = hovering ? "pointer" : "default";
  };
}
