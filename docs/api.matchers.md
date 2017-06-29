# redux-pagestate

## API

### matchers : Object<String, Function>

An object containing path matching functions.  These functions are called by the `changePath` action.  This action
receives a path and checks each pagestate paths array to see if there is a match.

The functions have the following signature:
```js
a => b => Boolean
```

For an example on how `changePath` uses the matcher functions, [see details](api.changePath.md).

#### Default/build-in matchers
```js
import { matchers } from 'redux-pagestate';
```

- equal
  - exact string match
  - `a === b`
- lower
  - case-insensitive string match
  - `a.toLowerCase() === b.toLowerCase()`
- regex
  - test paths as a regex
  - `new RegExp(b).test(a)`

#### Example
```js
import { createReducer, matchers: defaultMatchers } from 'page-state';

const matchers = {
  ...defaultMatchers, // Keep the default matchers
  startsWith: a => b => a.startsWith(b)
};

const pageStateReducer = createReducer({ matchers });
```
