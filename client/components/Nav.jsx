import React from "react";

const Nav = () => 
  <nav>
    <a href="/" >Home</a> | 
    <a width="100" href="/champions">Champions</a>
  </nav>


export default props => {
  const { children } = props;
  return (
    <div className="container-fluid">
      <Nav />
    </div>
  );
}
