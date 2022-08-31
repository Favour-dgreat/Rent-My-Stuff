import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { parseNearAmount } from "near-api-js/lib/utils/format";


const SellDigitalItem = (props) => {
  return (
    <Card style={{ width: '25rem', marginBottom: "40px" }}>
      <Card.Img variant="top" src={props.item.image} />
      <Card.Body>
        <Card.Title>Item Name: {props.item.name}</Card.Title>
        <Card.Text>
        Cost: ${props.item.price / 10 ** 24}
        </Card.Text>
        <Card.Text>
        Location: {props.item.location}
        </Card.Text>
        
        <Card.Text>
        Item Description: {props.item.description}
        </Card.Text>
        <Button variant="dark"onClick={() =>
              props.buyItem(props.item.price, props.item.id)
            }>Buy Item</Button>
      </Card.Body>
    </Card>
  
  );
};

export default SellDigitalItem;
