import MyDigitalItem from "./MyDigitalItem";

const MyItem = (props) => {
  return (
    <section className="choose-item-section pt-120 pb-120 section-bg">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="section-header text-center">
              <h2 className="section-title">My Items</h2>
            </div>
          </div>
        </div>
        <div className="row">
          {props.items.map((item) => (
            <MyDigitalItem
              key={item.id}
              item={item}
              sellItem={props.sellItem}
              
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyItem;
