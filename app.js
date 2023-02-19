// delete button
const deleteButton = document.getElementById('delete-button');

// add another 
const addAnotherButton = document.getElementById('add-another');

// reset button
const resetButton = document.getElementById('reset-button');

// result
const result = document.getElementById('result');

document.getElementById('increaseForm').addEventListener('submit', (e) => {
  e.preventDefault();
  // action elements
  const incrementValue = document.getElementById('increment').value;
  const incrementValueInNumber = parseInt(incrementValue);
  
});
document.getElementById('decreaseForm').addEventListener('submit', (e) => {
  e.preventDefault();
  // action elements
  const decrementValue = document.getElementById('decrement').value;
  const decrementValueInNumber = parseInt(decrementValue);
});

// initial state
const initialState = {
  matchCount: 0,
}

// counter reducer
const matchCountReducer = (state = initialState, action) => {
  
}

// Redux store
const store = Redux.store();

// render
const render = () => {
  const state = store.getState();
};

store.subscribe(render);
