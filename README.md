# Text Management System

## Overview

This backend system manages and analyzes large volumes of text data, including articles and books. It generates UUIDs for text entries, detects duplicate paragraphs, and compares stored content with text from crawled websites.

## Getting Started

### Prerequisites

- Ensure you have [Node.js](https://nodejs.org/) installed on your machine.
- Ensure you have [MongoDB](https://www.mongodb.com/) installed and configured.

First, run the development server:

1 . **Start MongoDB**: Open a terminal window and run or use mongodb compass:

```bash
mongod 
```

2 . **Install the required packages:**

```bash
npm install
```

3 . **Run the development server**

```bash
npm run dev
```

4 . **Run the tests**

```bash
npm run test
```

## Technologies Used

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express**: A fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB**: A NoSQL database that uses a document-oriented data model.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.
- **UUID**: A library for generating universally unique identifiers.
- **Bcrypt**: A library to help you hash passwords for secure storage.
- **JSON Web Token (JWT)**: A compact, URL-safe means of representing claims to be transferred between two parties.
- **Axios**: A promise-based HTTP client for the browser and Node.js.
- **Cheerio**: A fast, flexible, and lean implementation of core jQuery designed specifically for the server.
- **Swagger**: A tool for documenting APIs, enabling developers to understand and use the API efficiently.

## API Endpoints

- `POST /api/auth/register`: Create a new user account
- `POST /api/auth/login`: Login to account
- `POST /api/text`: Create a new text entry
- `GET /api/text`: Get all text entries
- `POST /api/text/detect-duplicates`: Detect duplicate paragraphs
- `POST /api/text/crawl-and-compare`: Crawl websites and compare text

## Swagger Documentation

<http://localhost:8000/api-docs>
