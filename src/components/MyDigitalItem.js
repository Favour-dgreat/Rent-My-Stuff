import Card from 'react-bootstrap/Card';
const MyDigitalItem = (props) => {

  return (
    <Card style={{ width: '25rem', marginBottom: "20px" }}>
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
      </Card.Body>
    </Card>
    // <div className="digital-item col-lg-4 col-md-3 col-sm-12" style={{margin:"20px"}}>
    //   <div className="thumb">
    //     <img src={props.item.image} alt="item" />
    //   </div>
    //   <div className="item-item-body">
    //     <div className="content">
    //       <h4 className="title">Item Name: {props.item.name}</h4>
    //       <span className="amount">Cost: ${props.item.price / 10 ** 24}</span>
    //       <p>Location: {props.item.location}</p>
    //       <p>Duration to Hire Item: {props.item.date}</p>
    //       <p>Item Description: {props.item.description}</p>
    //     </div>
    //     <br />
    //   </div>
    // </div>
  );
};

export default MyDigitalItem;
