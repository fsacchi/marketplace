import React, {useState, useMemo} from "react";
import { View } from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import formatValue from "../../utils/formatValue";
import EmptyCart from "../../components/emptyCart";
import * as CartActions from '../../store/module/cart/actions'
import { useSelector, useDispatch } from "react-redux";

import {
  Container,
  ProductContainer,
  ProductList,
  Product,
  ProductImage,
  ProductTitleContainer,
  ProductTitle,
  ProductPriceContainer,
  ProductSinglePrice,
  TotalContainer,
  ProductPrice,
  ProductQuantity,
  ActionContainer,
  ActionButton,
  TotalProductsContainer,
  TotalProductsText,
  SubTotalValue,
} from './styles';

export default function Cart() {
  const products = useSelector(({ cart }) => cart);
  const dispatch = useDispatch();

  const cartSize = useMemo(() => {
    return products.length || 0
  }, [products]);

  const cartTotal = useMemo(() => {
    const cartAmount = products.reduce((acc, product) => {
        const totalPrice = acc + (product.price * product.amount);
        return totalPrice;
    }, 0);

    return formatValue(cartAmount);
  }, [products]);

  function handlerPlusAmount(product) {
    const quantity = Number(product.amount) + 1;
    dispatch(CartActions.updateAmountRequest(product.id, quantity));
  }

  function handlerMinusAmount(product) {
    const quantity = Number(product.amount) - 1;
    if (quantity == 0) {
      dispatch(CartActions.removeFromCart(product.id));
    } else {
      dispatch(CartActions.updateAmountRequest(product.id, quantity));
    }
  }

  return (
    <Container>
      <ProductContainer>
        <ProductList
          data={products}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<EmptyCart/>}
          ListFooterComponent={<View/>}
          ListFooterComponentStyle={{
            height: 80,
          }}
          renderItem={({item}) => (
            <Product>
              <ProductImage source={{uri: item.image_url}} />
              <ProductTitleContainer>
                <ProductTitle>{item.title}</ProductTitle>
              
              <ProductPriceContainer>
                <ProductSinglePrice>
                  {formatValue(item.price)}
                </ProductSinglePrice>

                <TotalContainer>
                  <ProductQuantity>{`${item.amount}x`}</ProductQuantity>
                  <ProductPrice>{formatValue(item.price * item.amount)}</ProductPrice>
                </TotalContainer>
              </ProductPriceContainer>
              </ProductTitleContainer>

              <ActionContainer>
                <ActionButton onPress={() => handlerPlusAmount(item)}>
                  <Icon name="plus" color="#E83F5B" size={16}/>
                </ActionButton>
                <ActionButton onPress={() => handlerMinusAmount(item)}>
                  <Icon name="minus" color="#E83F5B" size={16}/>
                </ActionButton>
              </ActionContainer>
            </Product>
          )}      
        />
      </ProductContainer>
      <TotalProductsContainer>
        <Icon name="shopping-cart" color="#fff" size={24}/>
        <TotalProductsText>{cartSize} {cartSize == 1 ? 'item' : 'itens'}</TotalProductsText>
        <SubTotalValue>{cartTotal}</SubTotalValue>
      </TotalProductsContainer>
    </Container>
  )
}