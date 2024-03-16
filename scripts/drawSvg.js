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

  let tempData = getArrayFromObject(weather.daily, 'temp');
  let windData = getArrayFromObject(weather.daily, 'wind_speed');
  let precipitationData = getArrayFromObject(weather.daily, 'precipitation');
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

  createVerticalText(['-15', '-10', '-5', '0', '5', '10', '15', '20', '25', '°C'], 13, offsetHeight, 10, 'end', '#f11010').forEach(element => {
    svg.append(element);
  });
  createVerticalText(['2', '4', '6', '8', '10', '12', '14', '26', '28', 'mm'], fullWidth - 13, offsetHeight, 10, 'start', '#0370b8').forEach(element => {
    svg.append(element);
  });
  createHorizontalText(timeData, 8, offsetWidth, 'black').forEach(element => {
    svg.append(element);
  });
  svg.append(weatherdata);
  return svg; // Return the SVG container
}
function getArrayFromObject(input, value) {
  let output = [];
  input.forEach(current => {
    output.push(current[value]);
  });
  return output;
}
function createSvgElement(tagName, attributes = null) {
  let svgElement = document.createElementNS('http://www.w3.org/2000/svg', tagName);
  if (attributes) {
    Object.getOwnPropertyNames(attributes).forEach(key => {
      svgElement.setAttribute(key, attributes[key]);
    });
  }
  return svgElement;
}

function createSvg(width, height) {
  const svg = createSvgElement('svg');
  svg.setAttribute('viewBox', '0 0 ' + width + ' ' + height);
  return svg;
};

function createSvgRect(x, y, width, height, color) {
  const rect = createSvgElement('rect', {
    'width': width,
    'height': height,
    'x': x,
    'y': y,
    'fill': color
  });
  return rect;
};

function createPolyline(points, linewidth, height, step, rows, color) {
  let pointString = '';
  let currentStep = step / 2; //place in middle of colum
  let offset = height / (rows + 1) * 2
  points.forEach(point => {
    pointString += currentStep + ',' + (height - linewidth - (point * rows + offset)) + ' ';
    currentStep += step;
  });
  const polyline = createSvgElement('polyline', {
    'fill': 'none',
    'stroke': color,
    'stroke-width': 0.5,
    'points': pointString
  });

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
    let line = createSvgElement('line', {
      'x1': 0,
      'x2': width,
      'y1': CalculatedLineHeight,
      'y2': CalculatedLineHeight,
      'stroke': 'black',
      'stroke-width': lineHeight,
      'stroke-opacity': opacity,
    });
    lines.push(line);
  }

  return lines;
};

function createVerticalText(text, xPos, height, lineamount, textAlignment, color) {
  let fontSize = 5
  let texts = [];
  let step = height / (lineamount);
  // Loopa genom arrayen och skapa varje linje
  for (let i = 0; i < lineamount; i++) {
    let CalculatedLineHeight = height - (step * i) - (step) + 11
    let textElement = createSvgElement('text', {
      'x': xPos,
      'y': CalculatedLineHeight,
      'font-family': "'Montserrat', Roboto, Arial, Helvetica, sans-serif",
      'font-size': fontSize + 'px',
      'font-weight': 'bolder',
      'text-anchor': textAlignment,
      'fill': color
    });
    textElement.textContent = text[i];

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
    let textElement = createSvgElement('text', {
      'x': currentStep + 15,
      'y': yPos,
      'font-family': '"Montserrat", Roboto, Arial, Helvetica, sans-serif',
      'font-size': fontSize + 'px',
      'font-weight': 'bolder',
      'text-anchor': 'middle',
      'fill': color
    });
    textElement.textContent = text[i];
    texts.push(textElement);
    currentStep += step;
  }

  return texts;
};