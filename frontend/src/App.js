import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProductPage } from './pages/ProductPage';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext } from 'react';
import { Store } from './Store';
import { CartPage } from './pages/CartPage';
import { SignInPage } from './pages/SignInPage';
import { NavDropdown } from 'react-bootstrap';
import { ShippingAddressPage } from './ShippingAddressPage';
import { SignUpPage } from './pages/SignUpPage';
import { PaymentMethodPage } from './pages/PaymentMethodPage';
import { PlaceOrderPage } from './pages/PlaceOrderPage';
import { OrderPage } from './pages/OrderPage';
import { OrderHistoryPage } from './pages/OrderHistoryPage';
import { ProfilePage } from './ProfilePage';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };

  return (
    <BrowserRouter>
      <div className="d-flex flex-column ecom-container">
        <ToastContainer position="bottom-center" limit={10} />
        <header>
          <Navbar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>Multimart</Navbar.Brand>
              </LinkContainer>
              <Nav className="me-auto  w-100  justify-content-end">
                <Link to="/cart" className="nav-link">
                  Cart
                  {cart.cartItem.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItem.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>User Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orderhistory">
                      <NavDropdown.Item>Order History</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <Link
                      className="dropdown-link"
                      to="#signout"
                      onClick={signoutHandler}
                      style={{
                        textDecoration: 'none',
                        color: '#404040',
                        marginLeft: '15px',
                      }}
                    >
                      Sign Out
                    </Link>
                  </NavDropdown>
                ) : (
                  <Link
                    to="/signin"
                    className="nan-link"
                    style={{
                      textDecoration: 'none',
                      marginTop: '9px',
                      color: '#808080',
                    }}
                  >
                    Sign In
                  </Link>
                )}
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/product/:slug" element={<ProductPage />}></Route>
              <Route path="/cart" element={<CartPage />}></Route>
              <Route path="/signin" element={<SignInPage />}></Route>
              <Route path="/signup" element={<SignUpPage />}></Route>
              <Route path="/shipping" element={<ShippingAddressPage />}></Route>
              <Route path="/payment" element={<PaymentMethodPage />}></Route>
              <Route path="/placeorder" element={<PlaceOrderPage />}></Route>
              <Route path="/orders/:id" element={<OrderPage />}></Route>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="orderhistory" element={<OrderHistoryPage />}></Route>
              <Route path="/profile" element={<ProfilePage />}></Route>
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">All rights reserve</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
