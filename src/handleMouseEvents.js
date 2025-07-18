import { router } from "./utils/router.js";
import { click } from "./pages/home.js";
import { moveThumb } from "./pages/projects.js";

let isDragging = false;
let dragStartY = null;

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
          ["redirect", "dropdown", "nav", "thumb"].includes(
            intersect.object.userData.type
          )
        );
      });

    if (intersects.length > 0) {
      const intersectedObject = intersects[0].object;
      const targetPath = intersectedObject.userData?.url ?? null;
      switch (intersectedObject.userData.type) {
        case "nav":
          router.navigate(targetPath);
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
        case "thumb":
          startDragging(event, intersectedObject);
          break;
      }
    }
  };
}

function startDragging(event) {
  isDragging = true;
  dragStartY = event.clientY;
  document.addEventListener("mousemove", handleDrag);
  document.addEventListener("mouseup", stopDragging);
}

function handleDrag(event) {
  if (!isDragging) return;

  const deltaY = (event.clientY - dragStartY) / 2;
  dragStartY = event.clientY;

  moveThumb(deltaY);
}

function stopDragging() {
  isDragging = false;
  document.removeEventListener("mousemove", handleDrag);
  document.removeEventListener("mouseup", stopDragging);
}

function isBelowScreen(x, y) {
  let slope = 0.37558;
  let yIntercept = -0.8910675381263617;
  return y < slope * x ** 2 + yIntercept;
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
        ["redirect", "nav", "dropdown", "thumb"].includes(
          intersect.object.userData.type
        )
      ) {
        hovering = true;
      }
    });
    if (intersects.length > 2 && !isBelowScreen(mouse.x, mouse.y)) {
      document.body.style.cursor = hovering
        ? "url('../../icons/cursor.png'), auto"
        : "url('../../icons/mouse.png'), auto";
    } else {
      document.body.style.cursor = "auto";
    }
  };
}
