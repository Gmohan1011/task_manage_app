// Users action types (need to be defined or just used here)
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';

const initialState = {
  byId: {},
  allIds: []
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_SUCCESS: {
      const byId = {};
      const allIds = action.payload.map(user => {
        byId[user.id] = user;
        return user.id;
      });
      return {
        ...state,
        byId,
        allIds
      };
    }
    default:
      return state;
  }
};

export default usersReducer;
