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
    p: Yup.number().required('Required!'),
    r: Yup.number().required('Required!'),
    t: Yup.number().required('Required!')
  })

  const onSubmit =(values, {resetForm})=> {
    resetForm({})
    const {p, r, t} = values 
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

    <div>
    <Formik initialValues={initialValues} 
    validationSchema={validationSchema} 
    onSubmit={onSubmit}>
    {
      formik => (
        <Form className='form'>
        <FormikControl
        control='input' 
        type='number' 
        name='p'
        placeHolder='Principal'/>

        <FormikControl     
        control='input' 
        type='number' 
        name='r'
        placeHolder='Interest Rate'/>

        <FormikControl       
        control='input' 
        type='number' 
        name='t'
         placeHolder='Term'/>

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
