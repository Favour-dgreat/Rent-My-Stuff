import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const AddItem = (props) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState();
  const [contact, setContact] = useState("");
  const [isSale] = useState(true);
  const [description, setDescription] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(name, image,location, price, contact, description,isSale);
    props.addToItems({
      name,
      description,
      image,
      location,
      price,
      contact,
      isSale,
    });
    setName("");
    setImage("");
    setLocation("");
    setPrice("");
    setContact("");
    setDescription("");
  };


  return (
    <section id="0" className="pt-120 pb-120 bg-dark text-light">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title text-light" style={{paddingTop: "40px"}}>Place your Item for Sale</h2>
          <p> Kindly fill this form to place your item for Sale on <b>Sell My Stuff.Ng</b></p>
        </div>
      <Form style={{paddingBottom: "40px"}} onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>Name of Item</Form.Label>
        <Form.Control type="text" placeholder="Name of Item" required  value={name}
                  onChange={(e) => setName(e.target.value)}/>
        {/* <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text> */}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>Image URL of Item</Form.Label>
        <Form.Control type="text" placeholder="Image URL of item"
                  required
                  value={image}
                  onChange={(e) => setImage(e.target.value)}/>
        {/* <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text> */}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>Location</Form.Label>
        <Form.Control type="text" placeholder="Location (Country/State)"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}/>
        {/* <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text> */}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>Price of Item</Form.Label>
        <Form.Control type="text" placeholder="Price in ($)"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}/>
        {/* <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text> */}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>Contact Details</Form.Label>
        <Form.Control type="text" placeholder="Email/Phone Number"
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}/>
        {/* <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text> */}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>Item Descrition</Form.Label>
        <Form.Control type="textarea" placeholder="Description of the Item"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}/>
        {/* <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text> */}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Do you confirm the following details provided?" />
      </Form.Group>
      <br />
      <Button variant="primary" type="submit">
        Place Item
      </Button>
    </Form>
        {/* <form className="reservation-form" onSubmit={submitHandler}>
          <div className="content-block">
            <div className="row">
              <div className="col-lg-6 form-group">
                <input
                  type="text"
                  placeholder="Name of Item"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="col-lg-6 form-group">
                <input
                  type="text"
                  placeholder="Image URL of item"
                  required
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </div>
              <div className="col-lg-6 form-group">
                <input
                  type="text"
                  placeholder="Location (Country/State)"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div className="col-lg-6 form-group">
                <input
                  type="text"
                  placeholder="Price in ($)"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="col-lg-6 form-group">
                <input
                  type="text"
                  placeholder="Duration to Rent Item (Start Date - End Date)"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              
              <div className="col-lg-12 form-group">
                <textarea
                  value={description}
                  placeholder="Description of the Item"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="col-lg-12">
                <button type="submit" className="cmn-btn">
                  Place Item 
                </button>
              </div>
            </div>
          </div>
        </form> */}
      </div>
    </section>
  );
};

export default AddItem;
