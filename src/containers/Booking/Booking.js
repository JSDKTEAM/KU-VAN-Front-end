import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import classes from './ContactData.css';
import Aux from '../../../hoc/AuxHoc/Aux';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as action from '../../../store/actions/index';

class ContactData extends Component {
    state = {
        bookForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    option: [
                        { vaule: 'fastest', displayValue: 'Fastest' },
                        { value: 'chepeas', displayValue: 'Chepeas' }
                    ]
                },
                value: 'fastest',
            }
        },
        formIsValid: false,
        loading: false
    }

    checkValidity(value, rules) {
        let isValid = false;
        if (rules) {
            if (rules.required) {
                isValid = value.trim() !== '';
            }

            if (rules.minLength) {
                isValid = value.length >= rules.minLength && isValid;
            }

            if (rules.maxLength) {
                isValid = value.length <= rules.maxLength && isValid;
            }
            return isValid;
        }
        return true;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatebookForm = { ...this.state.bookForm };
        updatebookForm[inputIdentifier].value = event.target.value;
        updatebookForm[inputIdentifier].valid = this.checkValidity(updatebookForm[inputIdentifier].value, updatebookForm[inputIdentifier].validation);
        updatebookForm[inputIdentifier].touched = true;
        let formIsValid = true;
        for (let key in updatebookForm) {
            if (updatebookForm[key].validation) {
                formIsValid = updatebookForm[key].valid && formIsValid;
            }
        }

        this.setState({ bookForm: updatebookForm, formIsValid: formIsValid });
    }

    orderHandler = (event) => {
        event.preventDefault();
        //this.setState({ loading: true });
        const formdata = {};
        for (let formElementIdentifier in this.state.bookForm) {
            formdata[formElementIdentifier] = this.state.bookForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            customer: {
                name: formdata.name,
                address: {
                    street: formdata.street,
                    zipcode: formdata.zipCode,
                    country: formdata.country
                },
                email: formdata.email
            },
            deliveryMethod: formdata.deliveryMethod
        };
        this.props.onOrderBurger(order);
    }

    render() {
        let bookForm = [];
        for (let key in this.state.bookForm) {
            bookForm.push({
                ...this.state.bookForm[key],
                id: key
            })
        }
        let inputElement = null;
        inputElement = bookForm.map(input => {
            return <Input
                key={input.id}
                elementConfig={input.elementConfig}
                elementType={input.elementType}
                value={input.value}
                invalid={!input.valid}
                shouldValidate={input.validation}
                touched={input.touched}
                changed={(event) => this.inputChangedHandler(event, input.id)} />
        });
        let ContactData = <Spinner />;
        if (!this.props.loading) {
            ContactData = (
                <Aux>
                    <h4>Enter your Contact Data</h4>
                    <form onSubmit={this.orderHandler}>
                        {inputElement}
                        <Button
                            btnType="Success"
                            disabled={this.state.formIsValid}>ORDER</Button>
                    </form>
                </Aux>
            )
        }
        return (
            <div className={classes.ContactData}>
                {ContactData}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    loading: state.station.loading
})

const mapDispatchProps = (dispatch) => ({
    onOrderBurger: (orderData) => dispatch(action.purchaseBurger(orderData))
})

export default connect(mapStateToProps, mapDispatchProps)(withErrorHandler(ContactData, axios));

