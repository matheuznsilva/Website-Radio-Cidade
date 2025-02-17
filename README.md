# WEBSITE RADIO CIDADE WEB

This repository has Radio Cidade Web website

## Requisitos

<div> 
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&amp;logo=html5&amp;logoColor=white" alt="html"> 
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&amp;logo=css3&amp;logoColor=white" alt="css"> 
  <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&amp;logo=javascript&amp;logoColor=F7DF1E" alt="javascript"> 
  <!-- <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&amp;logo=python&amp;logoColor=white" alt="python"> 
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&amp;logo=docker&amp;logoColor=white" alt="docker">  -->
</div>

## Requirements for Running the Application with Docker

- Docker: To build and run the container.
- Docker Compose: (optional, if you use additional services, such as a database).

### How to run the application with Docker

Here are the steps to run the application in a Docker environment. This will allow you to run the Python Flask server with all the required dependencies inside an isolated container.

### Clone the repository

First, clone the repository to your local machine:

    $ git clone https://github.com/seu-usuario/my-portfolio.git
    $ cd my-portfolio

### Build and run Docker

Build the Docker image and run the container. In the project directory, run the following commands:

#### To build the image:

    $ docker build -t my-flask-app .

#### To run the container:

    $ docker run -p 3000:3000 my-flask-app

If you are using Docker Compose, run the command below:

    $ docker-compose up --build

#### Access the Application

The application will be running via a Docker container. To access it in your browser, type the URL:

    $ http://localhost:3000

#### Stop the Application

To stop the application and the container, simply press Ctrl+C in the terminal where Docker is running or, if you are using Docker Compose:

    $ docker-compose down

## Project Status

**Project Status: Functional**

Although the project is in an advanced stage, it requires some adjustments and improvements to become fully completed.

**Current achievements:**

- Home page in English and Portuguese (with a button to perform the language transition of the pages).
- Sending of contact message.

**Next steps:**

- Adjust layout and style details.
- Execute tests and fix bugs.
- Refactor the code to increase efficiency and maintainability.
- This project is still a work in progress and requires some improvements to reach its final version.