(function () {
 
    // Makes animation play once after loaded
    if (sessionStorage.getItem('loaderPlayed')) {
        document.getElementById('jp-loader').remove();
        document.getElementById('jp-wipe-y').remove();
        document.getElementById('jp-wipe-d').remove();
        return;
    }
    sessionStorage.setItem('loaderPlayed', '1');
 
    // tick the number from 0 to 100.
    const LOAD_MS = 2500;
 
    const labels = [
        { until: 40,  text: 'Initializing...' },
        { until: 75,  text: 'Loading Type Shit...' },
        { until: 99,  text: 'Finalizing...' },
        { until: 100, text: 'BOOGSH...' },
    ];
 
    const pctEl   = document.getElementById('jp-pct');
    const labelEl = document.getElementById('jp-label');
 
    function ease(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }
 
    let last = -1;
    const t0 = performance.now();
 
    function tick(now) {
        const raw = Math.min((now - t0) / LOAD_MS, 1);
        const val = Math.floor(ease(raw) * 100);
 
        if (val !== last) {
            last = val;
            pctEl.textContent   = val;
            labelEl.textContent = labels.find(l => val <= l.until)?.text ?? 'Complete';
        }
 
        if (raw < 1) requestAnimationFrame(tick);
    }
 
    requestAnimationFrame(tick);
})();