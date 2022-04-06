// @ts-nocheck
import { useState, useEffect } from 'react';
import { validateFields } from '../utils/validation';

/**
 * @param {Object} props - These are the form inputs id's e.g {email:'', password: ''}
 * 
 *  
 * @example 
 * 
 * const userRegistrationInit = {email: "", password:"", useCases:[], firstTimeUsingService:true}
 * 
 * const {formState, formErrors, handleInputChange, handleMultiSelect, handleToggleChange } = useFormHook(userRegistrationInit);
 * 
 * return <form>
 * ...
 * 
 * <input
    * id="password" 
    * type="password" 
    * label="Password" 
    * error={formErrors["password"]} 
    * pattern='[a-zA-Z0-9!@#$%^&* ]{8,24}' 
    * value={formState["password"]} 
    * onChange={handleInputChange}
    * onInvalid={handleInputChange}
 * />
 * ...
 * 
 * </form>
 * 
 * @typedef { formState:object, formErrors:object, handleInputChange:(event: React.ChangeEvent<HTMLInputElement>) => void, handleToggleChange:(event: React.ChangeEvent<HTMLInputElement>) => void, handleSelected:(event: React.ChangeEvent<HTMLInputElement>) => void, handleFileUpload:(event: React.ChangeEvent<HTMLInputElement>) => void, handleDateChange:(event: React.ChangeEvent<HTMLInputElement>) => void, handleTableFormField:(event: React.ChangeEvent<HTMLInputElement>) => void, handleAddTableField:(event: React.ChangeEvent<HTMLInputElement>) => void, initTableState:(event: React.ChangeEvent<HTMLInputElement>) => void, handleRemoveTableField:(event: React.ChangeEvent<HTMLInputElement>) => void, handleIndexedInputChange:(event: React.ChangeEvent<HTMLInputElement>) => void, handleMultiSelect:(event: React.ChangeEvent<HTMLInputElement>) => void, handleDateRangeInputChange:(event: React.ChangeEvent<HTMLInputElement>) => void} useFormHookReturns
 * 
 * @returns {useFormHookReturns}
 * 
 */

