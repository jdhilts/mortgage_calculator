import React, {useState} from 'react'
import './app.css'
import * as Yup from 'yup'
import {Formik, Form} from 'formik'
import FormikControl from './formik_components/FormikControl'

const App =(props)=> {

  let initialValues = {
    p: '',
    r: '',
    t: ''
  }
  
  let [error, setError] = useState(false)
  let [m, setMortgage] = useState('')

  const validationSchema = Yup.object({
    p: Yup.number()
    .min(1, 'Principal must be greater than or equal to 1.')
    .required('Required!')
    .typeError('Pricipal must be greater than or equal to 1.'),

    r: Yup.number()
    .min(1, 'Rate must be greater than or equal to 1')
    .required('Required!')
    .typeError('Rate must be greater than or equal to 1.'),

    t: Yup.number()
    .min(10, 'Term must be 10 - 50 years.')
    .max(50, 'Term must be 10 - 50 years.')
    .required('Required!')
    .typeError('Term must be 10 - 50 years.'),
  })

  // Calculating the monthly payments
  const onSubmit =(values, {resetForm})=> {
    resetForm({})
    // Destructuring values object
    let {p, r, t} = values
    // Changing the rate to 3 decimals to left 
    r = r * .001
    // m = p r(1 + r)^n / (1 + r)^n - 1 
    let n = t * 12
    let numerator = 1 + r 
    numerator = numerator ** n 
    numerator = numerator * r 
    let denominator = 1 + r 
    denominator = denominator ** n 
    denominator = denominator - 1
    m = p * numerator / denominator
    m = m.toFixed(2)
    m = Math.round(10 * m) / 10
    // Check to see if m is a number
    if(!m){
      setError(true)
    } else {
      setError(false)
      setMortgage(m)
    }
  }

  return (
    <div className='page'>
    <div className='form_container'>
    <h1>
    Mortgage Calculator
    </h1>
    {/*Formik form*/}
    <div>
    <Formik initialValues={initialValues} 
    validationSchema={validationSchema} 
    onSubmit={onSubmit}>
    {
      formik => (
        <Form className='form'>
        <FormikControl
        control='input' 
        autoFocus
        type='text' 
        name='p'
        placeholder='Principal'/>

        <FormikControl     
        control='input' 
        type='text' 
        name='r'
        placeholder='Interest Rate'/>

        <FormikControl       
        control='input' 
        type='text' 
        name='t'
        placeholder='Term'/>

        <button      
        type='submit'
        disabled={!formik.isValid}>
        Submit
        </button>
        {
          error ? <h3 className='error_text'>
          You must enter a number greater than 0.
          </h3>
          :
          <h3>{`Your monthly payment will be $${m}0`}</h3>
        }
        </Form>         
        )
    }
    </Formik>
    </div>
    </div>
    </div>
    )
}
export default App;
