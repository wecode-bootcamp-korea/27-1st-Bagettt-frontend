import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Nav from '../../Components/Nav/Nav';
import ProductTap from './Tap/ProductTap';
import ProductContentInfo from './ContentInfo/ProductContentInfo';
import Footer from '../../Components/Footer/Footer';
import { API } from '../../config';
import './ProductDetail.scss';

function ProductDetail() {
  const [detailContents, setDetailContents] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetch(`${API.GET_PRODUCT_DETAIL}${id}`)
      .then(res => res.json())
      .then(result => {
        setDetailContents(result);
      });
  }, [id]);

  return (
    <div>
      <Nav />
      {detailContents.result && (
        <div>
          <div className="ProductDetail">
            <div>
              <img
                src={detailContents.result[0].package_thumbnail}
                alt="상품이미지"
                className="productDetailImage"
              />
              <ProductTap detailContents={detailContents.result[0]} />
            </div>
            <ProductContentInfo detailContents={detailContents.result[0]} />
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default ProductDetail;
