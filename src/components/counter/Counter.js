import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as counterActions from '../../actions/counterActions';

export class Counter extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.incrementCounter = this.incrementCounter.bind(this);
        this.decrementCounter = this.decrementCounter.bind(this);
        this.clearCounterAsync = this.clearCounterAsync.bind(this);
    }

    incrementCounter() {
        this.props.actions.incrementCounter();
    }

    decrementCounter() {
        this.props.actions.decrementCounter();
    }

    clearCounterAsync() {
        this.props.actions.clearCounterAsync();
    }

    render() {
        return (
            <div>
                <h1>Counter</h1>
                <div>
                    <Button onClick={this.incrementCounter} disabled={this.props.isClearing} color="primary" raised>+1</Button>
                    <Button onClick={this.decrementCounter} disabled={this.props.isClearing} color="accent" raised>-1</Button>
                    <Button onClick={this.clearCounterAsync} disabled={this.props.isClearing} raised>Clear (maybe?)</Button>
                </div>
                <br/>
                <div>value: {this.props.isClearing ? 'Clearing...' : this.props.value}</div>
                <br/>
                <Link to="/">Home</Link>
            </div>
        );
    };
}


const mapStateToProps = (state) => {
    return {
        isClearing: state.counter.isClearing,
        value: state.counter.value
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(counterActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
