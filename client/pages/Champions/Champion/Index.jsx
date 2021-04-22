import React from "react";
import { useState } from "react";
import Nav from "../../../components/Nav.jsx";

const handleClick = name => {
  
  // Make sure we are calling alert() from browser, alert is not part of js and server side view template engine
  // will throw an exception when parsing it
  if(typeof window !== 'undefined') {
    alert(name + " clicked!")
  }
}

const Champion = props => {  
  const [state, ] = useState(props);
  const { name, title, stats} = state;
  return (
    <>
      <Nav />
      <h1 onClick={() => handleClick(name)}>{name}</h1>
      <p>{title}</p>
      <ul>Stats:
        <li>hp: {stats.hp}</li>
        <li>movespeed: {stats.movespeed}</li>
      </ul>
    </>
  );
}

export async function getProps({ api, options }) {
  const res = await api.getChampionInfo(options.id);
  const json = await res.json();
  const props = json.data[options.id];
  return props;
}

export default Champion;
