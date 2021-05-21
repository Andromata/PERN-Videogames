import React, { Fragment } from "react";
import "../../Styles/navBar.scss";
const NavBar = () => {
  return (
    <Fragment>
      <div className="navBar">
        <div className="logo">
          <i class="fas fa-spider"></i>
          <h3>VGWEB</h3>
        </div>
      </div>
    </Fragment>
  );
};

export default NavBar;
