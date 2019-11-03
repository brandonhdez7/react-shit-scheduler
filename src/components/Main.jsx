import React from "react";
import { Redirect, Link } from 'react-router-dom';

class Main extends React.Component {
	constructor(){
		super();
		this.state = {
			userType: "",
			loggedIn: false
		};
	}
  render() {
  	if(this.props.loggedIn){
			if(this.props.userType){
				if(this.props.userType === "manager") {
					return (
						<div>
							<Redirect to="/ManagerHome" />
						</div>
					)
				}
				else if(this.props.userType === "employee"){
					return (
						<div>
							<Redirect to="/EmployeeHome" />
						</div>
					)
				}
			}
		}
		return(
			<div className="row">
			<div className="banner1">
        <div className="column_left">
        		<h2>Managing employees just got easier!</h2>
						<p>It is a long established fact that a reader will be of a page when established fact looking at its layout.</p>
							<Link to="/signup" id="signup-btn" className="btn btn-sm purple lighten-3">
	      				Get Started
							</Link>
				</div>
				<div className="column_right">
        		<img src="./assets/images/intro-image.png" className="img-fluid" />
        </div>
		</div>
  <div className="container description">
    <div className="section">
      <div className="row">
        <div className="col s12 m4">
          <div className="icon-block">
            <h2 className="center purple-text"><i className="material-icons home">flash_on</i></h2>
            <h5 className="center">Quick Scheduling</h5>
            <p className="light"> an easy-to-use online employee management app. Keep track of each employee’s schedule. </p>
          </div>
        </div>
        <div className="col s12 m4">
          <div className="icon-block">
            <h2 className="center purple-text"><i className="material-icons home">group</i></h2>
            <h5 className="center">Real time Updating</h5>
            <p className="light">Managers can Add, Remove or Update Employees, And thier schedules, Also Managers can Add An Announcement to all employees, The app automatically updates changes in real time.</p>
          </div>
        </div>
        <div className="col s12 m4">
          <div className="icon-block">
            <h2 className="center purple-text"><i className="material-icons home">settings</i></h2>
            <h5 className="center">Easy to work with</h5>
            <p className="light">With the Gorilla Sheduler app, Managers can quickly see who’s working,  Who’s scheduled and who’s available. </p>
          </div>
        </div>
      </div>
    </div>
    <br></br>
  </div>
  </div>
		);
  }
}
export default Main;
