import React, {Component}from 'react'
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

class mainBtn extends Component {
    render(){
        let btn = null;

        btn = (
            <div>
                <Button 
                    variant="outlined" 
                    onClick={(val) => { this.props.tr("add");}}
                    style={{marginRight:20}}>
                    <AddIcon/>เพิ่มรอบ
                </Button>
                <Button 
                    variant="contained" 
                    color="primary"
                    onClick={(val) => { this.props.timeDef();}}>
                    ค่าเริ่มต้น
                </Button>
            </div>
        );
        
        return btn;
    }
    
};

mainBtn.propTypes ={
    type:PropTypes.string.isRequired,
} 

export default mainBtn;