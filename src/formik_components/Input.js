import {Field, ErrorMessage} from 'formik'
import ErrorText from '../ErrorText'
import '../app.css'

const Input =(props)=>{
	const {label, name, ...rest} = props
	return(
		<div className='fields'>
		<label 
		htmlFor={name}>
		{label}
		</label>

		<Field 
		id={name} 
		name={name}
		{...rest} />

		<ErrorMessage
		name={name}
		component={ErrorText}
		/>
		</div>
		)
}
export default Input;