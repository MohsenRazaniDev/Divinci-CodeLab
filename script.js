const htmlEditor = document.getElementById("html");
const cssEditor = document.getElementById("css");
const jsEditor = document.getElementById("js");
const previewFrame = document.getElementById("preview");

const darkModeBtn = document.getElementById("darkModeBtn");
const exportBtn = document.getElementById("exportBtn");
const resetBtn = document.getElementById("resetBtn");

function updateOutput() {
    const html = htmlEditor.value;
    const css = cssEditor.value;
    const js = jsEditor.value;

    const fullCode = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <style>${css}</style>
    </head>
    <body>
      ${html}
      <script>${js.replace(/<\/script>/g, '<\\/script>')}</script>
    </body>
    </html>
  `;

    previewFrame.srcdoc = fullCode;
}

// Event listeners for live updates
htmlEditor.addEventListener("input", updateOutput);
cssEditor.addEventListener("input", updateOutput);
jsEditor.addEventListener("input", updateOutput);

// Dark mode toggle
darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});

// Export to ZIP
exportBtn.addEventListener("click", () => {
    const zip = new JSZip();
    const finalHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Exported Code</title>
      <style>${cssEditor.value}</style>
    </head>
    <body>
      ${htmlEditor.value}
      <script>${jsEditor.value.replace(/<\/script>/g, '<\\/script>')}</script>
    </body>
    </html>
  `.trim();

    zip.file("index.html", finalHTML);
    zip.generateAsync({ type: "blob" }).then(content => {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(content);
        a.download = "divinci-codelab.zip";
        a.click();
    });
});

// Reset all editors
resetBtn.addEventListener("click", () => {
    if (confirm("Clear all code?")) {
        htmlEditor.value = "";
        cssEditor.value = "";
        jsEditor.value = "";
        updateOutput();
    }
});

// Initial render
updateOutput();
