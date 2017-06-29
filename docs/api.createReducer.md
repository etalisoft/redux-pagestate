# redux-pagestate

## API

### createReducer(config:Object)

A higher order reducer that allows you to specify custom path [matchers](api.matchers.md), which are used by the
`changePath` action.

```js
import { createStore, combineReducers } from 'redux';
import { createReducer, matchers: defaultMatchers } from 'redux-pagestate';

const matchers = {
  ...defaultMatchers, // Include the default/built-in matchers
  startsWith: a => b => a.startsWith(b),
};

const pageStateReducer({ matchers });

const rootReducer = combineReducer({
  // ... your other reducers here
  pagestate: pageStateReducer,
});

const store = createStore(reducer);
```
