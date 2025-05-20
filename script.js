const htmlEditor = document.getElementById('htmlEditor');
const cssEditor = document.getElementById('cssEditor');
const jsEditor = document.getElementById('jsEditor');
const outputFrame = document.getElementById('outputFrame');
const darkModeToggle = document.getElementById('darkModeToggle');
const exportBtn = document.getElementById('exportBtn');

function updateOutput() {
    const html = htmlEditor.value;
    const css = `<style>${cssEditor.value}</style>`;
    const js = `<script>${jsEditor.value.replace(/<\/script>/g, '<\\/script>')}<\/script>`;

    const completeContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head><meta charset="UTF-8"><title>Preview</title>${css}</head>
    <body>${html}${js}</body>
    </html>
  `;

    // تبدیل به Blob
    const blob = new Blob([completeContent], { type: 'text/html' });
    const blobUrl = URL.createObjectURL(blob);
    outputFrame.src = blobUrl;
}

// رندر اولیه و آپدیت‌های زنده
[htmlEditor, cssEditor, jsEditor].forEach(editor => {
    editor.addEventListener('input', updateOutput);
});
updateOutput();

// مدیریت تم دارک
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    darkModeToggle.textContent = document.body.classList.contains('dark') ? 'Light Mode' : 'Dark Mode';
});

// دکمه Export (فعلاً پیغام موقت)
exportBtn.addEventListener('click', () => {
    alert('Export ZIP will be implemented in the next phase!');
});
