document.getElementById('digital_clock').addEventListener('mousedown', (e) => {
    window.electron.moveWindow(e.screenX, e.screenY);
});
