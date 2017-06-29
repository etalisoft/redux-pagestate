# redux-pagestate

## API

### Action Creators

`redux-pagestate` exports all of its action creators, allowing you complete control to dispatch any action you wish.
However, it is recommended that you use the `setPageState` action passed as props to your component by
[`withPageState`](api.withPageState.md) instead of the `set` action creator as it is already bound to `dispatch`.

#### [changePath({ path:String, matcher:String })](api.changePath.md)
Removes any pagestate that does not match the criteria.

#### [initialize({ key:String, value:JSON, paths:Array<String> })](api.initialize.md)
Initializes the pagestate for the specified page.

#### [remove({ key:String })](api.remove.md)
Removes the pagestate for the specified page.

#### [set({ key:String, value:JSON, paths:Array<String> })](api.set.md)
Sets the pagestate for the specified page.
