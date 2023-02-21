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
const ADDMATCH = 'addMatch';
const RESET = 'reset';

// action creator
const increment = (id, value) => {
  return {
    type: INCREMENT,
    payload: {
      id,
      value,
    }
  }
}

const decrement = (id, value) => {
  return {
    type: DECREMENT,
    payload: {
      id,
      value,
    }
  }
};

const reset = () => {
  return {
    type: RESET
  }
}

const matchInitialSate = [
  {
    id: 1,
    matchCount: 1,
    value: 120,
  },
];

const addMatchReducer = (state = matchInitialSate, action) => {
  switch (action.type) {
    case ADDMATCH:
      return [
        ...state,
        {
          id: state.length + 1,
          matchCount: state.length + 1,
          value: 0
        },
      ];
    case INCREMENT:
      const newIncrementValue = [...state];
      newIncrementValue.forEach((match) => {
        if (match.id === action.payload.id) {
          return match.value += action.payload.value;
        }
      })
      return newIncrementValue;
    case DECREMENT:
      const newDecrementValue = [...state];
      newDecrementValue.forEach((match) => {
        if (match.id === action.payload.id) {
          if (action.payload.value > match.value) {
            return match.value = 0;
          } else {
            return match.value -= action.payload.value;
          }
        }
      })
      return newDecrementValue;
    case RESET:
      const resetValue = [...state];
      resetValue.forEach((match) => {
        return match.value = 0;
      })
      return resetValue;
    default:
      return state;
  }
}

// Redux store
const store = Redux.createStore(addMatchReducer);
const state = store.getState();
// result.innerText = state[0].value
// render
const matchContainer = document.getElementById('container');
const render = () => {
  const state = store.getState();
  console.log(state);
  // result.innerText = state.matchCount;
  matchContainer.innerHTML = '';
  state.forEach((match) => {
    const matchDiv = document.createElement('div');
    matchDiv.innerHTML = `
            <div class="match">
                <div class="wrapper">
                    <button id="delete-button" class="lws-delete">
                        <img src="./image/delete.svg" alt="" />
                    </button>
                    <h3 class="lws-matchName">Match ${match.matchCount}</h3>
                </div>
                <div class="inc-dec">
                    <form onsubmit="handleIncrease(event, ${match.id})" class="incrementForm">
                        <h4>Increment</h4>
                        <input type="number" name="increment" class="lws-increment" />
                    </form>
                    <form onsubmit="handleDecrease(event, ${match.id})" class="decrementForm">
                        <h4>Decrement</h4>
                        <input id="decrement" type="number" name="decrement" class="lws-decrement" />
                    </form>
                </div>
                <div class="numbers">
                    <h2 id="result" class="lws-singleResult">${match.value}</h2>
                </div>
            </div>
    `;
    matchContainer.appendChild(matchDiv);

    // looping over match container

  })
};

addAnotherButton.addEventListener('click', () => {
  const state = store.getState();
  store.dispatch({
    type: ADDMATCH
  });
  // console.log(state);
});

resetButton.addEventListener('click', () => {
  store.dispatch(reset());
})

function handleIncrease(event, id) {
  event.preventDefault();
  console.log(event.target.increment.value, id);
  const incrementValue = parseInt(event.target.increment.value);
  store.dispatch(increment(id, incrementValue))
  // console.log(store.getState());
}

function handleDecrease(event, id) {
  event.preventDefault();
  console.log(event.target.decrement.value, id);
  const decrementValue = event.target.decrement.value;
  store.dispatch(decrement(id, decrementValue))
};

// default render
render();
store.subscribe(render);