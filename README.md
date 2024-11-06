# Weather App - Weather Forecast

This is a simple weather forecasting project built with **HTML5**, **CSS3**, and **JavaScript**. The website allows users to get weather information for a city or by postal code, integrating two APIs: **WeatherStack** and **ViaCEP**.

The project was initially developed with PHP but was rewritten using JavaScript for learning purposes and simplification. **WAMP Server** was used during development because the original idea was to implement it with PHP before switching to JavaScript.

## Features

- **Search by city**: The user can enter the name of a city to get weather and climate information.
- **Search by postal code**: The user can also input a postal code, and the system will fetch the city name associated with that postal code via the **ViaCEP** API, then retrieve weather data from the **WeatherStack** API.
- **Displaying weather information**: After the query, the site will show the city name, temperature, weather condition (sunny, cloudy, etc.), humidity, and other relevant data.
- **Local storage**: Weather data is saved in **LocalStorage** for future access, eliminating the need for repeated API calls.

## How It Works

1. The user enters either a city name or a postal code in the input fields.
2. The website checks which field has been filled:
   - If the city field is filled, it queries the **WeatherStack** API to get the weather data.
   - If the postal code field is filled, it queries the **ViaCEP** API to obtain the city name and then retrieves weather data from the **WeatherStack** API.
3. The weather information is displayed on the screen.
4. The retrieved data is saved in **LocalStorage**, allowing the user to view it again without making another API request.

## Technologies Used

- **HTML5**: For structuring the web page content.
- **CSS3**: For styling the page and making it visually appealing.
- **JavaScript**: For handling interactions and making API requests.
- **WeatherStack API**: For fetching weather and climate information.
- **ViaCEP API**: For fetching the city name based on the postal code.
- **WAMP Server**: Used during the initial development with PHP.

## How to Run the Project Locally

To run the project locally, follow these steps:

### Prerequisites

- **WAMP Server**: Required to run the local server.
- **API Key**:
  - Register on [WeatherStack](https://weatherstack.com/) to obtain a free API key.
  - The **ViaCEP** API does not require an API key; it is publicly available.

### Steps to Run:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/repository-name.git

2. **Place the project in the WAMP Server folder**:

Move the project folder into the www folder in your WAMP Server directory.
Create a WeatherStack API key:

3. **Create a WeatherStack API key:**
Go to WeatherStack and register to get your API key.
Replace the API key in the JavaScript file in the appropriate spot (usually in a variable like apiKey).
Start the WAMP Server:

4. **Start the WAMP Server:**
Open the WAMP Server and start Apache.
Open the browser:

5. **Open the browser:**
In the browser, go to http://localhost/repository-name to view the project.
Test the website:

6. **Fill in either the city name or postal code field and see the weather information displayed on the screen.**
Fill in either the city name or postal code field and see the weather information displayed on the screen.
LocalStorage:

7. **If the query is successful, the weather data will be stored in LocalStorage. You can check the stored data by opening the developer console in your browser (F12) and going to the "Application" > "LocalStorage" section.**
If the query is successful, the weather data will be stored in LocalStorage. You can check the stored data by opening the developer console in your browser (F12) and going to the "Application" > "LocalStorage" section.