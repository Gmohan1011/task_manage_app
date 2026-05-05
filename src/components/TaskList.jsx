// Task List Component
// TODO: Implement task list with filtering and sorting

import React, { useState } from 'react';
import TaskCard from './TaskCard';

const TaskList = ({
  tasks = [],
  loading = false,
  onEditTask,
  onDeleteTask
}) => {
  // TODO: Implement task list functionality
  // Requirements:
  // 1. Display tasks in a grid or list layout
  // 2. Show loading state
  // 3. Handle empty state
  // 4. Implement sorting options

  const [sortField, setSortField] = useState('dueDate');

  if (loading) {
    return (
      <div className="task-list-loading">
        <div className="loading-spinner">Loading tasks...</div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="task-list-empty">
        <h3>No tasks found</h3>
        <p>Create your first task to get started!</p>
      </div>
    );
  }

  //   const sortedTasks = [...tasks].sort((a, b) => {
  //   // Default sort by latest created
  //   if (sortField === 'createdAt') {
  //     return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
  //   }

  //   let result = 0;

  //   switch (sortField) {
  //     case 'dueDate': {
  //       if (!a.dueDate && !b.dueDate) {
  //         result = 0;
  //       } else if (!a.dueDate) {
  //         result = 1;
  //       } else if (!b.dueDate) {
  //         result = -1;
  //       } else {
  //         result = new Date(a.dueDate) - new Date(b.dueDate);
  //       }
  //       break;
  //     }

  //     case 'priority': {
  //       const priorityScore = { Critical: 4, High: 3, Medium: 2, Low: 1 };
  //       result =
  //         (priorityScore[b.priority] || 0) -
  //         (priorityScore[a.priority] || 0);
  //       break;
  //     }

  //     case 'title':
  //       result = a.title?.localeCompare(b.title) || 0;
  //       break;

  //     default:
  //       result = 0;
  //   }

  //   // fallback → latest created first
  //   if (result === 0) {
  //     return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
  //   }

  //   return result;
  // });

  const sortedTasks = [...tasks].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="task-list">
      <div className="task-list-header">
        <h2>Tasks ({tasks.length})</h2>
        {/* TODO: Add sorting options */}
        <div className="sort-options">
          {/* <select>
            <option value="createdAt">Sort by Created Date</option>
            <option value="dueDate">Sort by Due Date</option>
            <option value="priority">Sort by Priority</option>
            <option value="title">Sort by Title</option>
          </select> */}
        </div>
      </div>

      <div className="task-grid">
        {sortedTasks.map(task => (
          <TaskCard
            key={task.tempId || task.id} 
            task={task}
            onEdit={() => onEditTask(task.id)}
            onDelete={() => onDeleteTask(task.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;