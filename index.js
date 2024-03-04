async function generateMeta() {
  const title = document.getElementById("title").value;
  const metaResponseDiv = document.getElementById("metaResponse");

  try {
    const loadingParagraph = document.createElement("p");
    loadingParagraph.textContent = "Loading...";
    metaResponseDiv.innerHTML = "";
    metaResponseDiv.appendChild(loadingParagraph);

    const response = await fetch(
      "https://api-ai-peach.vercel.app/openai/meta",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
        }),
      }
    );

    const result = await response.json();
    const descriptionText = result.description
      ? result.description.content
      : "No description available";

    loadingParagraph.textContent = `Hasil: ${descriptionText}`;
  } catch (error) {
    console.error("Error generating meta data:", error);
    metaResponseDiv.innerHTML = "Error generating meta data";
  }
}

async function generateImage() {
  const prompt = document.getElementById("prompt").value;

  try {
    const response = await fetch(
      "https://api-ai-peach.vercel.app/openai/image",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      }
    );

    const result = await response.json();

    if (response.ok) {
      const imageUrl = result.image[0].url;

      const imageElement = document.getElementById("imageResult");

      imageElement.src = imageUrl;
    } else {
      console.error("Error generating image:", response.statusText);
    }
  } catch (error) {
    console.error("Error generating image:", error);
    alert("Error generating image");
  }
}
