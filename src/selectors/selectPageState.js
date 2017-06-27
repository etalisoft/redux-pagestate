const selectPageState = key => state => (state.pagestate[key] || {}).value;

export default selectPageState;
