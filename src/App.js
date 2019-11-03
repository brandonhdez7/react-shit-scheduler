import React, { Component } from 'react'
import axios from 'axios'
import { Route, Link, Switch, Redirect } from 'react-router-dom'
import LoginForm from './components/children/LoginForm'
import SignupForm from './components/children/SignupForm'
import Main from './components/Main'
import Manager from "./components/Manager";
import ManagerHome from "./components/children/ManagerHome";
import ManagerEmployeeAll from "./components/children/ManagerEmployeeAll";
import ManagerSchedulesCreate from "./components/children/ManagerSchedulesCreate";
// employee components
import Employee from "./components/Employee";
import EmployeeHome from "./components/children/EmployeeHome";
import ScheduleView from "./components/children/ScheduleView";
import AnnouncementsView from "./components/children/AnnouncementsView";
import './App.css';

const DisplayLinks = props => {
	if (props.loggedIn) {
		return (
			<nav className="navbar">
				<ul className="nav">
					<li>
						<Link to="/logout" className="nav-link black-text" onClick={props._logout}>
							Logout
						</Link>
					</li>
					<li className="nav-item">
						
					</li>
				</ul>
			</nav>
		)
	} 
	else {
		return (
			<nav className="navbar">
				<ul className="nav">
					<li className="nav-item">
						<Link to="/login" id="login-btn" className="nav-link black-text">
							Login
						</Link>
					</li>
					<li className="nav-item">
						<Link to="/signup" id="signup-btn" className="nav-link black-text">
							Signup
						</Link>
					</li>
					<li className="nav-item">
					</li>
				</ul>
			</nav>
		)
	}
}

class App extends Component {
	constructor() {
		super()
		this.state = {
			loggedIn: false,
			user: null,
			userType: "",
			fireRedirect: false
		}
		this._logout = this._logout.bind(this)
		this._login = this._login.bind(this)
	}
	componentDidMount() {
		axios.get('/auth/user').then(response => {
			console.log(response.data)
			if (!!response.data.user) {
				console.log('THERE IS A USER')
				this.setState({
					loggedIn: true,
					user: response.data.user,
					fireRedirect: false
				})
			} 
			else {
				this.setState({
					loggedIn: false,
					user: null,
					fireRedirect: false
				})
			}
		})
	}
	_logout(event) {
		event.preventDefault()
		console.log('logging out')
		axios.post('/auth/logout').then(response => {
			console.log(response.data)
			// console.log(response)
			if (response.status === 200) {
				this.setState({
					loggedIn: false,
					user: null,
					userType: "",
					fireRedirect: true
				})
			}
		})
	}
	_login(email, password) {
		axios.post('/auth/login', {
				email,
				password
			})
			.then(response => {
				console.log(response)
				if (response.status === 200) {
					// update the state
					this.setState({
						loggedIn: true,
						user: response.data.user,
						userType: response.data.user.userType,
						fireRedirect: false
					})
			  }
		 })
	}
	render() {
		const { from } = this.state.location || '/';
    const { fireRedirect } = this.state;
		return (
			<div className="App">
				<h3><Link to="/" className="brand-logo"><img className="logo" src="/assets/images/poak_2x.png"/>OAK</Link></h3>
				<DisplayLinks _logout={this._logout} loggedIn={this.state.loggedIn} />
				{/*  ROUTES */}
				<Switch>
					<Route exact path="/" render={() => <Main loggedIn={this.state.loggedIn} userType={this.state.userType} />} />
					<Route path="/login" render={() => <LoginForm _login={this._login} loggedIn={this.state.loggedIn} />} />
					<Route path="/signup" component={SignupForm} />
					<Route exact path="/ManagerHome" render={() => <ManagerHome loggedIn={this.state.loggedIn} />} />
					<Route path="/ManagerHome/employeeAll" component={ManagerEmployeeAll} />
          <Route path="/ManagerHome/schedulesCreate" component={ManagerSchedulesCreate} />
					<Route exact path="/EmployeeHome" render={() => <EmployeeHome loggedIn={this.state.loggedIn} />} />
				</Switch>
				{fireRedirect && (
          <Redirect to={'/'}/>
        )}
			</div>
		)
	}
}
export default App
