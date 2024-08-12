# Music Repository

## Overview

This project is a **Music Repository** application built using **Node.js**. The application allows users to manage records of music albums, artists, customers, and purchases. The application utilizes a MySQL database to store data, and it features a web-based interface for interacting with the data. The front-end is powered by **Handlebars** templates, and the application is styled with custom CSS.

## Features

- **CRUD Operations**: Perform Create, Read, Update, and Delete operations on Albums, Artists, Customers, and Purchases.
- **Search Functionality**: Users can search for specific albums, customers, or artists.
- **Dynamic Updates**: The interface dynamically updates to reflect changes made to the database.

## Prerequisites

- **Node.js** (v14 or later recommended)
- **npm** (Node Package Manager)
- **MySQL** Database Server

## Installation

1. **Clone the Repository**:  
   Clone this repository to your local machine using:
   ```bash
   git clone <repository-url>

2. **Navigate to the Project Directory:**
    ```bash
    cd <project-directory>

3. **Install Dependencies:**
    Run the following command to install the necessary Node.js modules:
    ```bash
    npm install

4. **Set Up the Database:**
    Import the DDL.sql file located in the database directory into your MySQL server to create the required tables and insert sample data.
    Configure your database connection in the db-connector.js file with your MySQL credentials.

## Running the Application

1. **Start the Application:**
    Run the following in your terminal
    ```bash
    node app.js

2. **Access the Application:**
    Open a web browser and go to:
    http://localhost:1922 (or replace with port # set in app.js)


## Citation for referenced code:
Based off of "osu-cs340-ecampus/nodejs-starter-app"
