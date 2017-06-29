# redux-pagestate

## API

### reducer

The pagestate reducer.  Should be mounted to your Redux state at `pagestate`.

```js
import { createStore, combineReducers } from 'redux';
import { reducer as pageStateReducer } from 'redux-pagestate';

const rootReducer = combineReducer({
  // ... your other reducers here
  pagestate: pageStateReducer,
});

const store = createStore(reducer);
```
