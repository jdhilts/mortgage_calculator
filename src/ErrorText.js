import './app.css'

const ErrorText =(props)=> {
	return (
		<p className='error_text'>
		{props.children}
		</p>
		)
}
export default ErrorText