function useFormHook(props) {

    const [formState, setFormState] = useState(props);
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        if (JSON.stringify(props) !== JSON.stringify(formState)) {
            setFormState(props)
        }
    }, [props])

    useEffect(() => {

        if (Object.keys(formErrors).length) {
            Object.keys(formErrors).map(error => {
                if (formErrors[error]) {
                    document.getElementById(error).classList.add("invalid-input-value")
                }
            })
        }

    }, [formErrors])

    useEffect(() => {

        if (formState.agentvalidation) {
            if (formState.agentvalidation.from && formState.agentvalidation.to) {
                const date1 = new Date(formState.agentvalidation.from);
                const date2 = new Date(formState.agentvalidation.to);
                const diff = (date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24);

                if (diff > 0) {
                    setFormErrors({ ...formErrors, agentvalidation: null })
                    document.getElementById('agentvalidation').classList.remove("invalid-input-value")
                } else {

                    setFormErrors({ ...formErrors, agentvalidation: "Expiry date is older than issue date" })
                }
            } else {
                setFormErrors({ ...formErrors, agentvalidation: "both dates are required" })
            }
        }

    }, [formState.agentvalidation])

    function handleTableFormField(e) {


        const validate = validateFields(e.currentTarget)
        validate ? setFormErrors({ ...formErrors, [e.currentTarget.id]: validate }) : (delete formErrors[e.currentTarget.id])
        let newValue = e.currentTarget.value

        if (!validate) {
            e.currentTarget.classList.remove("invalid-input-value")
            e.currentTarget.classList.add("valid-input-value")
        } else {

            // newValue = new RegExp(e.currentTarget.pattern).exec(e.currentTarget.value)[0]
        }
        const [id, key, index] = (e.currentTarget.id).split(".");

        let updatingEntry = {}
        let updatingState = []

        if (index && formState[id]) {
            let temp = formState[id][index];

            temp = { ...temp, [key]: newValue };

            updatingState = [
                ...formState[id].slice(0, index),
                temp,
                ...formState[id].slice(index + 1),
            ];
            updatingEntry = { ...formState, [id]: updatingState };

            setFormState(updatingEntry)

        } else if (index) {
            updatingEntry = { ...formState[index], [id]: { ...formState[index][id], [key]: newValue } };
            updatingState = [
                ...formState.slice(0, index),
                updatingEntry,
                ...formState.slice(index + 1),
            ];

            setFormState(updatingState)
        } else {
            updatingEntry = { ...formState[key], [id]: newValue };
            updatingState = [
                ...formState.slice(0, key),
                updatingEntry,
                ...formState.slice(key + 1),
            ];

            setFormState(updatingState)
        }
    }

    function handleAddTableField() {
        let temp = {}
        for (let x in props[0]) {
            temp = Object.assign(temp, { [x]: "" })
        }
        const toUpdate = [...formState, temp]
        setFormState(toUpdate)
    }

    function initTableState() {
        setFormState(props)
    }

    function handleMultiSelect(e) {

        let arr = []
        arr = [...formState[e.currentTarget.id]]
        const index = arr.indexOf(e.currentTarget.value)

        if (index >= 0) {
            arr.splice(index, 1)
        } else {
            arr.push(e.currentTarget.value)
        }

        setFormState({ ...formState, [e.currentTarget.id]: arr })

        if (arr.length < 1) {
            setFormErrors({ ...formErrors, [e.currentTarget.id]: "select at least one option" })
            e.currentTarget.classList.add("invalid-input-value")
        } else {
            setFormErrors({ ...formErrors, [e.currentTarget.id]: null })
            e.currentTarget.classList.remove("invalid-input-value")
        }

    }

    function handleRemoveTableField(i) {
        try {
            let tmp = [
                ...formState.slice(0, i),
                ...formState.slice(i + 1),
            ];
            // tmp.splice(i, 1)
            setFormState([...tmp])
        } catch (e) {
            console.log("catch e ", e);
        }
        // setFormState([...formState])
    }

    function handleInputChange(e) {
        const validate = validateFields(e.currentTarget)
        let newValue = e.currentTarget.value
        validate ? setFormErrors({ ...formErrors, [e.currentTarget.id]: validate }) : (delete formErrors[e.currentTarget.id])


        if (!validate) {
            if (e.currentTarget.pattern) {

                newValue = new RegExp(e.currentTarget.pattern).exec(e.currentTarget.value)[0]
            }
            e.currentTarget.classList.remove("invalid-input-value")
            e.currentTarget.classList.add("valid-input-value")
        }


        setFormState({ ...formState, [e.currentTarget.id]: newValue })
    }

    function handleIndexedInputChange(e) {


        const [id, key] = (e.currentTarget.id).split(".")
        let newValue = e.currentTarget.value;
        const validate = validateFields(e.currentTarget)
        validate ? setFormErrors({ ...formErrors, [e.currentTarget.id]: validate }) : (delete formErrors[e.currentTarget.id])

        if (!validate) {
            e.currentTarget.classList.remove("invalid-input-value")
            e.currentTarget.classList.add("valid-input-value")
            newValue = new RegExp(e.currentTarget.pattern).exec(e.currentTarget.value)[0]
        }
        let temp = formState[id]
        temp = { ...temp, [key]: newValue }
        setFormState({ ...formState, [id]: temp })
    }

    function handleDateRangeInputChange(e) {
        const [id, key] = (e.currentTarget.id).split(".")

        let temp = formState[id]
        temp = { ...temp, [key]: e.currentTarget.value }

        setFormState({ ...formState, [id]: temp })
    }

    function handleSelected(e) {

        const validate = validateFields(e.currentTarget)
        validate ? setFormErrors({ ...formErrors, [e.currentTarget.id]: validate }) : (delete formErrors[e.currentTarget.id])

        if (!validate) {
            e.currentTarget.classList.remove("invalid-input-value")
            e.currentTarget.classList.add("valid-input-value")
        }

        setFormState({ ...formState, [e.currentTarget.id]: e.currentTarget.value })
    }

    function handleFileUpload(e, type, schemeid) {
        setFormState({
            ...formState,
            [type]: {
                file_name: e.target.files[0].name,
                user_id: localStorage.getItem("user_id"),
                schemeid: schemeid,
                date_uploaded: new Date(),
            },
        });
    }

    function handleToggleChange(e) {

        const validate = validateFields(e.currentTarget)

        validate ? setFormErrors({ ...formErrors, [e.currentTarget.id]: validate }) : (delete formErrors[e.currentTarget.id])

        if (!validate) {
            e.currentTarget.classList.remove("invalid-input-value")
            e.currentTarget.classList.add("valid-input-value")
        }

        setFormState({ ...formState, [e.currentTarget.id]: e.currentTarget.checked })
    }

    const handleDateChange = (date) => {
        const validate = validateFields(date.currentTarget)

        validate ? setFormErrors({ ...formErrors, [date.currentTarget.id]: validate }) : (delete formErrors[date.currentTarget.id])

        if (!validate) {
            date.currentTarget.classList.remove("invalid-input-value")
            date.currentTarget.classList.add("valid-input-value")
        }
        setFormState({ ...formState, [date.currentTarget.id]: new Date(date.currentTarget.value) })

    };
    function formSubmitHandler(e) {
        e.preventDefault();
        const form = e.target;
        const inputs = form.querySelectorAll('input,select,select-one');
    
        const values = Object.values(inputs).map((input) => {
          const validate = validateFields(input);
          validate
            ? setFormErrors({ ...formErrors, [input.id]: validate })
            : delete formErrors[input.id];
    
          return validate;
    
        }).filter(val => val != false);
    
        return values.length == 0 ? false : true
      }

    return {
        formState,
        formErrors,
        handleInputChange,
        handleToggleChange,
        handleSelected,
        handleFileUpload,
        handleDateChange,
        handleTableFormField,
        handleAddTableField,
        initTableState,
        handleRemoveTableField,
        handleIndexedInputChange,
        handleMultiSelect,
        formSubmitHandler,
        handleDateRangeInputChange
    };
}
export default useFormHook;
