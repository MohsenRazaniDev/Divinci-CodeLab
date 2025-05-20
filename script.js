const htmlEditor = document.getElementById('htmlEditor');
const cssEditor = document.getElementById('cssEditor');
const jsEditor = document.getElementById('jsEditor');
const outputFrame = document.getElementById('output');
const resetBtn = document.getElementById('resetBtn');
const exportBtn = document.getElementById('exportBtn');
const themeToggle = document.getElementById('toggleTheme');

// Live preview
function updateOutput() {
    const html = htmlEditor.value;
    const css = `<style>${cssEditor.value}</style>`;
    const js = `<script>${jsEditor.value}<\/script>`;
    outputFrame.srcdoc = `
    <!DOCTYPE html><html><head>${css}</head><body>${html}${js}</body></html>
  `;

    localStorage.setItem('htmlCode', html);
    localStorage.setItem('cssCode', cssEditor.value);
    localStorage.setItem('jsCode', jsEditor.value);
}

// Restore saved code
function restoreFromStorage() {
    htmlEditor.value = localStorage.getItem('htmlCode') || '';
    cssEditor.value = localStorage.getItem('cssCode') || '';
    jsEditor.value = localStorage.getItem('jsCode') || '';
    updateOutput();
}

// Reset editors
function resetEditors() {
    htmlEditor.value = '';
    cssEditor.value = '';
    jsEditor.value = '';
    updateOutput();
}

// Export to ZIP
function exportProject() {
    const zip = new JSZip();
    zip.file('index.html', htmlEditor.value);
    zip.file('style.css', cssEditor.value);
    zip.file('script.js', jsEditor.value);
    zip.generateAsync({ type: 'blob' }).then(content => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(content);
        a.download = 'divinci-codelab.zip';
        a.click();
    });
}

// Theme toggle
function toggleTheme() {
    const root = document.documentElement;
    const theme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

function restoreTheme() {
    const saved = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
}

// Line numbers
function updateLineNumbers(editor, lineEl) {
    const lines = editor.value.split('\n').length;
    lineEl.innerHTML = '';
    for (let i = 1; i <= lines; i++) {
        lineEl.innerHTML += i + '<br>';
    }
}

// Events
[htmlEditor, cssEditor, jsEditor].forEach((editor, index) => {
    const lineEl = document.getElementById(`${editor.id.replace('Editor', 'Lines')}`);
    editor.addEventListener('input', () => {
        updateOutput();
        updateLineNumbers(editor, lineEl);
    });
    editor.addEventListener('scroll', () => {
        lineEl.scrollTop = editor.scrollTop;
    });
});

resetBtn.addEventListener('click', resetEditors);
exportBtn.addEventListener('click', exportProject);
themeToggle.addEventListener('click', toggleTheme);

// Init
restoreFromStorage();
restoreTheme();
updateLineNumbers(htmlEditor, document.getElementById('htmlLines'));
updateLineNumbers(cssEditor, document.getElementById('cssLines'));
updateLineNumbers(jsEditor, document.getElementById('jsLines'));
