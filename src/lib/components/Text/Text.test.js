import { render, fireEvent, screen, cleanup, getByTestId, waitFor } from '@testing-library/react'
import { useState } from 'react';
import { PATTERN_CIPC, PATTERN_TEXT } from '../../../utils/Constants';
import { validateFields } from '../../../utils/validation';
import Input from './Text'

let container = null;

beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => cleanup);

let input = {
    required: true,
    type: "text",
    placeholder: "Test input",
    id: "test",
    pattern: PATTERN_CIPC,
    value: ""
}



function MyInput() {
    const [value, setValue] = useState('')
    const [error, setError] = useState(null)

    function handleInput(e) {
        e.preventDefault()
        const validate = validateFields(e.currentTarget)
        if (validate) {
            setError(validate)
        } else {
            setError(null)
        }
        setValue(e.currentTarget.value)
    }

    return <Input {...input} handle={handleInput} value={value} error={error} />
}

const setup = () => {
    const utils = render(<MyInput />)
    const input = utils.getByTestId('default-input')
    return {
        input,
        ...utils,
    }
}


//:=> text input removes extra invalid characters on ID number
test(':=> text input removes extra invalid characters on ID number', async () => {
    const { input } = setup()
    // fill out the form
    fireEvent.change(input, {
        target: { value: new RegExp(input.pattern).exec('65121557230811233')[0] },
    })

    expect(input.value).toBe('6512155723081')
});

//:=> text input removes extra invalid characters on CIPC number
test(':=> text input removes extra invalid characters on CIPC number', async () => {
    const { input } = setup()
    // fill out the form
    fireEvent.change(input, {
        target: { value: new RegExp(input.pattern).exec('2011/327734/074')[0] },
    })

    expect(input.value).toBe('2011/327734/07')
});