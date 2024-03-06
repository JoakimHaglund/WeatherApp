
export function createDiagram() {
    const w = 100;
    const h = 100;
    const svg = createSvg(w, h);

    const background = createSvgRect(0, 0, w, h); // Assuming background covers the entire SVG area
    background.setAttribute('fill', 'white');
    svg.append(background);

    createColumns(w, h, 'gray', svg);

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
    for (let i = 0; i < 14; i++) {
        const column = createSvgRect(i * columnWidth * 2 + columnWidth, 0, columnWidth, height);
        column.setAttribute('fill', columnColor);
        svg.append(column);
    }
}
