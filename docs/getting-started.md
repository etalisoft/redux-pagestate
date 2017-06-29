# redux-pagestate

## Getting Started

### Step 1 of 3: PageState reducer
The store should know how to handle actions coming from the page components.  To enable this, we need to pass the
`pageStateReducer` to your store.  It serves for **all of your page components**, so you only have to pass it once.
```js
import { createStore, combineReducers } from 'redux';
import { reducer as pageStateReducer } from 'redux-pagestate';

const rootReducer = combineReducers({
  // ...your other reducers here
  // you have to pass pageStateReducer under 'pagestate' key
  pagestate: pageStateReducer,
});

const store = createStore(rootReducer);
```
Now your store knows how to handle actions coming from the form components.
**NOTE:** The key used to pass the `redux-pagestate` reducer should be named **pagestate**.

### Step 2 of 3: Page component
To make your page component communicate with the store, we need to wrap it with `withPageState()`.  It will provide the
props about the pagestate.
```js
import React, { Component } from 'react';
import { withPageState } from 'redux-pagestate';

class MessagePage extends Component {
  render() {
    const { pageState } = this.props;
    const { message } = pageState;
    return (
      <div>
        {message}
      </div>
    );
  }
}

export default withPageState({
  key: 'message',
  value: { message: 'Hello World!' }
})(MessagePage);
```

### Step 3 of 3: Interacting with PageState
```javascript
import React, { Component } from 'react';
import { withPageState } from 'redux-pagestate';

class CounterPage extends Component {
  componentWillMount() {
    this.incrementHandler = this.increment.bind(this);
  }

  increment() {
    const { pageState, setPageState } = this.props;
    const count = pageState.count + 1;
    setPageState({ count });
  }

  render() {
    const { pageState } = this.props;
    const { count } =  pageState;
    return (
      <div>
        <div>Count: {count}</div>
        <button onClick={this.incrementHandler}>Add 1</button>
      </div>
    );
  }
}

export default withPageState({
  key: 'counter',
  value: { count: 0 }
});
```
