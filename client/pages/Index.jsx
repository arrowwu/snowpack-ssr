import React from "react";
import Nav from "../components/Nav.js";

const Index = props => {
  return (
    <>
      <Nav />
        <h1>SSR with Snowpack</h1>
        <h3 style={{color:'red'}}>Mode: {import.meta.env.MODE}</h3>
        <p>Click <a width="100" href="/champions">Champions</a> to see all the champions</p>
    </>
  );
}

export default Index;
