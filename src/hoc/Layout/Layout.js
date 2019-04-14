import React, { Component } from "react";
import Aux from "../AuxHoc/Aux";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";

class Layout extends Component {
  state = {
    showSideDrawer: false,
    loginShow: false
  };
  render() {
    return (
      <Aux>
        <Toolbar 
        login = {this.state.loginShow}/>
        <main >{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
//