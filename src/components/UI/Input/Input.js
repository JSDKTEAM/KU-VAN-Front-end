import React from 'react';
import classes from './Input.css';

const Input = (props) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement]
    let validationError = null;
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
        validationError = <p className={classes.ValidationError}>Please enter a valid value!</p>;
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />
            break;
        case ('select'):
            let option = null;
            option = props.elementConfig.option.map((op, index) => {
                return <option
                    key={index}
                    value={op.value}>
                    {op.displayValue}
                </option>
            })
            inputElement = (
                <select
                    onChange={props.changed}
                    className={inputClasses.join(' ')}>
                    {option}
                </select>
            );
            break;

        default:
            inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} />
            break;
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    );
}

export default Input;