# Node.js API with Dummy JSON Data

This project demonstrates a simple Node.js API application that fetches dummy JSON data, stores it on the server, and provides basic functionality like filtering and sorting the data. The application is deployed on **Vercel**.

## Features
- Fetches dummy JSON data from an external source.
- Stores the data on the server.
- Provides an API to retrieve the data.
- Allows basic filtering and sorting of the data.

---

## Tech Stack
- **Node.js**: JavaScript runtime for the backend.
- **Express.js**: Web framework for building the API.
- **Vercel**: Deployment platform for serverless applications.

---

## Project Setup

### 1. Clone the Repository
To get started, clone this repository to your local machine:

```bash
git clone https://github.com/Aryan2vb/rocketium-api
cd nodejs-dummy-json-api
```

2. Install Dependencies

Ensure you have Node.js installed. Then, run the following command to install the required dependencies:
```
npm install
```
3. Set Up the Application

Set up the application to run locally. Create a .env file if needed, and configure any required environment variables (e.g., for a database or external API).

4. Running the Application Locally

Start the application locally using:
```
npm run dev
```
The server will start at http://localhost:3000. Use this URL to access the API.

API Endpoints
```
GET /api/data
```
Retrieves the stored dummy JSON data from the server.

Query Parameters:
	•	filter: Optional filter key to filter data (e.g., ?filter=language:Sindhi).
	•	sort: Optional key to sort the data (e.g., ?sort=name).

Example Requests

Get All Data
```
curl http://localhost:3000/api/data
```
Get Filtered Data (e.g., filter by language):
```
curl http://localhost:3000/api/data?filterKey=language&filterValue=Sindhi
```
Get Sorted Data (e.g., sort by name in ascending order):
```
curl http://localhost:3000/api/data?sortKey=name&sortOrder=asc
```
Error Handling

The application includes basic error handling for:
	•	Missing query parameters.
```
{ "error": "Missing required query parameters: filterKey or sortKey" }
```
	•	Invalid filter or sort keys.
	•	General server errors.



