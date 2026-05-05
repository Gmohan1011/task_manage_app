// Main Dashboard Component
// TODO: Implement the main container component

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import FilterBar from './FilterBar';

// TODO: Import selectors and actions
import { 
  selectFilteredTasks,
  selectTaskFormState,
  selectUsers,
  selectProjects,
  selectFilters,
  selectLoading,
  selectErrors
} from '../store/selectors';

import {
  fetchTasksRequest,
  createTaskRequest,
  updateTaskRequest,
  deleteTaskRequest
} from '../store/actions/taskActions';

import {
  openTaskForm,
  closeTaskForm,
  setFilters
} from '../store/actions/uiActions';

const TaskDashboard = () => {
  const dispatch = useDispatch();

  const tasks = useSelector(selectFilteredTasks);
  const users = useSelector(selectUsers);
  const projects = useSelector(selectProjects);
  const taskForm = useSelector(selectTaskFormState);
  const filters = useSelector(selectFilters);
  const loading = useSelector(selectLoading);
  const errors = useSelector(selectErrors);

  useEffect(() => {
    dispatch({ type: 'FETCH_INITIAL_DATA_REQUEST' });
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchTasksRequest(filters));
    }, [dispatch, filters.projectId, filters.assigneeId, filters.status, filters.taskType]);

  const handleCreateTask = () => {
     dispatch(openTaskForm('create'));
  };

  const handleEditTask = (taskId) => {
    const taskToEdit = tasks.find(t => t.id === taskId);
    dispatch(openTaskForm('edit', taskToEdit));
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      dispatch(deleteTaskRequest(taskId));
    }
  };

  const handleFormSubmit = (formData) => {
    if (taskForm.mode === 'create') {
      dispatch(createTaskRequest(formData));
    } else {
      dispatch(updateTaskRequest(formData));
    }
  };

  const handleFormClose = () => {
    dispatch(closeTaskForm());
    localStorage.removeItem('taskFormAutoSave');
  };

  const handleFiltersChange = (newFilters) => {
    dispatch(setFilters(newFilters));
  };

  return (
    <div className="task-dashboard">
      <header className="dashboard-header">
        <h1>Task Management Dashboard</h1>
        <button 
          className="create-task-btn"
          onClick={handleCreateTask}
        >
          + Create Task
        </button>
      </header>
      
 {/* TODO: Show error messages */}
      {(errors.tasks || errors.users || errors.projects || errors.form) && (
        <div className="error-banner">
          Error: {errors.tasks || errors.users || errors.projects || errors.form}
        </div>
      )}

      <FilterBar
        filters={filters}
        projects={projects}
        users={users}
        onFiltersChange={handleFiltersChange}
      />

      <TaskList
        tasks={tasks}
        loading={loading.tasks}
        onEditTask={handleEditTask}
        onDeleteTask={handleDeleteTask}
      />

      <TaskForm
        isOpen={taskForm.isOpen}
        mode={taskForm.mode}
        initialData={taskForm.taskId ? tasks.find(t => t.id === taskForm.taskId) : null}
        users={users}
        projects={projects}
        loading={loading.tasks}
        onSubmit={handleFormSubmit}
        onClose={handleFormClose}
      />
    </div>
  );
};

export default TaskDashboard;