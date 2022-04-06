import { render, fireEvent, screen } from '@testing-library/react'
import AddressInput from './AddressInput'
const testData = {
    type: "address", fields: [
        [
            { id: "municipality", type: "text", value: "", required: true, label: "Municipality" },
            { id: "city", type: "text", value: "", required: true, label: "City" },
            { id: "suburb", type: "text", value: "", required: true, label: "Suburb" }
        ], [
            { id: "postl_add_line_1", type: "text", value: "", required: true, label: "Postal Address Line 1" },
            { id: "postl_add_line_2", type: "text", value: "", required: true, label: "Postal Address Line 2" },
            { id: "postl_add_line_3", type: "text", value: "", required: true, label: "Postal Address Line 3" },
            { id: "postal_code", type: "number", value: "", required: true, label: "Postal Code" },
        ]
    ],
}

const value = {
    address:[{municipality:"",city:"", suburb:''}, {postl_add_line_1:"", postl_add_line_2:"", postl_add_line_3:"", postal_code:""}]
}
test('creates address inputs', async () => {
    render(<AddressInput {...testData} value={value} />)

    // Click button
    //   fireEvent.click(screen.getByText(/'address'/i))

    // Wait for page to update with query text
    const items =  screen.queryAllByTestId('default-input')
    expect(items).toHaveLength(7)
})