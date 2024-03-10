# Mern Backend Application

![GitHub repo size](<https://img.shields.io/github/repo-size/mces58/Mern?color=violet&style=for-the-badge&label=Repo+Size&labelColor=rgb(56,56,56)>) ![GitHub code size in bytes](<https://img.shields.io/github/languages/code-size/mces58/Mern?color=violet&style=for-the-badge&label=Code+Size&labelColor=rgb(56,56,56)>) ![GitHub followers](<https://img.shields.io/github/followers/mces58?color=violet&style=for-the-badge&label=Followers&labelColor=rgb(56,56,56)>) ![GitHub Repo stars](<https://img.shields.io/github/stars/mces58/Mern?color=violet&style=for-the-badge&label=Repo+Stars&labelColor=rgb(56,56,56)>) ![GitHub language count](<https://img.shields.io/github/languages/count/mces58/Mern?color=violet&style=for-the-badge&label=Used+Languages&labelColor=rgb(56,56,56)>) ![GitHub top language](<https://img.shields.io/github/languages/top/mces58/Mern?color=violet&style=for-the-badge&label=Top+Language&labelColor=rgb(56,56,56)>) ![GitHub commit activity](<https://img.shields.io/github/commit-activity/t/mces58/Mern?color=violet&style=for-the-badge&label=Commit+Activity&labelColor=rgb(56,56,56)>) ![GitHub last commit](<https://img.shields.io/github/last-commit/mces58/Mern?color=violet&style=for-the-badge&label=Last+Commit&labelColor=rgb(56,56,56)>)

This is a backend application written in Node.js. It serves as the server-side component for your application.

## Table of Contents

- [Project Description](#project-description)
- [Technologies](#technologies)
- [Installation](#installation)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Project Description

This Node.js application has been developed to provide users with comprehensive management of products. The application offers users the ability to perform CRUD (Create, Read, Update, Delete) operations, allowing them to add, view, update, and delete products. Additionally, authorization (auth) processes have been integrated to ensure secure access to the application.

Once users register and log in to the application, they can securely manage their personal information. Authorization processes have been effectively implemented to ensure that users have access to only their own data and the authority to update this data.

The application is designed to meet the security standards required for modern web applications. Leveraging the flexibility and performance advantages of Node.js, the application ensures fast and efficient operation.

## Technologies

- Express
- Mongo (Mongoose)
- RESTful API
- Babel
- Webpack
- PM2
- ESLint & Prettier

## Installation

##### Step 1: Clone the Repository

Open your terminal or command prompt and navigate to the directory where you want to clone the project. Then, run the following command:

```bash
git clone https://github.com/mces58/Mern.git
```

#### Step 2: Navigate to the Project Directory

Enter the project directory:

```bash
cd [project_directory]
```

Replace `[project_directory]` with the name of the cloned project directory.

#### Step 3: Install Dependencies

Run the following command to install the project dependencies listed in the package.json file:

```bash
npm install
```

This will download and install all the necessary packages, including Express, Mongoose, Babel, Webpack, pm2, ESLint, and Prettier.

#### Step 4: Configure the Environment

This will download and install all the necessary packages, including Express, Mongoose, Babel, Webpack, pm2, ESLint, and Prettier.

Example .env file:

```bash
PORT=4000
MONGO_URI=mongodb://localhost:27017/your_database_name
```

#### Step 5: Build the Project (If using Webpack)

If your project uses Webpack for bundling, run the build command:

```bash
npm run build:webpack-prod
```

#### Step 6: Start the Application

Run the following command to start the Node.js application:

```bash
npm start
```

## API Documentation

#### 1) Shop Endpoints

- Get All Products
  Endpoint

  ```bash
  /api/v1/products
  ```

  Description
  Get list of all products without logging in.

  Request

  ```plaintext
  GET /api/v1/products
  ```

  Response

  ```json
  {
    "success": true,
    "productsCount": 10,
    "resultsPerPage": 10,
    "products": [
      {
        "_id": "Id 1",
        "title": "Title 1",
        "description": "Description 1",
        "price": 1,
        "images": [
          {
            "public_id": "Public Id",
            "url": "Url"
          }
        ],
        "rating": 1,
        "warranty": 1,
        "seller": "Seller",
        "label": {
          "brand": "Brand Name",
          "model": "Model Name"
        },
        "category": {
          "mainCategory": "Main Category",
          "subCategory": "Sub Category"
        },
        "stock": {
          "body": [
            {
              "size": "1",
              "quantity": 1
            }
          ],
          "color": "color"
        },
        "promotion": null,
        "serialCode": "Serial Code",
        "reviews": [],
        "createdAt": "2023-12-18T11:39:35.280Z"
      }
      // ... more products
    ]
  }
  ```

- Get Product By Id
  Endpoint

  ```bash
  /api/v1/products/:id
  ```

  Description
  Get a specific product by its ID without logging in.

  Request

  ```plaintext
  GET /api/v1/products/:id
  ```

  Response

  ```json
  {
    "success": true,
    "product": {
      "_id": "Id 1",
      "title": "Title 1",
      "description": "Description 1",
      "price": 1,
      "images": [
        {
          "public_id": "Public Id",
          "url": "Url"
        }
      ],
      "rating": 1,
      "warranty": 1,
      "seller": null,
      "label": {
        "brand": "Brand Name",
        "model": "Model Name"
      },
      "category": {
        "mainCategory": "Main Category",
        "subCategory": "Sub Category"
      },
      "stock": {
        "body": [
          {
            "size": "1",
            "quantity": 1
          }
        ],
        "color": "Color"
      },
      "promotion": null,
      "serialCode": "Serial Code",
      "reviews": [],
      "createdAt": "2023-12-18T12:52:30.569Z"
    }
  }
  ```

#### 2) Admin Endpoints

## Contributing

Explain how others can contribute to your project. Include guidelines for submitting bug reports, feature requests, and pull requests. Provide information on how to set up a development environment and run tests.

## License

Specify the license under which your project is released. Include a link to the license file.
