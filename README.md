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
    b. define reducer
    c. create store provider
    d. implement add to cart button click handler
14. Complete Add to Cart
    a. check exist item in the cart
    b. check count in stock in the backend
15. Create Cart Screen
    a. create two columns
    b. display item list
    c. create action column
16. Complete Cart Screen
    a. click handler for both increase and decrease button
    b. click handler to remove item
    c. click handler for checkout
17. Create SignIn Screen
    a. create sign in form
    b. add email and password
    c.add sign in button
18. Connect To MongoDB Database
    a. connect to mongodb
19. Seed Sample data
    a. create Product model
    b. create user model
    c. create seed route
    d. use route in server.js
    e. seed sample product
20. Seed Sample User
    a. create user model
    b. seed sample user
    c. create user model
21. Create Sign In Backend API
    a. create signin api
    b. npm install jsonwebtoken
    c. define genereateToken
22. Complete Signin Page
    a. handle submit action
    b. save token in store and local storage
    c. show user name in header
23. Create Shipping Screen
    a. create form inputs
    b. handle save shipping address
    c.add checkout wizard bar
24. Create Sign Up Screen
    a. create input forms
    b. handle submit
    c. create backend API
25. Implement Payment Method
    a. create input forms
    b. handle submit
26. Create Place Order Screen
    a. show cart items, payment and address
    b. handle place order action
    c. create order create api
27. Implement Place Order Action
    a. handle place order action
    b. create order create api
28. Create Order Page
    a. create backend api for order/:id
    b. fetch order api in frontend
    c. show order information in two columns
29. Pay Order By Paypal
    a. generate paypal client id
    b. create api to return client id
    c. install react-paypal-js
    d. use PayPalScriptProvider in index.js
    e. implement loadPayPalScipt function
    f. render PayPal Button
    g. implement onApprove payment function
    h. create pay order api in backend
