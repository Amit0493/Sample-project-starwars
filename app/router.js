import React from "react";
import { Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { withRouter } from "react-router-dom";
import App from './Containers/App';
import Search from './Containers/Search/Search';
import Store from  './Redux/index';

class Routes extends  React.Component{
render(){
    return(
        <Provider store={Store} >
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/search" component={Search}/>
            </Switch>
        </Provider>
    )
}
}

export default withRouter(Routes);
