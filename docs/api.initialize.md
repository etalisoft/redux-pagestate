# redux-pagestate

## API

### Action Creators

#### initialize({ key:String, value:JSON, paths:Array<String> })

Initializes the pagestate for the specified page.  **NOTE:** This will perform no action if the pagestate key is already present.

`key : String` [required]
The name of the page.

`value : JSON` [optional]
The initial value of the page.  The type can be any valid JSON data type: Number, String, Boolean, Array,
Object, null, undefined.  The default value is `undefined`.

`paths : Array<String>` [optional]
The paths that the page's state is valid for.  The default value is `[window.location.pathname]`.
