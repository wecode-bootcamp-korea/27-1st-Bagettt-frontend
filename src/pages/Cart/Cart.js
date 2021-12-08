import React, { useState, useEffect } from 'react';
import './Cart.scss';
import OrderInformation from './OrderInformation/OrderInformation';
import OrderProducts from './OrderProducts/OrderProducts';
import OrderPrice from './OrderPrice/OrderPrice';
import OrderButton from './OrderButton/OrderButton';

function Cart() {
  const [selectedBread, setSelectedBread] = useState([]);
  const [checkList, setCheckList] = useState([]);
  const [totalPrice, setToalPrice] = useState({});
  const [price, setPrice] = useState({});

  const changeSingleBox = (checked, id, prices) => {
    if (checked) {
      setCheckList([...checkList, id]);
      setPrice({ ...price, [id]: prices });
    } else {
      setCheckList(checkList.filter(el => el !== id));
      setPrice({ ...price, [id]: 0 });
    }
  };

  const changeAllBox = checked => {
    if (checked) {
      const allCheckBox = [];

      selectedBread.forEach(el => allCheckBox.push(el.id));
      setCheckList(allCheckBox);
      setPrice({ ...totalPrice });
    } else {
      setCheckList([]);
      setPrice({});
    }
  };

  const setPriceList = (prices, id) => {
    setToalPrice({ ...totalPrice, [id]: prices });
    if (checkList.includes(id)) {
      setPrice({ ...price, [id]: prices });
    }
  };

  const deleteSelected = () => {
    if (checkList.length === 0) {
      alert('상품을 선택해주세요');
    } else {
      setSelectedBread(selectedBread.filter(el => !checkList.includes(el.id)));

      setPrice({});

      const temp = { ...totalPrice };
      checkList.forEach(el => delete temp[el]);
      setToalPrice({ ...temp });

      setCheckList([]);
    }
  };

  const deletePer = identifier => {
    if (checkList.includes(identifier)) {
      setSelectedBread(selectedBread.filter(el => identifier !== el.id));

      const temp = { ...price };
      delete temp[identifier];
      setPrice({ ...temp });

      const temp2 = { ...totalPrice };
      delete temp2[identifier];
      setToalPrice({ ...temp2 });

      setCheckList(checkList.filter(el => el !== identifier));
    } else {
      alert('항목을 선택해주세요');
    }
  };

  const deleteAll = () => {
    setSelectedBread([]);
    setPrice({});
    setToalPrice({});
  };

  useEffect(() => {
    fetch('/data/breadCart.json')
      .then(res => res.json())
      .then(json => {
        setSelectedBread(json);
        const temp = {};
        json.forEach(el => (temp[el.id] = parseInt(el.order_price)));
        setToalPrice({ ...temp });
      });
  }, []);

  // console.log(totalPrice);
  // console.log(price);
  return (
    <div className="Cart">
      <div>
        <span className="homeRoot">HOME</span>
        <span className="homeRoot">></span>
        <span className="shoppingRoot">SHOPPING BAG</span>
      </div>

      <div className="shoppingBag">
        <h1 className="title">SHOPPING BAG</h1>
        <h2 className="title productTitle">쇼핑백 상품</h2>
        <div className="orderContainer">
          <OrderInformation
            changeAllBox={changeAllBox}
            checkList={checkList}
            selectedBread={selectedBread}
          />

          {selectedBread.length > 0 ? (
            selectedBread.map(selectedBread => (
              <OrderProducts
                selectedBread={selectedBread}
                key={selectedBread.id}
                changeSingleBox={changeSingleBox}
                data={selectedBread}
                checkList={checkList}
                setPriceList={setPriceList}
                deletePer={deletePer}
              />
            ))
          ) : (
            <div className="emptyCart">장바구니가 비어있습니다</div>
          )}
        </div>
        <OrderPrice
          price={price}
          deleteSelected={deleteSelected}
          deleteAll={deleteAll}
        />
        <div className="orderButtonWrapper">
          <OrderButton content="쇼핑계속하기" name="whiteButton" />
          <OrderButton content="선택 상품 주문" name="whiteButton" />
          <OrderButton content="전체 상품 주문" name="blackButton" />
        </div>
      </div>
    </div>
  );
}

export default Cart;