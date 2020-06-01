import axios from 'axios'

const initialState = {
  purchases: [],
  budgetLimit: null,
  loading: false
}

const REQUEST_BUDGET_DATA = 'REQUEST_BUDGET_DATA'
const ADD_PURCHASE = 'ADD_PURCHASE'
const REMOVE_PURCHASE = 'REMOVE_PURCHASE'

export const requestBudgetData = () => {
  const payload = axios.get('/api/budget-data').then(res => res.data)

  return {
    type: REQUEST_BUDGET_DATA,
    payload
  }
}

export const addPurchase = (price, description, category) => {
  const body = { description, price, category }
  const payload = axios.post('/api/budget-data/purchase', body).then(res => res.data)

  return {
    type: ADD_PURCHASE,
    payload
  }
}

export const removePurchase = id => {
  const payload = axios.delete(`/api/budget-data/purchase/${id}`).then(res => res.data)
  return {
    type: REMOVE_PURCHASE,
    payload
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case REQUEST_BUDGET_DATA + '_PENDING':
      return { ...state, loading: true }
    case REQUEST_BUDGET_DATA + '_FULFILLED':
      return {...state, ...action.payload, loading: false }
    case ADD_PURCHASE + '_PENDING':
      return { ...state, loading: true }
    case ADD_PURCHASE + '_FULFILLED':
      return { ...state, purchases: action.payload, loading: false }
    case REMOVE_PURCHASE + '_PENDING':
      return { ...state, loading: true }
    case REMOVE_PURCHASE + '_FULFILLED':
      return { ...state, purchases: action.payload, loading: false }
    default:
      return state
  }
}
