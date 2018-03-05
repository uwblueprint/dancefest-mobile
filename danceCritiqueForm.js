import React from 'react'
import { reduxForm } from 'redux-form'

const DanceCritiqueForm = props => {
  const { handleSubmit } = props
  return <form onSubmit={handleSubmit}>{/* form body*/}</form>
}

DanceCritiqueForm = reduxForm({
  // a unique name for the form
  form: 'danceCritique'
})(DanceCritiqueForm)

export default DanceCritiqueForm
