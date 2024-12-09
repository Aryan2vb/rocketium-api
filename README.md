Node.js API with Dummy JSON Data

This project demonstrates a simple Node.js API application that fetches dummy JSON data, stores it on the server, and provides basic functionality like filtering and sorting the data. The application is deployed on Vercel.

Features
	•	Fetches dummy JSON data from an external source
	•	Stores the data on the server
	•	Provides an API to retrieve the data
	•	Allows basic filtering and sorting of the data

Tech Stack
	•	Node.js: JavaScript runtime for the backend
	•	Express.js: Web framework for building the API
	•	Vercel: Deployment platform for serverless applications

Project Setup

1. Clone the Repository

To get started, clone this repository to your local machine:

git clone https://github.com/Aryan2vb/rocketium-api

cd nodejs-dummy-json-api

2. Install Dependencies

Make sure you have Node.js installed. Then, run the following command to install the necessary dependencies:

npm install

3. Set Up the Application

Ensure that the application is correctly set up to run locally. You may need to set up any necessary environment variables (e.g., if using a database or external API). These can be added in a .env file.

4. Running the Application Locally

To start the application locally, run the following command:

npm run dev

This will start the server on http://localhost:3000. You can visit this URL to access the API.

5. API Endpoints
	•	GET /api/data
	•	Retrieves the stored dummy JSON data from the server.
	•	Query parameters:
	•	filter: Optional filter key to filter data (e.g., ?filter=language:Sindhi).
	•	sort: Optional key to sort the data (e.g., ?sort=name).

6. Example Request Using Postman or CURL
	•	Get all data

curl http://localhost:3000/api/data


	•	Get filtered data (example: filter by language)

curl http://localhost:3000/api/data?filter=language:Sindhi


	•	Get sorted data (example: sort by name)

curl http://localhost:3000/api/data?sort=name



Error Handling

The application includes basic error handling for common issues such as:
	•	Missing query parameters
	•	Invalid filter or sort keys
	•	Server errors
