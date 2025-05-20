const promptInput = document.getElementById("prompt");
const generateButton = document.getElementById("generateButton");
const imageContainer = document.getElementById("imageContainer");
const generatedImage = document.getElementById("generatedImege");
async function generateImage () {
    const prompt = promptInput.value.trim();
    if(!prompt){
        alert("por favor ingrese la descripcion de su imagen");
        return;
    }
    generateButton.disabled = true;
    generateButton.textContent = "Generando...";
    try{
        const apitoken = "glif_eaaa71ae103fc6fe651fbd90888d10243510a754dcefaade83462e6329ca2b4d";
        const apiToken = 'abzfasdf2349820349';
const data = {
  id: "clgh1vxtu0011mo081dplq3xs",
  inputs: [prompt]
};
const response = await fetch('https://simple-api.glif.app',
    {
      method: 'POST',
      headers: {
          'Authorization': `Bearer ${apitoken}`,
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  });
  const result = await response.json();
  console.log(result);
  const imageUrl = result.output;
  generatedImage.src = imageUrl;
  imageContainer.style.display = 'block';

    }catch(error){
        console.log(`se produjo un errror: ${error}`);


    }finally{
        generateButton.disabled = false;
        generateButton.textContent = "Generar Imagen";
    }
    
}

generateButton.addEventListener("click", generateImage);