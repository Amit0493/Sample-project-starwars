import React from 'react';
import SearchBar from '../../Components/SearchBar/SearchBar';
import {connect} from 'react-redux';
import {getPlanetsData} from '../../Redux/Actions/planet';
import {getUserData,saveUserInRedux} from '../../Redux/Actions/users';
import AppBar from 'material-ui/AppBar';
import CircularProgress from 'material-ui/CircularProgress';
import AllPlanets from '../../Components/Planet/PlanetCard';
import RightMenu from '../../Components/AppBar/RightMenu';
import './Search.css';
import SearchState from './SearchStateInitialization';

class Search extends React.Component{
    state={
        ...SearchState
    }

    searchChanged=(e)=>{
        this.setState({isLoading:true});
        this.state.searchCounter += 1;
        if(this.state.searchCounter <= 15 || this.props.user.name === 'Luke Skywalker') {
            var searchUrl = `https://swapi.co/api/planets/?search=${e.target.value.trim()}`;
            this.savePlanets(searchUrl)
        }else{
            this.setState({
                error:true,
                isLoading:false,
            })
        }
    }
    reinitialiseCounter=()=>{
        this.setState({
            searchCounter:0,
            error:false,
        })
    }
    componentWillMount(){
        if( !localStorage.getItem('userData') && !(this.props.user)){
            this.props.history.push(`/`);
        }else{
            const user = localStorage.getItem('userData');
            this.savePlanets(`https://swapi.co/api/planets/`);
            let url = `https://swapi.co/api/people/?search=${user}`
            this.props.getUserData(url,(res)=>{
                if(res.results.length >0){
                    const user = res.results[0];
                    this.props.saveUserInRedux(user);
                }
            })
        }
    }
    componentDidMount(){
        this.counter = setInterval(this.reinitialiseCounter ,1000*60);
    }
    componentWillUnmount(){
        clearInterval(this.counter);
    }
    savePlanets(searchUrl){
        this.props.getPlanetsData(searchUrl,(res)=>{
            var sortedPlanets = res.results.sort((a,b)=>{
                let aPopulation = isNaN(a.population) ? 0 : a.population;
                let bPopulation = isNaN(b.population) ? 0 : b.population;
                return (bPopulation - aPopulation);
            })
            if(res.results) {
                this.setState({ planets: sortedPlanets,isLoading:false,serachIsDisabled:false})
            }
        },(err)=>{
            console.log(" the error is",err);
        })
    }
    getPlanets(planets){
        if(planets.length>0){
            return planets.map((element,index)=>{
                return (<AllPlanets planet={element} key={index} index={index}/>
                )
            })
        }else{
            return (<div>
                No planets
            </div>)
        }

    }
    signOut = (e)=>{
        localStorage.clear();
        this.props.history.push('/');
    }
    render(){
        return(
                <div className="col-xs-12 no-padding">
                    <div className="col-xs-12">
                        <AppBar
                            title="Star War Planets"
                            iconElementRight={<RightMenu signout={this.signOut}/>}
                        />
                    </div>
                    <SearchBar searchChanged={this.searchChanged} isDisabled={this.serachIsDisabled}/>
                    {this.state.error && <div className="col-xs-12">
                        <p style={{
                        color:'red',
                        }}>You have reached the maximun number of searches per minute</p>
                    </div>}
                    <div className="col-xs-12">
                        {(!this.state.isLoading) &&this.getPlanets(this.state.planets)}
                        {(this.state.isLoading && <div className="col-xs-12 loading">
                            <div className="col-xs-2 ">
                                <CircularProgress size={80} thickness={5} />
                            </div>
                        </div>)}
                    </div>
                </div>
        )
    }

}

const mapStateToProps = (state)=>{
    return {...state.user}
}

const mapDispatchToProps  = function (dispatch) {
    return ({
        getUserData:(url,successCallback,errorCallback)=>{
            dispatch(getUserData(url,successCallback,errorCallback))
        },
        saveUserInRedux:(user)=>{
            dispatch(saveUserInRedux(user))
        },
        getPlanetsData:(url,successCallback,errorCallback)=>{
            dispatch(getPlanetsData(url,successCallback,errorCallback))
        }
    })
}
Search = connect(mapStateToProps,mapDispatchToProps)(Search)
export default Search;