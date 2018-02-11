import React from 'react';
import {connect} from 'react-redux';
import AppLeftSide from './AppPart/AppLeft';
import AppRightSide from './AppPart/AppRight';
import './App.css';

class App extends React.Component {
    componentWillMount(){
    }
    navigateTo=(route)=>{
        this.props.history.push(`/${route}`)
    }

    render() {
        return (
            <div className="col-xs-12 no-padding" style={{display:'flex'}}>
                <div className="col-xs-6 app-left-side">
                    <AppLeftSide/>

                </div>
                <div className="col-xs-6 app-right-side">
                    <AppRightSide navigateTo={this.navigateTo} />
                </div>
            </div>
        )
    }
}
const mapStateToProps = ()=>{
    return {};
}

App = connect(mapStateToProps)(App);
export default App;