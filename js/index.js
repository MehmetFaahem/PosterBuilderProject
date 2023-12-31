const mainDiv = document.createElement("div");
mainDiv.id = "app";
mainDiv.className = "flex space-x-10";

const BuilderSection = document.createElement("section");
BuilderSection.className = "flex flex-col";
const PreviewSection = document.createElement("section");

// Custom style only for svg file
PreviewSection.style.padding = "20px";

const BuilderTitle = document.createElement("h1");
BuilderTitle.textContent = "Poster Builder";
BuilderTitle.className = "font-bold text-[22px] text-white";

const BuilderTitlePreview = document.createElement("h1");
BuilderTitlePreview.textContent = "Poster Preview";
BuilderTitlePreview.className = "font-bold ml-[30px] text-[22px] text-white";

const HeadingInput = document.createElement("textarea");
HeadingInput.placeholder = "Heading";
HeadingInput.className =
  "w-[560px] mt-4 outline-none scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100 h-[100px] overflow-hidden text-white rounded-lg bg-slate-600 p-3 font-semibold";

const DesInput = document.createElement("textarea");
DesInput.placeholder = "Description";
DesInput.className =
  "w-[560px] mt-4 outline-none h-[300px] overflow-hidden text-white rounded-lg bg-slate-600 p-3 font-light";

const ImageTitle = document.createElement("span");
ImageTitle.textContent = "Upload an Image (16:9 Will be better fit here)";
ImageTitle.className = "block";

const ImageInput = document.createElement("input");
ImageInput.type = "file";
ImageInput.id = "imageInput";
ImageInput.placeholder = "Select Poster Image";
ImageInput.className = "mt-3 hidden";

const ImageIcon = document.createElement("img");
ImageIcon.src = "camera.svg";

const ImageHolder = document.createElement("label");
ImageHolder.htmlFor = "imageInput";
ImageHolder.className =
  "flex space-x-3 place-content-center place-items-center align-center px-[15px] py-[20px] mt-3 fill-white rounded-lg cursor-pointer bg-slate-700 color-white";
ImageHolder.appendChild(ImageIcon);
ImageHolder.appendChild(ImageTitle);
ImageHolder.appendChild(ImageInput);

const HeadingPreview = document.createElement("p");
HeadingPreview.className =
  "w-[560px] text-[28px] flex place-self-center self-center mt-4 h-auto overflow-hidden text-white font-semibold";

// Custom style only for svg file
HeadingPreview.style.width = "500px";
HeadingPreview.style.fontSize = "28px";
HeadingPreview.style.height = "auto";
HeadingPreview.style.fontWeight = "700px";
HeadingPreview.style.paddingLeft = "20px";

const DesPreview = document.createElement("p");
DesPreview.className = `w-[560px] flex text-[20px] place-self-center self-center mt-4 h-auto overflow-hidden text-white font-light`;

// Custom style only for svg file
DesPreview.style.fontWeight = "400px";
DesPreview.style.width = "500px";
DesPreview.style.fontSize = "20px";
DesPreview.style.marginTop = "20px";
DesPreview.style.height = "auto";
DesPreview.style.paddingLeft = "20px";

const ImagePreview = document.createElement("img");
// ImagePreview.alt = "Selected Image Will be Shown Here";
// ImagePreview.src = "#";
ImagePreview.id = "outputImage";
ImagePreview.className =
  "h-auto max-h-[300px] mt-8 object-fill object-center w-full rounded-lg";

// Custom style only for svg file
ImagePreview.style.width = "500px";
ImagePreview.style.maxHeight = "400px";
ImagePreview.style.marginTop = "20px";
ImagePreview.style.borderRadius = "20px";
ImagePreview.style.height = "auto";
ImagePreview.style.marginLeft = "20px";

const DownloadButton = document.createElement("button");
DownloadButton.innerText = "Download";
DownloadButton.className =
  "p-2 mt-3 ml-[30px] bg-slate-700 text-white font-light";
DownloadButton.id = "download-btn";

const CaptureSection = document.createElement("div");
CaptureSection.appendChild(HeadingPreview);
CaptureSection.appendChild(ImagePreview);
CaptureSection.appendChild(DesPreview);
CaptureSection.className = "flex flex-col";
CaptureSection.id = "capture-section";

document.body.appendChild(mainDiv);
mainDiv.appendChild(BuilderSection);
mainDiv.appendChild(PreviewSection);
PreviewSection.appendChild(BuilderTitlePreview);
PreviewSection.appendChild(CaptureSection);
PreviewSection.appendChild(DownloadButton);
BuilderSection.appendChild(BuilderTitle);
BuilderSection.appendChild(HeadingInput);
BuilderSection.appendChild(ImageHolder);
BuilderSection.appendChild(DesInput);

HeadingInput.addEventListener("input", updateTitle);

function updateTitle() {
  const inputText = HeadingInput.value;
  HeadingPreview.textContent = inputText;
}

DesInput.addEventListener("input", updateDes);

function updateDes() {
  const inputText = DesInput.value;
  DesPreview.textContent = inputText;
}

ImageInput.addEventListener("change", displaySelectedImage);

function displaySelectedImage() {
  const file = ImageInput.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (event) {
      ImagePreview.src = event.target.result;
    };

    reader.readAsDataURL(file);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const downloadButton = document.getElementById("download-btn");

  downloadButton.addEventListener("click", function () {
    const sectionToCapture = document.getElementById("capture-section");

    // Convert SVG to data URL
    const svgData = new XMLSerializer().serializeToString(sectionToCapture);
    const dataURL =
      "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgData);

    const link = document.createElement("a");
    link.download = "svg_image.svg";
    link.href = dataURL;
    link.click();

    const sectionHTML = new XMLSerializer().serializeToString(sectionToCapture);

    console.log(
      "data:image/svg+xml;charset=utf-8," + encodeURIComponent(sectionHTML)
    );
  });
});
