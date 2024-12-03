//Importing bootsrap navbar elements
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
//Arrow function that displays navigation bar with pages Home,create and Read
const NavigationBar = () => {
    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Nav className="me-auto">
                    <Nav.Link href="/home">Home</Nav.Link>
                    <Nav.Link href="/addHealth">Enter health Data</Nav.Link>
                    <Nav.Link href="/readHealth">See Health Data</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;