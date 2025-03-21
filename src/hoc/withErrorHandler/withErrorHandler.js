import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../AuxHoc/Aux';
import swal from 'sweetalert';

const withErrorHandler = (WrappedComponent, axios) => {
	return class extends Component {
		state = {
			error: null
		};

		componentWillMount() {
			this.reqInterceptor = axios.interceptors.request.use(req => {
				this.setState({
					error: null
				});
				return req;
			});
			this.resInterceptor = axios.interceptors.response.use(
				res => res,
				error => {
					// this.setState({
					// 	error: error
					// });
					console.log(error.response);
					swal(error.response.data.message, "", "error");
				}
			);
		}

		componentWillUnmount() {
			axios.interceptors.request.eject(this.reqInterceptor);
			axios.interceptors.response.eject(this.resInterceptor);
		}

		errorComfirmedHandler = () => {
			this.setState({
				error: null
			});
		};

		render() {
			return (
				<Aux>
					<Modal show={this.state.error} modalClosed={this.errorComfirmedHandler}>
						{this.state.error ? this.state.error.message : null}{' '}
					</Modal>{' '}
					<WrappedComponent {...this.props} />{' '}
				</Aux>
			);
		}
	};
};

/*const withErrorHandler = (WrappedComponent,axios) =>{
    return class extends Component {
        state = {
            error:null
        }

        componentDidMount () {
            axios.interceptors.request.use(req => {
                this.setState({error:null})
                return req;
            });
            axios.interceptors.response.use(res => res,error => {
                this.setStat({error:error}); 
                
            })
        }
        
        errorConfirmedHandler = () =>{
            this.setState({error:null});
        }
        render(){
            return (
                <Aux>
                    <Modal show>
                        Error
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            );
        }

    }
}*/

export default withErrorHandler;
