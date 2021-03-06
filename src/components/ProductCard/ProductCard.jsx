import React, { useEffect, useState } from 'react';
import Button from '../Button/Button.jsx';
import { Card, Img, Details, ProductAmount, Bottom, Price } from './styles';
import FavButton from '../FavButton/FavButton.jsx';
import cropString from '../../helpers/cropString.js';
import formatCurrency from '../../helpers/formatCurrency.js';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProductCard = ({ product }) => {
  const [onCart, setOnCart] = useState(false);
  const mobile = useSelector((state) => state.mobile.active);

  useEffect(() => {
    const local = window.location.pathname;

    if (local === '/cart') {
      setOnCart(true);
    }

    return () => setOnCart(false);
  }, [setOnCart]);

  return (
    <Card mobile={mobile} className="animeDown">
      <Link to={`/product/${product.id}`}>
        <Img src={product.image} />
      </Link>
      <Details>
        <h3>{cropString(product.name, 11)}</h3>
        <Price>{formatCurrency(product.price)}</Price>
        <p>{cropString(product.description, 27)}</p>
        <Bottom>
          <Button product={product} />
          {onCart && <ProductAmount>{product.amount}</ProductAmount>}
        </Bottom>
      </Details>
      <FavButton product={product} />
    </Card>
  );
};

export default ProductCard;
