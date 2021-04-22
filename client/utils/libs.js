// export libraries for server side using
import { createElement as c } from "react";
import { renderToString as r } from 'react-dom/server';

export const renderToString = r;
export const createElement = c;
