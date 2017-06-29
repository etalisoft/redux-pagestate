# redux-pagestate

## API

### Action Creators

#### set({ key:String, value:JSON, paths:Array<String> })

Sets the pagestate for the specified page.

`key : String` [required]
The name of the page.

`value : JSON` [required]
The new value of the page.  The type can be any valid JSON data type: Number, String, Boolean, Array, Object, null,
undefined.

`paths : Array<String>` [optional]
The paths that the page's state is valid for.  If no path is supplied then the current paths are not modified.
