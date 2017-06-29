# redux-pagestate

## API

### Selectors

`redux-pagestate` provides a set of useful Redux state
[selectors](http://redux.js.org/docs/recipes/ComputingDerivedData.html) that may be used in any part of your application
to query the state of any of your pages.

#### selectPageState : (key:String) => state => JSON
Returns the `value` of the pagestate for `key` if it is found; otherwise, returns `undefined`.

#### selectPageStateKeys : state => Array<String>
Returns an array of pagestate keys.
