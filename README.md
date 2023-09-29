# MERN ECOMMERCE

# Procedures

1. Create react App using npx
2. Install tools
3. Create Navbar in App.js
4. Create Featured Products
5. Adding Router
6. Create Node.js server in backend
   a. Run npm init in the root folder
   b. Update package.json set type: module
   c. Add .js to imports
   d. npm install express.js
   e. Create server.js
   f. Add start command as node backend/server.js
   g. require express
   h. create router for / return backend is ready
   i. move products.js from frontend to backend
   j. create route for /api/products
   k. return products
   l. run npm start
7. Fetch Products from backend
   a. npm install axios
   b. use state hook
   c. use effect hook
   d. use reducer hook
8. Manage State using reducer hook
   a. define reducer
   b. update fetch data
   c. get state from useReducer
9. Add bootstrap UI framework
   a. npm install react-bootstrap bootstrap
   b. update App.js
10. Creaate Product and Product component
    a. create rating component
    b. create product component
    c. use Rating component in Product component
11. Create Product Details Screen
    a. fetch product from backend
    b. create 3 columns for image, details and action
12. Create Loading and Message Component
    a. create loading component
    b. use spinner component
    c. create message component
    d. create utils.js to define getError function
13. Implement Add to Cart
    a. create react context
    b define reducer
    c. create store provider
    d. implement add to cart button click handler
