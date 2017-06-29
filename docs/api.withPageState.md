# redux-pagestate

## API

### withPageState(config:Object)

Creates a decorator (Higher Order Component) with which you use `redux-pagestate` to connect your page component to
Redux.  It takes a `config` parameter which lets you configure your page.

#### Importing
```js
var withPageState = require('redux-pagestate').withPageState; // ES5

import { withPageState } from 'redux-pagestate'; // ES6
```

#### Config Properties

##### Required

`key : String` [required]

The name of your page and the key to where your form's state will be mounted under the `redux-pagestate` reducer.

##### Optional

`value : JSON`

The initial pageState value of your page.  The type can be any valid JSON data type: Number, String, Boolean, Array,
Object, null, undefined.  The default value is `undefined`.

`paths : Array<String>`

The paths that the page's state is valid for.  This allows a pagestate the possibility to persist between page
transitions.  Useful for wizards where the pagestate may compound for several pages until final submission.  The default
value is `[window.location.pathname]`.

`removeOnUnmount : Boolean`

Specifies whether the pageState should be removed automatically during `componentWillUnmount`.  A common use case is to
allow another process (i.e. router) to dispatch the `changePath` action when page changes.  For this reason the default
value is `false`.

#### Instance API

The following are methods or properties that you can access on an instance of your decorated page component.

`pageState : JSON`

The current pagestate value.

`pageStateKey : String`

The current pagestate key.

`setPageState : (value:JSON) => void`

The function to call to change the current pagestate value.

#### ChildContext

The `pageState`, `pageStateKey`, and `setPageState` values are also supplied as `childContextTypes`, allowing children
access to the values.

```js
import React from 'react';
import PropTypes from 'prop-types';

const DisplayKey = (props, { pageStateKey }) => <div>{pageStateKey}</div>;
DisplayKey.contextTypes = {
  pageStateKey: PropTypes.String
};

export default DisplayKey;
```
