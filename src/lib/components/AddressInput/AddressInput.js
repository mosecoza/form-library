import React from 'react';
import FormInputs from '../FormInputs/FormInputs';

const addresses = {
    PHY: 'Physical Address',
    POS: 'Postal Address'
}

function AddressInput(props) {
    if (!props.value.address) return null;

    return <div className='schemeReg_tabContentLayout'>
        {props.fields.length ? props.fields.map((rows, i) => {
            return <div id='address' data-testid="address-block" className='schemeReg_tabContentSectionOne'
                key={'row_' + i}
            >
                <h6 data-testid="address-block-title">{props.value.address.length > 0 && addresses[props.value.address[i].type]}</h6>
                {
                    rows.map((field, x) => {

                        const fieldId = `address.${field.id}.${i}`
                        if (!Object.keys(props.value).length) return;

                        const [id, key] = (field.id).split(".");
                        let value;
                        if(props.value.address.length > 0){
                            value = key ? props.value.address[i][id][key] : props.value.address[i][id];
                        }
                        // let value = key ? props.value.address[i][id][key] : props.value.address[i][id];
                        let checkId

                        if (value === undefined) {
                            checkId = field.id
                            value = props.value[checkId];
                        }

                        return (
                            <FormInputs
                                handle={props.handle}
                                // data={  props.data ? props.data : field.data}
                                data={field.id === "province" ?(field.data ? field.data  :props.data ): (props.data ? props.data : field.data)}
                                value={value}
                                key={field.label + "_field." + x + "." + i}
                                name={field.id + "." + i}
                                id={checkId ? checkId : fieldId }
                                label={field.label}
                                type={field.type}
                                handleToggle={props.handleToggle}
                                pattern={field.pattern ? field.pattern : null}
                                error={props.errors ? props.errors[fieldId] : null}
                                required={field.required ? field.required : false}
                                isAdmin={props.isAdmin}
                                readOnly={props.readOnly}
                                regOnBehalf={props.regOnBehalf}
                            />
                        )
                    })
                }
            </div>
        }) : null}
    </div>;

}

export default AddressInput;
