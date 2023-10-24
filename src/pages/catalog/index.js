import React, { useState, useEffect } from 'react';
import { View, Text, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Feather'
import {Container, PriceContainer, Product, ProductButton, ProductButtonText, ProductContainer, ProductImage,
ProductList, ProductPrice, ProductTitle} from './styles';
import formatValue from '../../utils/formatValue';
import FloatingCard from '../../components/floatingCart';
import axios from "axios";
import * as CartActions from '../../store/module/cart/actions'
import { useDispatch } from 'react-redux';

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadProducts() {
        const {data} = await axios.get('http://localhost:8080/products');
        setProducts(data);
    }

    loadProducts();
  }, []);

  function handlerAddToCart(id) {
    dispatch(CartActions.addToCartRequest(id));
  }

  return (
    <Container>
      <ProductContainer>
        <ProductList 
          data={products}
          keyExtractor={(item) => item.id}
          ListFooterComponent={<View />}
          ListFooterComponentStyle={{
            height: 80,
          }}
          renderItem={({ item }) => (
            <Product>
              <ProductImage source={{ uri: item.image_url }} />
              <ProductTitle>{item.title}</ProductTitle>
              <PriceContainer>
                <ProductPrice>{formatValue(item.price)}</ProductPrice>
                <ProductButton onPress={() => handlerAddToCart(item.id)}>
                  <ProductButtonText>adicionar</ProductButtonText>
                  <Icon size={30} name="plus-circle" color="#d1d7e9" />
                </ProductButton>
              </PriceContainer>
            </Product>
          )}
        />

      </ProductContainer>
      <FloatingCard/>
    </Container>  
  );
}