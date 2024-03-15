export function createDiagram(weather) {
  const fullWidth = 420;
  const fullHeight = 210;

  let offsetX = 30;
  let offsety = 10;
  let offsetWidth = fullWidth - offsetX;
  let offsetHeight = fullHeight - offsety;
  const svg = createSvg(fullWidth, fullHeight);

  const background = createSvgRect(0, 0, offsetWidth, offsetHeight, 'white'); // Assuming background covers the entire SVG area
  background.setAttribute('fill-opacity', 0.4);
  let weatherdata = createSvgElement('g');
  weatherdata.setAttribute('transform', 'translate(' + offsetX / 2 + ',' + offsety + ')')
  weatherdata.append(background);
  let tempData = [];
  weather.daily.forEach(daily => {
    tempData.push(daily.temp);
  });
  let windData = [];
  weather.daily.forEach(daily => {
    windData.push(daily.wind_speed);
  });
  let precipitationData = [];
  weather.daily.forEach(daily => {
    precipitationData.push(daily.precipitation);
  });
  let timeData = [];
  weather.daily.forEach(daily => {
    timeData.push(daily.time.replace(/\d\d\d\d-/i, ''));
  });

  createColumns(offsetWidth, offsetHeight, 'gray').forEach(element => {
    weatherdata.append(element);
  });

  createLines(offsetWidth, offsetHeight, 10).forEach(element => {
    weatherdata.append(element);
  });
  createPercipitationColumns(precipitationData, offsetWidth, offsetHeight, 5, 1, '#40b1fd').forEach(element => {
    weatherdata.append(element);
  });
  weatherdata.append(createPolyline(tempData, 0.5, offsetHeight, offsetWidth / tempData.length, 4, 'red'));
  weatherdata.append(createPolyline(windData, 0.5, offsetHeight, offsetWidth / windData.length, 4, 'purple'));

  createtext(['-15', '-10', '-5', '0', '5', '10', '15', '20', '25', '°C'], 13, offsetHeight, 10, 'end', '#f11010').forEach(element => {
    svg.append(element);
  });
  createtext(['2', '4', '6', '8', '10', '12', '14', '26', '28', 'mm'], fullWidth - 13, offsetHeight, 10, 'start', '#0370b8').forEach(element => {
    svg.append(element);
  });
  createHorizontalText(timeData, 8, offsetWidth, 'black').forEach(element => {
    svg.append(element);
  });
  svg.append(weatherdata);
  return svg; // Return the SVG container
}
function createSvgElement(tagName) {
  return document.createElementNS('http://www.w3.org/2000/svg', tagName);
}
function createSvg(width, height) {
  const svg = createSvgElement('svg');
  svg.setAttribute('viewBox', '0 0 ' + width + ' ' + height);
  return svg;
};
function createSvgRect(x, y, width, height, color) {
  const rect = createSvgElement('rect');
  rect.setAttribute('width', width);
  rect.setAttribute('height', height);
  rect.setAttribute('x', x);
  rect.setAttribute('y', y);
  rect.setAttribute('fill', color);
  return rect;
};
function createPolyline(points, linewidth, height, step, rows, color) {
  const polyline = createSvgElement('polyline');
  let pointString = '';
  let currentStep = step / 2; //place in middle of colum
  let offset = height / (rows + 1) * 2
  points.forEach(point => {
    pointString += currentStep + ',' + (height - linewidth - (point * rows + offset)) + ' ';
    currentStep += step;
  });
  polyline.setAttribute('fill', 'none');
  polyline.setAttribute('stroke', color);
  polyline.setAttribute('stroke-width', 0.5);
  polyline.setAttribute('points', pointString);
  return polyline;
};
function createColumns(width, height, columnColor) {
  const columnWidth = width / 14; // Assuming 14 columns
  const opacity = 0.3;
  let columns = [];
  for (let i = 0; i < 7; i++) {
    const column = createSvgRect(i * columnWidth * 2 + columnWidth, 0, columnWidth, height);
    column.setAttribute('fill', columnColor);
    column.setAttribute('fill-opacity', opacity);
    columns.push(column);
  }
  return columns;
};
function createPercipitationColumns(Data, width, height, heightStep, offset, columnColor) {
  const columnWidth = width / Data.length; // Assuming 14 columns
  const opacity = 0.8;
  let columns = [];
  for (let i = 0; i < Data.length; i++) {
    let column = createSvgRect(
      i * columnWidth + offset / 2,
      height - Data[i] * height / 20,
      columnWidth - offset,
      height,
      columnColor);
    column.setAttribute('fill-opacity', opacity);
    columns.push(column);
  }
  return columns;
};
function createLines(width, height, lineamount) {
  let lineHeight = 0.5;
  let opacity = 0.3;
  let lines = [];
  //lineamount = lineamount*5
  let step = height / (lineamount);
  // Loopa genom arrayen och skapa varje linje
  for (let i = 0; i < lineamount; i++) {
    let CalculatedLineHeight = height - (step * i) - (step + (lineHeight))
    let line = createSvgElement('line');
    line.setAttribute('x1', 0);
    line.setAttribute('x2', width);
    line.setAttribute('y1', CalculatedLineHeight);
    line.setAttribute('y2', CalculatedLineHeight);
    line.setAttribute('stroke', 'black');
    line.setAttribute('stroke-width', lineHeight);
    line.setAttribute('stroke-opacity', opacity);
    lines.push(line);
  }

  return lines;
};
function createtext(text, xPos, height, lineamount, textAlignment, color) {
  let fontSize = 5
  let texts = [];
  let step = height / (lineamount);
  // Loopa genom arrayen och skapa varje linje
  for (let i = 0; i < lineamount; i++) {
    let CalculatedLineHeight = height - (step * i) - (step) + 11
    let textElement = createSvgElement('text');

    textElement.textContent = text[i];
    textElement.setAttribute('x', xPos);
    textElement.setAttribute('y', CalculatedLineHeight);
    textElement.setAttribute("font-family", '"Montserrat", Roboto, Arial, Helvetica, sans-serif');
    textElement.setAttribute("font-size", fontSize + 'px');
    textElement.setAttribute("font-weight", 'bolder');
    textElement.setAttribute('text-anchor', textAlignment);
    textElement.setAttribute('fill', color)

    texts.push(textElement);
  }

  return texts;
};
function createHorizontalText(text, yPos, width, color) {
  let fontSize = 5
  let texts = [];
  let step = (width / text.length);
  let currentStep = step / 2;
  // Loopa genom arrayen och skapa varje linje
  for (let i = 0; i < text.length; i++) {
    let textElement = createSvgElement('text');

    textElement.textContent = text[i];
    textElement.setAttribute('x', currentStep + 15);
    textElement.setAttribute('y', yPos);
    textElement.setAttribute("font-family", '"Montserrat", Roboto, Arial, Helvetica, sans-serif');
    textElement.setAttribute("font-size", fontSize + 'px');
    textElement.setAttribute("font-weight", 'bolder');
    textElement.setAttribute('text-anchor', 'middle');
    textElement.setAttribute('fill', color)

    texts.push(textElement);
    currentStep += step;
  }

  return texts;
};