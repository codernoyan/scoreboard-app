// delete button
const deleteButton = document.getElementById('delete-button');

// add another 
const addAnotherButton = document.getElementById('add-another');

// reset button
const resetButton = document.getElementById('reset-button');

// result
const result = document.getElementById('result');

// action identifier
const INCREMENT = 'increment';
const DECREMENT = 'decrement';

// action creator
const increment = (value) => {
  return {
    type: INCREMENT,
    payload: value,
  }
}
const decrement = (value) => {
  return {
    type: DECREMENT,
    payload: value,
  }
}

// initial state
const initialState = {
  matchCount: 0,
}

// counter reducer
const matchCountReducer = (state = initialState, action) => {
  if (action.type === INCREMENT) {
    return {
      ...state,
      matchCount: state.matchCount + action.payload,
    }
  } else if (action.type === DECREMENT) {
    return {
      ...state,
      matchCount: state.matchCount - action.payload,
    }
  } else {
    return state;
  }
}

// Redux store
const store = Redux.createStore(matchCountReducer);

// render
const render = () => {
  const state = store.getState();
  result.innerText = state.matchCount;
};

render();

store.subscribe(render);


document.getElementById('increaseForm').addEventListener('submit', (e) => {
  e.preventDefault();
  // action elements
  const incrementValue = document.getElementById('increment').value;
  const incrementValueInNumber = parseInt(incrementValue);

  // dispatch action
  store.dispatch(increment(incrementValueInNumber));
  // reset
  document.getElementById('increment').value = '';

});
document.getElementById('decreaseForm').addEventListener('submit', (e) => {
  e.preventDefault();
  // action elements
  const decrementValue = document.getElementById('decrement').value;
  const decrementValueInNumber = parseInt(decrementValue);

  // dispatch action
  store.dispatch(decrement(decrementValueInNumber));
  // condition: if decrement value grater than result
  if(result.innerText < 0) return result.innerText = 0;

  // reset
  document.getElementById('decrement').value = '';
});