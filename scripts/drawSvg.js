
export function createDiagram(weather) {
    const w = 400;
    const h = 100;
    const svg = createSvg(w, h);

    const background = createSvgRect(0, 0, w, h); // Assuming background covers the entire SVG area
    background.setAttribute('fill', 'white');
    svg.append(background);

    createColumns(w, h, 'lightgray', svg);
    createLines(w, svg);
    if(weather.temperature_2m_max){
        //handle data 
        let background = createSvgRect(weather.temperature_2m_max[0] *10 -10, 0, weather.temperature_2m_max[0] *10, weather.temperature_2m_max[0] *10+40); // Assuming background covers the entire SVG area
    background.setAttribute('fill', 'pink');
    svg.append(background);
     background = createSvgRect(weather.temperature_2m_max[1] *10 -10, 0, weather.temperature_2m_max[1] *10, weather.temperature_2m_max[1] *10+40); // Assuming background covers the entire SVG area
    background.setAttribute('fill', 'pink');
    svg.append(background);
    background = createSvgRect(weather.temperature_2m_max[2] *10 -10, 0, weather.temperature_2m_max[2] *10, weather.temperature_2m_max[2] *10+40); // Assuming background covers the entire SVG area
    background.setAttribute('fill', 'pink');
    svg.append(background);
    }

    
    return svg; // Return the SVG container
}
export function createSvgElement(tagName) {
    return document.createElementNS('http://www.w3.org/2000/svg', tagName);
}
export function createSvg(width, height) {
    let element = document.querySelector('#svg');
    const svg = createSvgElement('svg');
    svg.setAttribute('viewBox', '0 0 ' + width + ' ' + height);
    element.appendChild(svg);
    return svg;
}

export function createSvgRect(x, y, width, height) {
    const rect = createSvgElement('rect');
    rect.setAttribute('width', width);
    rect.setAttribute('height', height);
    rect.setAttribute('x', x);
    rect.setAttribute('y', y);
    return rect;
}

export function createColumns(width, height, columnColor, svg) {
    const columnWidth = width / 14; // Assuming 14 columns
    const opacity = 0.3;
    for (let i = 0; i < 14; i++) {
        const column = createSvgRect(i * columnWidth * 2 + columnWidth, 0, columnWidth, height);
        column.setAttribute('fill', columnColor);
        column.setAttribute('fill-opacity', opacity);
        svg.append(column);
    }
}

export function createLines(width, svg) {
    let lineHeight = 0.5;
    let opacity = 0.3;

    // Definiera färgerna och höjderna för varje linje
    const lines = [
        { color: 'lightblue', height: 100 },
        { color: 'lightgrey', height: 80 },
        { color: 'lightgrey', height: 60 },
        { color: 'lightgrey', height: 40 },
        { color: 'lightgrey', height: 20 }
    ];

    // Loopa genom arrayen och skapa varje linje
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        let axisLine = createSvgRect(0, line.height - lineHeight, width, lineHeight);
        axisLine.setAttribute('fill', line.color);
        axisLine.setAttribute('fill-opacity', opacity);
        svg.append(axisLine);
    }

    return svg;
}

