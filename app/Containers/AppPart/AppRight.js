import React from 'react';
import Nowrap from '../NoWrap/nowrap';
import './AppPart.css';
import TextField from 'material-ui/TextField';
import {getUserData} from '../../Redux/Actions/users';
import {connect} from 'react-redux';
import {saveUserInRedux} from '../../Redux/Actions/users';
class AppRightSide extends React.Component{

    constructor(props){
        super(props);
    }
    componentWillMount(){
    }
    state={
        username:'',
        password:'',
        usernameError:false,
        passwordError:false,
        detailsIncorrect:false,
        persist:true,
        error:null
    }

    setValue= (field, e)=> {
        if(this.state.usernameError || this.state.passwordError || this.state.detailsIncorrect){
            this.setState({
                usernameError:false,
                passwordError:false,
                detailsIncorrect:false,
                error:null
            })
        }
        this.setState({
            [field]: e.target.value
        });
    }
    logUserIn = (e)=>{
        e.preventDefault();
        if(this.state.username.length <= 0){
            this.setState({error:'Enter Username',usernameError:true})

        }else if(this.state.password.length <=0){
            this.setState({error:'Enter password',passwordError:true})
        }else{
            let url = `https://swapi.co/api/people/?search=${this.state.username}`
            this.props.dispatch(getUserData(url,(res)=>{
                if(res.results.length >0){
                    const user = res.results[0];
                    if(user.birth_year === this.state.password){
                        if(this.state.persist){
                            localStorage.setItem("userData",this.state.username);
                        }
                        this.props.dispatch(saveUserInRedux(user));
                        this.props.navigateTo('search');
                    }else{
                        this.setState({error:'Incorrect password',passwordError:true})
                    }

                }else{
                    this.setState({
                        error:'Either username or password incorrect',
                        detailsIncorrect:true
                    })
                }

            },(err)=>{
                this.setState({
                            error:'Either username or password incorrect',
                            detailsIncorrect:true
                        })
            }))

        }

    }
    persistUser(e){
        this.setState({persist: e.target.checked});

    }

    render(){
        return(
            <Nowrap>
                <div className="col-xs-12 menu-wrapper" style={{
                    marginTop:"30%"
                }}>
                    <div className="col-xs-6 text-center login-menu">
                        <h2> <span className="menu-text point-cusor-selected">LOG IN </span></h2>

                    </div>
                    <div className="col-xs-6 text-center signup-menu">
                        <h2> <span className="menu-text point-cusor-selected">Sign Up</span></h2>

                    </div>
                </div>
                <div className="col-xs-12">
                    <form onSubmit={this.logUserIn}>
                        <div className="col-xs-12 seperate-content">
                            <TextField
                                className="input-text"
                                floatingLabelText="Username"
                                type="text"
                                errorText={this.state.usernameError?this.state.error:null}
                                onChange={(e)=>(this.setValue('username',e))}

                            />
                            <br/>
                            <TextField
                                className="input-text"
                                floatingLabelText="Password"
                                type="password"
                                errorText={this.state.passwordError?this.state.error:null}
                                onChange={(e)=>(this.setValue('password',e))}
                            />
                        </div>
                        <div className="col-xs-12 seperate-content">
                            <span className="col-xs-6 checkbox-wrapper">
                                <label className="checkbox-label"htmlFor="persistLogin"> Do Not Sign Out</label>
                                <input style={{
                                    float:"left"
                                }} className="checkbox-react-dark" type="checkbox" id="persistLogin" checked={this.state.persist} onChange={this.persistUser.bind(this)}/>
                            </span>
                        </div>
                        <div className="col-xs-12">
                            {this.state.detailsIncorrect && <p className="text-warning"> {this.state.error}</p>}
                        </div>
                        <div className="col-xs-12 seperate-content">
                            <button className="col-xs-6 point-cusor-selected submit-button" type="submit"
                                    onClick={this.logUserIn}
                            >
                                LOG IN
                            </button>
                        </div>
                    </form>

                </div>
            </Nowrap>
        )
    }
}

AppRightSide = connect()(AppRightSide);
export default AppRightSide;