import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect, useCallback } from "react";
import {
  login,
  logout as destroy,
  accountBalance,
  getAccountId,
} from "./utils/near";
import {
  getItems as getItemsList,
  buyItem,
  addItem,
  sellItem,
  
} from "./utils/marketplace";

import "./App.css";
import Header from "./components/Header";
import Banner from "./components/Banner";
import SellItem from "./components/SellItem";
import AddItem from "./components/AddItem";
import Footer from "./components/Footer";
import MyItem from "./components/MyItem";

function App() {
  const [items, setItems] = useState([]);
  const [myItems, setMyItems] = useState([]);
  const [rentedItems, setRentedItems] = useState([]);
  const account = window.walletConnection.account();
  const [balance, setBalance] = useState("0");
  const [loading, setLoading] = useState(false);
  const getBalance = useCallback(async () => {
    if (account.accountId) {
      setBalance(await accountBalance());
      await getItems();
      console.log(myItems);
    }
  }, [account]);

  useEffect(() => {
    if (!account.accountId) {
      login();
    }
  }, []);

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  // function to add items to block
  const addToItems = async (data) => {
    setLoading(true);
    try {
      addItem(data).then((resp) => {
        getItems();
      });
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  };
  const getItems = useCallback(async () => {
    setLoading(true);
    try {
      const items = await getItemsList();
      setItems(items);
      setMyItems(items.filter((item) => item.owner === account.accountId));
      setRentedItems(items.filter((item) => item.renter === account.accountId));
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  }, [setItems, items]);

  // function to initiate transaction
  const buy = async (price, id) => {
    console.log(price, id);
    setLoading(true);
    try {
      await buyItem({ id, price });
      getItems();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // function to initiate transaction
  // const renting = async (price, id) => {
  //   try {
  //     await rentingItem({ id, price });
  //     getItems();
  //   } catch (error) {
  //     console.log({ error });
  //   }
  // };

  // // function that is called to make a item available for sale
  const sell = async (id) => {
    setLoading(true);
    try {
      await sellItem({ id });
      getItems();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // // function that is called to make a item available for rentals
  // const rent = async (id) => {
  //   try {
  //     await rentItem({ id });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const redeem = async (id) => {
  //   setLoading(true);
  //   try {
  //     await redeemItem ({ id });
  //     getItems();
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   setLoading(false);
  // };

  return (
    <div className="content">
      {loading ? (
        <p
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          Loading...
        </p>
      ) : (
        <>
          <Header balance={balance} />
          <Banner />
          <SellItem items={items} buyItem={buy} />
          {/* <RentItemrentItems items={  items} rentItem={renting} /> */}
          <AddItem addToItems={addToItems} />
          <MyItem
            items={myItems}
            rentedItems={rentedItems}
            sellItem={sell}
            // rentItem={rent}
            // redeemItem={redeem}
          />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
