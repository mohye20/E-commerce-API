# eCommerce REST API

This is a REST API built using Node.js and Express.js for eCommerce. It provides endpoints for user authentication, product management, review management, and order management.

## Features

- User registration
- User login and logout
- Product creation, update, deletion, and retrieval
- Review creation, update, deletion, and retrieval
- Order creation, update, deletion, and retrieval
- Image upload for products
- JWT-based authentication

## Tech Stack

**Backend:**

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- joi
- bcrypt
- nodemailer
- multer
- morgan

**Image Upload:**

- Cloudinary API

**Data Storage:**

- MongoDB

**User Authentication:**

- JSON Web Tokens (JWT)

## API Reference

#### User Authentication

- `POST /api/v1/auth/signup` - Register a new user.
- `POST /api/v1/auth/login` - Login with an existing user.

#### User

- `GET /api/v1/users` - Get all users.
- `GET /api/v1/users/:id` - Get single user.
- `GET /api/v1/users/showMe` - Show current user.
- `PATCH /api/v1/users/updateUser` - Update user profile.
- `PATCH /api/v1/users/updateUserPassword` - Update User Password.

#### Products

- `GET /api/v1/products` - Get all products.
- `POST /api/v1/product` - Create a new product.
- `POST /api/v1/products/uploadImage` - Upload an image for a product..
- `GET /api/v1/products/:id` - Get a single product by ID .
- `PATCH /api/v1/products/:id` - Update a product by ID .
- `DELETE /api/v1/products/:id` - Delete a product by ID .
- `GET /api/v1/products/:id/reviews` - Get a single product review.

#### Product Reviews

- `GET /api/v1/reviews` - Get all reviews for a product.
- `POST /api/v1/reviews` - Create a new review for a product.
- `GET /api/v1/reviews/:id` - Get a single review by ID.
- `PATCH /api/v1/reviews/:id` - Update a review by ID.
- `DELETE /api/v1/reviews/:id` - Delete a review by ID.

#### Order

- `GET /api/v1/orders` - Get all orders.
- `POST /api/v1/orders` - Create a order .
- `GET /api/v1/orders/:id` - Get a single order.
- `PATCH /api/v1/orders/:id` - Update a order.
- `GET /api/v1/orders/showAllMyOrder` - Get a current user orders.

## Installation

1. Clone the repository.

```

```

2. Navigate to the project directory.

```
cd E-commerce-API
```

3. Install the dependencies.

```
npm install
```

4. Set the environment variables in a .env file in the root directory of the project.
   Example:

```
PORT = 3000
SECRET_KEY="SekretKeysSecured"
SALT_ROUND = 8
EMAIL=  <Add  Email Here>,
EMAIL_PASSWORD = <Add  password Here>,

MODE = "developement"

CLOUDINARY_CLOUD_NAME = <Add  Cloud Name  Here>,
CLOUDINARY_API_KEY = <Add  Api Key Here>,
CLOUDINARY_API_SECRET = <Add  Api Secret Here>,

```

5. Start the application.

```
npm run dev

```

## Feedback

Please let us know your thoughts on my app by sending any suggestions or feedback to mohye20@gmail.com.

## 🚀 About Me

- Experienced in Node.js and Express.js for backend development
- Ability to create efficient and high-performance server-side applications
- Proficient in using TailwindCSS for creating visually appealing and responsive user interfaces
- Passionate about building user-friendly and efficient applications using cutting-edge technologies
- Always eager to learn new technologies and improve skills to provide the best solutions to clients.

## 🔗 Links

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mohye-elsayed-20504a287/)
