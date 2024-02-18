const initialState = {};

enum PageContextActionTypes {
  CLEAR_ROUTE_PARAMS = "CLEAR_ROUTE_PARAMS",
}

export function pageContextReducer(state: any = initialState, action): any {
  switch (action.type) {
    case PageContextActionTypes.CLEAR_ROUTE_PARAMS:
      return {
        ...state,
      };
    default:
      return state;
  }
}
