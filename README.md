# Contact Management App with Charts and Maps - Running Instructions and API Information

This brief documentation outlines how to run the Contact Management App with Charts and Maps, including information on the API endpoints used.

Follow these steps to run the Contact Management App on your local machine:

1. Clone the Repository:

First, clone the Git repository containing the app to your local machine.
You can use Git to clone the repository with the following command:

# git clone https://github.com/chirag2600/taiyo.ai-contact-management.git

2. Navigate to the Project Directory:

Open your terminal or command prompt and navigate to the project directory using the cd command:

# cd contact-management-app

3. Install Dependencies:

Before running the app, you need to install its dependencies. Use the following command to install them:
Copy code

# npm install

4. Start the Development Server:

Once the dependencies are installed, start the development server with the following command:

# npm start

5. Access the App:

After successfully starting the development server, the app should be accessible in your web browser. Open a web browser and go to the following URL:

# http://localhost:3000

API Endpoint Information:

The Contact Management App uses the following API endpoints to fetch data:

-> Worldwide Data of Cases:

API Endpoint: https://disease.sh/v3/covid-19/all

Purpose: This endpoint provides global COVID-19 statistics, including the total number of cases, deaths, recovered cases, and more.

-> Country-Specific Data of Cases:

API Endpoint: https://disease.sh/v3/covid-19/countries

Purpose: This endpoint provides country-specific COVID-19 statistics, including cases, deaths, recovered cases, and more. It is used to populate the map markers with country-specific data.

-> Graph Data for Cases with Date:

API Endpoint: https://disease.sh/v3/covid-19/historical/all?lastdays=all

Purpose: This endpoint provides historical COVID-19 data for worldwide cases, including the number of cases on different dates.
It is used to generate the line graph showing cases fluctuations over time.

Notes:

Ensure that you have Node.js and npm (Node Package Manager) installed on your machine before running the app.
The app is designed to be responsive and should work well on both desktop and mobile devices.
Conclusion:

Following these instructions will allow you to run the Contact Management App with Charts and Maps locally on your machine. Additionally, the app leverages the mentioned API endpoints to fetch COVID-19 data and display it in the app's dashboards and maps.
