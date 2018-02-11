import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import '../node_modules/bootstrap/dist/js/bootstrap';
//css
import './index.css';
import './Css/Main.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

// component imports
import Routes from './router.js';

ReactDom.render(
    <MuiThemeProvider>
        <BrowserRouter>
            <Routes />
        </BrowserRouter>
    </MuiThemeProvider>
    , document.getElementById('app')
);
