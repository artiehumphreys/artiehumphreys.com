import { route } from "./utils/router.js";
import { click } from "./pages/home.js";

export function handleClickEvents(scene, camera, raycaster, mouse) {
  return function (event) {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster
      .intersectObjects(scene.children)
      .filter((intersect) => {
        return (
          intersect.object.userData &&
          ["redirect", "dropdown", "nav"].includes(
            intersect.object.userData.type
          )
        );
      });
    console.log(scene.children, intersects[0]);
    if (intersects.length > 0) {
      const intersectedObject = intersects[0].object;
      const targetPath = intersectedObject.userData?.url?.toLowerCase() ?? null;
      switch (intersectedObject.userData.type) {
        case "nav":
          route().navigate(targetPath);
          break;
        case "redirect": {
          const newTab = window.open(
            "@".includes(targetPath)
              ? `mailto:${targetPath}`
              : `https://${targetPath}`,
            "_blank"
          );
          newTab ? newTab.focus() : alert("Please allow popups for this site.");
          break;
        }
        case "dropdown":
          click();
          break;
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
    intersects.forEach((intersect) => {
      if (
        ["redirect", "nav", "dropdown"].includes(intersect.object.userData.type)
      ) {
        hovering = true;
      }
    });

    document.body.style.cursor = hovering ? "pointer" : "default";
  };
}
