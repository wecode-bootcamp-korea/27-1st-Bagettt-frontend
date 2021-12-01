import React from 'react';
import ProductContentInfo from './ProductContentInfo';
import ProductTap from './ProductTap';
import './ProductDetail.scss';

function ProductDetail() {
  return (
    <div className="container">
      <div className="productDetailViewWrapper">
        <img
          src="https://www.gettt.com/data/goods/21/10/41/1000013679/1000013679_detail_079.png"
          alt="상품이미지"
          className="productImage"
        />
        <ProductTap />
      </div>
      <ProductContentInfo />
    </div>
  );
}

export default ProductDetail;
