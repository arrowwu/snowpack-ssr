import React from "react";
import Nav from "../../components/Nav.jsx";

//props come from 
//templateEngineFunc -> 'const children = createElement(PageComponent, pageProps);'
const Champions = props => {
  return (
    <>
      <Nav /> 
      <h1>Champions</h1>
      <ul>
        {props.names.map(
          (name) => 
            <div key={name}>
              <a href={`/champions/${name}`}>{name}</a>
              <br />
            </div>
                  
        )}
      </ul>
    </>
  );
}

export async function getProps({ api, options }) {
  const res = await api.getChampions();
  const json = await res.json();
  const props = {
    names: Object.keys(json.data),
  };

  return props;
}

export default Champions;
