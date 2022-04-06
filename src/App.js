import { FormInput } from 'react-form-library';
import './App.css';

function App() {
  return (
    <div>
      <h6>

        React Form Library App
      </h6>
      <FormInput handle={e => console.log(e.currentTarget.value)} type="text" id="name"
        value=""
        required={true}
        validationString="this is required"
        label="Name of the Community Scheme"
      />
    </div>
  );
}

export default App;
