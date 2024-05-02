# eCommerce REST API

This is a REST API built using Node.js and Express.js for eCommerce. It provides endpoints for user authentication, product management, review management, and order management.

documentation: https://documenter.getpostman.com/view/29973719/2sA3JFA4JB
## Features

- User registration
- User login and logout
- Product creation, update, deletion
- category creation, update, deletion
- sub category creation, update, deletion
- Review creation, update, deletion, 
- Order creation, update, deletion, 
- Image upload for products
- JWT-based authentication
- online payment by stripe

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
- stripe
- dotenv
- pdfkit
- slugify   

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

- `GET /api/v1/user/all` - Get all users.
- `GET /api/v1/user` - Show current user.
- `PATCH /api/v1/user/` - Update user profile.

#### Products

- `GET /api/v1/product` - Get all products.
- `POST /api/v1/product` - Create a new product.
- `GET /api/v1/product/:slug` - Get a single product by slug .
- `PATCH /api/v1/product/:slug` - Update a product by slug .
- `DELETE /api/v1/product/:slug` - Delete a product by slug .


#### Product Reviews

- `GET /api/v1/product/slug/review` - Get all reviews for a product.
- `POST api/v1/product/slug/review` - Create a new review for a product.
- `GET /api/v1/reviews/:id` - Get a single review by slug.
- `PATCH /api/v1/reviews/:id` - Update a review by slug.
- `DELETE /api/v1/product/slug/review` - Delete a review by slug.

#### brand Reviews

- `POST /api/v1/brand` - Create a new brand .
- `GET /api/v1/brand/` - Get a all brands.
- `PUT /api/v1/brand/slug` - Update a brand by slug.
- `DELETE api/v1/brand/slug` - Delete a brand by slug.


#### Order

- `GET /api/v1/orders` - Get all orders.
- `POST /api/v1/orders` - Create a order .
- `GET /api/v1/orders/:id` - Get a single order.
- `PATCH /api/v1/orders/:id` - Update a order.
- `GET /api/v1/orders/showAllMyOrder` - Get a current user orders.


#### see More 
https://documenter.getpostman.com/view/29973719/2sA3JFA4JB

## Installation

1. Clone the repository.

```
https://github.com/mohye20/E-commerce-API.git
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
PORT = PORT
SECRET_KEY="SECRET_KEY"
SALT_ROUND = SALT_ROUND
EMAIL=  "EMAIL",
EMAIL_PASSWORD = "EMAIL_PASSWORD"
MODE = "MODE"
DB_STRING = "DB_STRING"

CLOUDINARY_CLOUD_NAME = "CLOUDINARY_CLOUD_NAME"
CLOUDINARY_API_KEY = "CLOUDINARY_API_KEY"
CLOUDINARY_API_SECRET = "CLOUDINARY_API_SECRET-nSc3MFHe3uPfMt0"



STRIPE_SECRET_KEY = "STRIPE_SECRET_KEY"
STRTIPE_WEBHOOK_SECRET_KEY="STRTIPE_WEBHOOK_SECRET_KEY"


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
