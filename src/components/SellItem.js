import { Fragment } from 'react';
import SellDigitalItem from './SellDigitalItem';


const SellItem = props => {

    return (
        <Fragment>
            <section className="choose-item-section pt-120 pb-120 section-bg">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <div className="section-header text-center">
                                <h2 className="section-title" style={{padding:"20px"}}>Items available for Sale</h2>
                                <p style={{lineHeight: "30px", fontSize: "20px", width: "100%"}}>Items ranging from digital items to tech gadgets, etc</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {props.items.map(item => (item.isSale === 'true' || item.isSale === true) && <SellDigitalItem key={item.id} item={item} buyItem={props.buyItem} />)}
                    </div>
                </div>
            </section>



        </Fragment>


    );
}

export default SellItem;