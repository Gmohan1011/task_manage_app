// Projects action types
export const FETCH_PROJECTS_SUCCESS = 'FETCH_PROJECTS_SUCCESS';

const initialState = {
  byId: {},
  allIds: []
};

const projectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROJECTS_SUCCESS: {
      const byId = {};
      const allIds = action.payload.map(project => {
        byId[project.id] = project;
        return project.id;
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

export default projectsReducer;
