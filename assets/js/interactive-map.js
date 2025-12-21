const initInteractiveMap = (mapping) => {
    const container = document.getElementById('idx-container');
    const svg = document.getElementById('idx-svg-canvas');
    const eventItems = document.querySelectorAll('#idx-events .idx-item');

    function drawLines(eventId) {
        // 1. 清除现有的线条
        svg.querySelectorAll('.idx-line').forEach(l => l.remove());
    
        // 2. 【新增】清除右侧所有行业的高亮状态
        document.querySelectorAll('#idx-sectors .idx-item').forEach(sector => {
            sector.classList.remove('highlight-sector');
        });
    
        const startEl = document.querySelector(`[data-id="${eventId}"]`);
        if (!startEl) return;
    
        const startRect = startEl.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const x1 = startRect.right - containerRect.left;
        const y1 = startRect.top - containerRect.top + (startRect.height / 2);
    
        const targets = myMapping[eventId] || [];
        targets.forEach(targetId => {
            const endEl = document.querySelector(`[data-sector="${targetId}"]`);
            if (!endEl) return;
    
            endEl.classList.add('highlight-sector');
    
            const endRect = endEl.getBoundingClientRect();
            const x2 = endRect.left - containerRect.left - 5;
            const y2 = endRect.top - containerRect.top + (endRect.height / 2);
    
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            const cp = (x1 + x2) / 2;
            line.setAttribute('d', `M ${x1} ${y1} C ${cp} ${y1}, ${cp} ${y2}, ${x2} ${y2}`);
            line.setAttribute('class', 'idx-line');
            line.setAttribute('marker-end', 'url(#arrowhead)');
            
            svg.appendChild(line);
            const length = line.getTotalLength();
            line.style.strokeDasharray = length;
            line.style.strokeDashoffset = length;
            line.getBoundingClientRect(); 
            line.classList.add('line-animation');
        });
    }

    eventItems.forEach(item => {
        item.addEventListener('click', function() {
            eventItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            drawLines(this.dataset.id);
        });
    });

    window.addEventListener('resize', () => {
        const active = document.querySelector('.idx-item.active');
        if (active) drawLines(active.dataset.id);
    });
};