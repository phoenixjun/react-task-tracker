import React from 'react'
import PropTypes from 'prop-types'
import Task from './Task'

const Tasks = ({tasks, onDelete, onToggle}) => {
  
  return (
    <>
      {
        tasks.map((task) => (
          <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} />))
      }
    </>
  )
}

// Tasks.propTypes = {
//   id: PropTypes.number.isRequired,
//   text: PropTypes.string,
//   day: PropTypes.string.isRequired,
//   reminder: PropTypes.bool
// }

export default Tasks
