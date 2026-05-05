import {
  FETCH_TASKS_SUCCESS,
  CREATE_TASK_SUCCESS,
  UPDATE_TASK_SUCCESS,
  DELETE_TASK_SUCCESS
} from '../actions/taskActions';

const initialState = {
  byId: {},
  allIds: []
};

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TASKS_SUCCESS: {
      const byId = {};
      const allIds = action.payload.map(task => {
        byId[task.id] = task;
        return task.id;
      });
      return {
        ...state,
        byId,
        allIds
      };
    }
    case CREATE_TASK_SUCCESS: {
      const task = action.payload;
      return {
        ...state,
        byId: {
          ...state.byId,
          [task.id]: task
        },
        allIds: [...state.allIds, task.id]
      };
    }
    case UPDATE_TASK_SUCCESS: {
      const task = action.payload;
      return {
        ...state,
        byId: {
          ...state.byId,
          [task.id]: task
        }
      };
    }
    case DELETE_TASK_SUCCESS: {
      const taskId = action.payload;
      const { [taskId]: deletedTask, ...restById } = state.byId;
      return {
        ...state,
        byId: restById,
        allIds: state.allIds.filter(id => id !== taskId)
      };
    }
    default:
      return state;
  }
};

export default tasksReducer;
