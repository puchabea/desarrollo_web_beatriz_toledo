document.querySelectorAll('.clickable').forEach(row => {
    row.addEventListener('click', () => {
        window.location.href = row.dataset.url;
    });
});