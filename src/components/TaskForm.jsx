// Dynamic Task Form Component
// TODO: Implement complex form with React Hook Form

import React, { useEffect, useMemo } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { TASK_TYPES, PRIORITIES, BUG_SEVERITIES } from '../api/mockApi';
import { fetchProjectUsersRequest } from '../store/actions/uiActions';
import { selectProjectUsers } from '../store/selectors';

// TODO: Implement TaskForm component
// Requirements:
// 1. Dynamic fields based on task type
// 2. Form validation with custom rules
// 3. Field arrays for subtasks and acceptance criteria
// 4. Integration with Redux for data and state
// 5. Auto-save functionality
// 6. File attachment simulation

const TaskForm = ({ 
  isOpen, 
  mode, // 'create' or 'edit'
  initialData = null,
  onSubmit,
  onClose,
  users = [],
  projects = [],
  loading = false 
}) => {

  const dispatch = useDispatch();
  const projectUsers = useSelector(selectProjectUsers);
  
  const defaultValues = useMemo(() => ({
    title: '',
    description: '',
    taskType: 'Feature',
    priority: 'Medium',
    projectId: '',
    assigneeId: '',
    dueDate: '',
    severity: 'Medium',
    stepsToReproduce: '',
    businessValue: '',
    acceptanceCriteria: [],
    currentBehavior: '',
    proposedBehavior: '',
    researchQuestions: [],
    expectedOutcomes: '',
    subtasks: []
  }), []);

  const { register, handleSubmit, control, watch, reset, formState: { errors, isValid } } = useForm({
    defaultValues,
    mode: 'onChange'
  });

  const { fields: subtasksFields, append: appendSubtask, remove: removeSubtask } = useFieldArray({
    control,
    name: 'subtasks'
  });

  const { fields: acFields, append: appendAC, remove: removeAC } = useFieldArray({
    control,
    name: 'acceptanceCriteria'
  });

  const { fields: rqFields, append: appendRQ, remove: removeRQ } = useFieldArray({
    control,
    name: 'researchQuestions'
  });

  const taskType = watch('taskType');
  const projectId = watch('projectId');

  useEffect(() => {
    dispatch(fetchProjectUsersRequest(projectId));
  }, [projectId, dispatch]);

  // Filter available users based on selected project
  const availableUsers = useMemo(() => {
    if (!projectId) return users;
    return projectUsers;
  }, [projectId, projectUsers, users]);

  // Auto-save and restore
  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && initialData) {
        reset(initialData);
      } else {
        const saved = localStorage.getItem('taskFormAutoSave');
        if (saved) {
          try {
            reset(JSON.parse(saved));
          } catch(e) {}
        } else {
          reset(defaultValues);
        }
      }
    }
  }, [isOpen, mode, initialData, reset, defaultValues]);

  useEffect(() => {
    if (isOpen && mode === 'create') {
      const subscription = watch((value) => {
        localStorage.setItem('taskFormAutoSave', JSON.stringify(value));
      });
      return () => subscription.unsubscribe();
    }
  }, [watch, isOpen, mode]);

  const renderDynamicFields = () => {
    switch (taskType) {
      case 'Bug':
        return (
          <>
            <div className="form-group">
              <label>Severity</label>
              <select {...register('severity')}>
                {BUG_SEVERITIES.map(sev => <option key={sev} value={sev}>{sev}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Steps to Reproduce</label>
              <textarea {...register('stepsToReproduce')} />
            </div>
          </>
        );
      case 'Feature':
        return (
          <>
            <div className="form-group">
              <label>Business Value</label>
              <textarea {...register('businessValue')} />
            </div>
            <div className="form-group">
              <label>Acceptance Criteria</label>
              {acFields.map((field, index) => (
                <div key={field.id} style={{ display: 'flex', marginBottom: '5px' }}>
                  <input {...register(`acceptanceCriteria.${index}`)} style={{ flex: 1 }} />
                  <button type="button" onClick={() => removeAC(index)}>X</button>
                </div>
              ))}
              <button type="button" onClick={() => appendAC('')} className="btn-small">+ Add Criteria</button>
            </div>
          </>
        );
      case 'Enhancement':
        return (
          <>
            <div className="form-group">
              <label>Current Behavior</label>
              <textarea {...register('currentBehavior')} />
            </div>
            <div className="form-group">
              <label>Proposed Behavior</label>
              <textarea {...register('proposedBehavior')} />
            </div>
          </>
        );
      case 'Research':
        return (
          <>
            <div className="form-group">
              <label>Research Questions</label>
              {rqFields.map((field, index) => (
                <div key={field.id} style={{ display: 'flex', marginBottom: '5px' }}>
                  <input {...register(`researchQuestions.${index}`)} style={{ flex: 1 }} />
                  <button type="button" onClick={() => removeRQ(index)}>X</button>
                </div>
              ))}
              <button type="button" onClick={() => appendRQ('')} className="btn-small">+ Add Question</button>
            </div>
            <div className="form-group">
              <label>Expected Outcomes</label>
              <textarea {...register('expectedOutcomes')} />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="task-form-overlay">
      <div className="task-form">
        <div className="task-form-header">
          <h2>{mode === 'create' ? 'Create New Task' : 'Edit Task'}</h2>
          <button onClick={onClose} className="close-btn">×</button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Title *</label>
            <input 
              {...register('title', { required: 'Title is required', minLength: { value: 3, message: 'Minimum 3 characters' } })} 
            />
            {errors.title && <span className="error-text">{errors.title.message}</span>}
          </div>

          <div className="form-group">
            <label>Task Type *</label>
            <select {...register('taskType', { required: true })}>
              {TASK_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Priority *</label>
            <select {...register('priority', { required: true })}>
              {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Project</label>
            <select {...register('projectId')}>
              <option value="">None</option>
              {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Assignee</label>
            <select {...register('assigneeId')}>
              <option value="">Unassigned</option>
              {availableUsers.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea {...register('description', { maxLength: { value: 500, message: 'Max 500 characters' } })} />
            {errors.description && <span className="error-text">{errors.description.message}</span>}
          </div>

          <div className="form-group">
            <label>Due Date</label>
            <input type="date" {...register('dueDate')} />
          </div>

          {/* Dynamic Fields */}
          {renderDynamicFields()}

          {/* Subtasks */}
          <div className="form-group">
            <label style={{ color: '#2c3e50', fontWeight: 'bold' }}>Subtasks</label>
            {subtasksFields.map((field, index) => (
              <div key={field.id} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <input 
                  {...register(`subtasks.${index}.title`)} 
                  style={{ flex: 1 }} 
                  placeholder="Enter subtask..." 
                />
                <button 
                  type="button" 
                  onClick={() => removeSubtask(index)}
                  className="btn-subtask"
                >
                  Remove
                </button>
              </div>
            ))}
            <button 
              type="button" 
              onClick={() => appendSubtask({ title: '', completed: false })} 
              className="btn-subtask"
              style={{ marginTop: '5px' }}
            >
              Add Subtask
            </button>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" disabled={loading || !isValid} className="btn-primary">
              {loading ? 'Saving...' : mode === 'create' ? 'Create Task' : 'Update Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;