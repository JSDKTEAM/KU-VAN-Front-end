import React, { Component } from "react";
import Aux from "../AuxHoc/Aux";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";

class Layout extends Component {
  state = {
    showSideDrawer: false
  };
  render() {
    return (
      <Aux>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
        <main >{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;