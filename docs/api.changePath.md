# redux-pagestate

## API

### Action Creators

#### changePath({ path:String, matcher:String })

The `changePath` action removes any pagestate that does not match the criteria.

`path : String` [optional]

The current path.  The default value is `window.location.pathname`.

`matcher : String` [optional]

The name of the [matcher](api.matchers.md) function to use.  The build-in matchers are: `equal`, `lower`, `regex`.
The default value is `"equal"`.

##### Example
Initial Redux state:
```js
{
  pagestate: {
    foo: {
      value: 'Foo',
      paths: ['/foo']
    },
    bar: {
      value: 123,
      paths: ['/bar']
    },
    foobar: {
      value: {},
      paths: ['/foo', '/bar']
    }
  }
}
```

If the following action was dispatched to the Redux store:
```js
const action = changePath({ path: '/bar', matcher: 'equal' });
// The 'equal' matcher function will be called to determine
// if any of the pagestate paths are valid for the given path.
// equal = a => b => a === b
// `a` is the path passed to `changePath` -- '/bar' in this instance.
// `b` is each path in the array (until there is a match).
store.dispatch(action);
```

The resulting Redux state would be:
```js
{
  pagestate: {
    // NOTE: `foo` has been deleted, because the paths ['/foo']
    // did not contain a match for '/bar'.
    bar: {
      value: 123,
      paths: ['/bar']
    },
    foobar: {
      value: {},
      paths: ['/foo', '/bar']
    }
  }
}
```
