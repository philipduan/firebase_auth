import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from './firebase';

class App extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      password: '',
      user: null,
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(this.state.userName, this.state.password)
      .then(data => {
        console.log('Successfully logged in', data);
        firebase.auth().onAuthStateChanged(user => {
          this.setState({ user });
          console.log('this is the state user', this.state.user);
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  handleChangeUser(event) {
    this.setState({
      userName: event.target.value
    })
  }

  handleChangePassword(event) {
    this.setState({
      password: event.target.value
    })
  }

  handleLogOut = (event) => {
    event.preventDefault();
    if (this.state.user) {
      firebase.auth().signOut().then(() => {
        console.log('Successfully signed out');
        this.setState({ user: null })
      }).catch(err => { 'err', err })
    }
  }

  handleLogIn = (event) => {
    event.preventDefault();
    if (this.state.user) {
      console.log(this.state.user)
      return console.log("You are already sign in");
    }
    firebase.auth().signInWithEmailAndPassword(this.state.userName, this.state.password).then(user => {
      console.log('Successfully signed in');
      this.setState({ user })
    }).catch(err => { console.log('err', err) })
  }

  handleCurrent = event => {
    firebase.auth().onAuthStateChanged(user => {
      console.log(user)
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro"> Firebase AUTH </p>
        <div>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <label type="text"> User Name </label>
            <input
              type="text"
              value={this.state.userName}
              onChange={this.handleChangeUser.bind(this)} />

            <label type="text"> Password </label>
            <input
              type="password"
              value={this.state.password}
              onChange={this.handleChangePassword.bind(this)} />
            <button type="submit">Submit</button>
          </form>
          <label type="text"> Log Out </label>
          <button type="button" onClick={this.handleLogOut}>Log Out </button>

          <label type="text"> Sign In </label>
          <button type="button" onClick={this.handleLogIn}>Sign In </button>

          <label type="text"> Current User </label>
          <button type="button" onClick={this.handleCurrent}>Current </button>
        </div>
      </div>
    );
  }
}

export default App;
