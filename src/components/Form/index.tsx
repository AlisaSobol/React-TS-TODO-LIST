import './index.scss'

interface FormProps {
  handleForm: (event: React.SyntheticEvent) => void;
  error: boolean;
  inputRef: React.RefObject<HTMLInputElement>
}

const Form = ({ handleForm, error, inputRef }: FormProps) => {
  return (
    <form 
      className='form'
      onSubmit={handleForm}
    >
      {error && (<p className='form__error'>There is nothing to add</p>)}
      <input 
        ref={inputRef} 
        className='form__input' 
        type="text" 
        placeholder='Write todo...'
      />

      <button 
        className='form__btn' 
        type="submit"
      >add</button>
    </form> 
  )
}

export default Form