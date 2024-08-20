import { addText } from "../utils/textUtils.js";

export async function experiencePage(scene) {
  const header = await addText(0, 56.5, 8.7, "Experience", 2);
  const colors = [0x037c6e, 0x0096ff, 0xffa756];

  const textData = [
    {
      position: [-6.4, 53.75, 8.7],
      content: "Biocore LLC - Computer Vision Intern",
      name: "header",
    },
    {
      position: [-1, 51.25, 8.7],
      content:
        "Automated 3D animation workflows for multi-view analysis of player injuries in NBA games, \nshowcased at NBA Tech Expo 2024",
    },
    {
      position: [-14.4, 48.25, 8.7],
      content: "Skills: Go, Python, OpenCV, PyTorch, bpy",
      name: "skills",
    },

    {
      position: [-7.2, 45.25, 8.7],
      content: "Sitscape - Software Engineer Intern",
      name: "header",
    },
    {
      position: [0, 42.75, 8.71],
      content:
        "Enhanced keyword and semantic search capabilities using Amazon OpenSearch, doubling search \nspeed and improving result accuracy",
    },
    {
      position: [-12.85, 39.75, 8.7],
      content: "Skills: Python, JavaScript, jQuery, AWS, Langchain",
      name: "skills",
    },
    {
      position: [-2.6, 36.75, 8.7],
      content: "UVA Men's Basketball Team - Student Manager",
      name: "header",
    },
    {
      position: [-0.95, 34.25, 8.71],
      content:
        "Dedicate 25 hours weekly to ensure the seamless execution of daily team operations, which \nincludes organizing practices, coordinating team travel, and overseeing logistics",
    },
  ];

  let headerCount = -1;

  const paragraphs = await Promise.all(
    textData.map(async ({ position, content, name }) => {
      const size = name === "header" ? 1.25 : name === "skills" ? 0.5 : 0.7;
      if (name === "header") {
        ++headerCount;
        return addText(...position, content, size, colors[headerCount]);
      }
      return addText(...position, content, size);
    })
  );

  paragraphs.forEach((item) => {
    scene.add(item);
  });

  scene.add(header);
}
