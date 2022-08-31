import Button from 'react-bootstrap/Button';

const styles = {
  padding: "120px",


}
const Banner = (props) => {
  return (
    <div>
      <div style={{ background: "linear-gradient(#e66465, #9198e5)" }}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-mt-6">
            <div className="banner-content" style={styles}>
              <h1 className="title text-light" style={{fontSize: "70px", width: "100%"}}>Sell My Stuff</h1>
              <p className="text-light fw-bold">
                Place your items for sale and make some extra cash for yourself.  
              </p>
              <Button href="#0" variant = "dark">
                Place your Item for Sale
              </Button>
            </div>
          </div>
         
        </div>
      </div>
      </div>
      </div>  
      );
};

export default Banner;
