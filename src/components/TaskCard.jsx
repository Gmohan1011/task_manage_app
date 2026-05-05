// Individual Task Card Component
// TODO: Implement task card display

import React from 'react';

const TaskCard = ({ task, onEdit, onDelete }) => {
  // TODO: Implement task card functionality
  // Requirements:
  // 1. Display task information in a card layout
  // 2. Show different styles based on priority/status
  // 3. Handle optimistic updates (show loading/pending states)
  // 4. Show task-type specific information
  // 5. Action buttons (edit, delete)
  
  const getPriorityColor = (priority) => {
    const colors = {
      'Low': '#22c55e',
      'Medium': '#f59e0b', 
      'High': '#ef4444',
      'Critical': '#dc2626'
    };
    return colors[priority] || '#6b7280';
  };

  const getStatusColor = (status) => {
    const colors = {
      'Todo': '#6b7280',
      'In Progress': '#3b82f6',
      'Review': '#f59e0b',
      'Done': '#22c55e'
    };
    return colors[status] || '#6b7280';
  };

  const isOptimistic = task.isOptimistic;

  return (
    <div className={`task-card ${task.taskType?.toLowerCase()} ${isOptimistic ? 'optimistic-pending' : ''}`} style={{ opacity: isOptimistic ? 0.6 : 1 }}>
      {isOptimistic && (
        <div className="optimistic-indicator" style={{ fontSize: '0.8em', color: '#6b7280', fontStyle: 'italic', marginBottom: '5px' }}>
          Syncing...
        </div>
      )}

      <div className="task-card-header">
        <div className="task-meta">
          <span 
            className="task-type"
            style={{ backgroundColor: getPriorityColor(task.priority), padding: '2px 6px', borderRadius: '4px', color: 'white', fontSize: '0.8em', marginRight: '8px' }}
          >
            {task.taskType}
          </span>
          <span 
            className="task-status"
            style={{ color: getStatusColor(task.status), fontWeight: 'bold', fontSize: '0.9em' }}
          >
            {task.status}
          </span>
        </div>
        
        <div className="task-actions">
          <button onClick={onEdit} className="btn-edit" disabled={isOptimistic}>✏️</button>
          <button onClick={onDelete} className="btn-delete" disabled={isOptimistic}>🗑️</button>
        </div>
      </div>

      <div className="task-content">
        <h3 className="task-title" style={{ marginTop: '10px', marginBottom: '5px' }}>{task.title}</h3>
        
        {task.description && (
          <p className="task-description" style={{ fontSize: '0.9em', color: '#4b5563' }}>
            {task.description.length > 100 
              ? `${task.description.substring(0, 100)}...`
              : task.description
            }
          </p>
        )}

        {task.taskType === 'Bug' && task.severity && (
          <div className="task-severity" style={{ fontSize: '0.85em', marginTop: '10px' }}>
            <strong>Severity:</strong> <span className={`severity-${task.severity?.toLowerCase()}`}>
              {task.severity}
            </span>
          </div>
        )}

        {task.taskType === 'Feature' && task.acceptanceCriteria?.length > 0 && (
          <div className="task-criteria" style={{ fontSize: '0.85em', marginTop: '10px' }}>
            <strong>{task.acceptanceCriteria.length}</strong> acceptance criteria
          </div>
        )}

        {task.taskType === 'Enhancement' && task.currentBehavior && (
          <div className="task-enhancement" style={{ fontSize: '0.85em', marginTop: '10px' }}>
            <strong>Enhancement:</strong> Defined
          </div>
        )}
        
        {task.taskType === 'Research' && task.researchQuestions?.length > 0 && (
          <div className="task-research" style={{ fontSize: '0.85em', marginTop: '10px' }}>
            <strong>{task.researchQuestions.length}</strong> questions
          </div>
        )}

        {/* Subtasks count */}
        {task.subtasks?.length > 0 && (
          <div className="task-subtasks" style={{ fontSize: '0.85em', marginTop: '5px', color: '#6b7280' }}>
            Subtasks: {task.subtasks.filter(st => st.completed).length}/{task.subtasks.length}
          </div>
        )}
      </div>

      <div className="task-footer" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px', borderTop: '1px solid #e5e7eb', paddingTop: '10px', fontSize: '0.8em', color: '#6b7280' }}>
        <div className="task-assignee">
          {task.assigneeId ? `User ${task.assigneeId}` : 'Unassigned'}
        </div>
        
        {task.dueDate && (
          <div className={`task-due-date ${new Date(task.dueDate) < new Date() ? 'overdue' : ''}`} style={{ color: new Date(task.dueDate) < new Date() ? '#ef4444' : 'inherit' }}>
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </div>
        )}

        <div className="task-priority">
          <span style={{ color: getPriorityColor(task.priority), fontWeight: 'bold' }}>
            {task.priority}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;