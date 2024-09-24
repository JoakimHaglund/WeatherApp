# HMS Weather Forecast

HMS Weather Forecast is a web application that provides weather forecasts for locations around the world. This project was created by Andreas Siggelin and Joakim Haglund Malm to fulfill the requirements of our Vue Application Project assignment in our Frontend course for our .NET-developer class.

## Part 1: Project Requirements

### Overview
We were tasked with developing a complete application using Vue based on our own ideas. The application was expected to be similar in scope to our earlier TodoMVC assignment or slightly larger.

### Requirements for a passing grade

#### Functionality
- App similar in size to TodoMVC or slightly larger
- Use of example/starter data from a separate JSON file or external API if needed
- Avoid functionality requiring extensive user data input

#### Testing
- 3-10 GUI tests using Playwright

#### JavaScript
- Use Vue (React allowed as an alternative)
- TypeScript optional
- Other libraries/frameworks require approval

#### CSS
- Write CSS from scratch (no frameworks like Bootstrap)
- Responsive design for mobile, tablet, and desktop
- Original graphic design (free fonts/images allowed)

#### HTML
- Write HTML from scratch
- Use semantic HTML where appropriate

#### Code Style
- Consistent indentation and formatting
- Clear naming conventions
- Appropriate comments
- Reasonable function/class division

### Additional Requirements for Grade VG
- Save user data in localStorage
- Implement diagram/graphic functionality using SVG or Canvas
- No libraries allowed for SVG/Canvas implementation

## Part 2: How We Met the Requirements

### Functionality
- HMS Weather Forecast exceeds the scope of TodoMVC, offering comprehensive weather forecast functionality
- We integrated the Open-Meteo API to fetch real-time weather data
- User input is limited to location search, avoiding extensive data entry

### Testing
- Implemented 5 GUI tests using Playwright, covering key user interactions and display elements

### JavaScript
- Utilized Vue.js 3 as our primary framework
- No additional libraries were used without approval

### CSS
- All CSS written from scratch, without the use of frameworks
- Fully responsive design, adapting to mobile, tablet, and desktop views
- Original graphic design with custom SVG icons for weather representations

### HTML
- All HTML written from scratch
- Semantic HTML elements used throughout the application

### Code Style
- Maintained consistent indentation and formatting across all files
- Clear naming conventions for variables, functions, and components
- Appropriate comments included to explain complex logic
- Application organized into logical components and functions

### Higher Grade Requirements
- User preferences and recent searches saved in localStorage
- Custom SVG icons and graphs implemented for weather representation without external libraries

## Features

- Search for weather forecasts by location
- View daily and hourly weather forecasts
- 14-day weather outlook
- Visual weather representation with icons
- Temperature, precipitation, and wind information
- Responsive design for various screen sizes
- Data persistence using localStorage
- SVG implementation for weather icons and graphs

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Vue.js 3
- Open-Meteo API for weather data
- Playwright for testing

## Getting Started

To run this project locally:

1. Clone the repository:
   ```
   git clone https://github.com/your-username/hms-weather-forecast.git
   ```
2. Navigate to the project directory:
   ```
   cd hms-weather-forecast
   ```
3. Open the `index.html` file in your browser or use a local server.

## Running Tests

To run the Playwright tests:

1. Install dependencies:
   ```
   npm install
   ```
2. Run the tests:
   ```
   npx playwright test
   ```

## Collaboration

This project was a collaborative effort between Andreas Siggelin and Joakim Haglund Malm. While we worked together on the application, we produced individual documentation as required.

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgements

- Weather data provided by [Open-Meteo](https://open-meteo.com/)

By creating HMS Weather Forecast, we believe we have met and exceeded the requirements for the Vue Application Project, demonstrating our skills in front-end development, API integration, testing, and user experience design.
