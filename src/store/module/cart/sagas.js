import {all, takeLatest, select, call, put} from 'redux-saga/effects';
import axios from 'axios';
import formatValue from '../../../utils/formatValue';
import { addToCartSuccess, updateAmountSuccess } from './actions';

const baseUrl = 'http://localhost:8080';

function* addToCart({id}) {
  const productExists = yield select((state) => 
    state.cart.find((product) => product.id == id)
  );

  const productAmount = productExists ? productExists.amount : 0;
  const amount = productAmount + 1;

  if (productExists) {
    yield put(updateAmountSuccess(id, amount));
  } else {
    const response = yield call(axios.get, `${baseUrl}/products/${id}`);


    const data = {
      ...response.data,
      amount: 1,
      priceFormatted: formatValue(response.data.price),
    };

    yield put(addToCartSuccess(data));
  }

}

function* updateAmount({ id, amount }) {
  if (amount <= 0) return;

  yield put(updateAmountSuccess(id, amount));
}

export default all([
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
]);