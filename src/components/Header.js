import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Header = (props) => {
  return (
    <header className="header-section">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Sell My Stuff</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#"> USD Balance: ${props.balance}</Nav.Link>
  
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
      
      {/* header-bottom end */}
    </header>
  );
};

export default Header;
