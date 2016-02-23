import React from 'react';
import SideBar from '../side-bar/side-card.jsx';
import AppBar from 'material-ui/lib/app-bar';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';
import FontIcon from 'material-ui/lib/font-icon';
import FlatButton from 'material-ui/lib/flat-button';
import Login from '../login-page/login.jsx';
import Signup from '../signup-page/signup.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
import CategoryList from '../side-bar/Category-list.jsx';
import Snackbar from 'material-ui/lib/snackbar';
import RaisedButton from 'material-ui/lib/raised-button';
import Colors from 'material-ui/lib/styles/colors';

import SessionActions from '../../actions/SessionActions';
import SessionStore from '../../stores/SessionStore';
import connectToStores from 'alt-utils/lib/connectToStores';

import Link from 'react-router';
injectTapEventPlugin();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openlogin: false,
      opensignup: false,
      opensnackbar: false,
      isLoggedIn: false
    };
  }


  static getStores(props) {
    return [SessionStore];
  }

  static getPropsFromStores(props) {
    return SessionStore.getState()
  }


  componentWillReceiveProps(nextProps) {

  }
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentDidMount() {
    console.log('Mounted');
    // listen for store changes
    SessionStore.listen(this.onSession);
  }

  onSession = (state) => {
    console.log('Nav state',state);
    if(!state.error && state.user) {
      this.setState({isLoggedIn: true});
    } else {
      this.setState({isLoggedIn: false});
    }
  };

  handleToggle = () => {this.setState({open: !this.state.open}); console.log('Cliked');};

  handleClose = () => this.setState({open: false});

  handleLogin = () => this.setState({openlogin: true, opensignup: false});

  handleloginclose = () => this.setState({openlogin: false});

  handlesignup = () => this.setState({opensignup: true, openlogin: false});

  handlesignupclose = () => this.setState({opensignup: false});

  handleSnackBar = () => this.setState({opensnackbar: true});

  handleSnackBarClose = () => this.setState({opensnackbar: false});

  handleTitleTouchTap = () => {
    console.log('fjkbshfj');
  };


  render() {
    return (
      <div>
        <AppBar
          className="navbar"
          id="navbar"
          title={<span style={{cursor: 'pointer'}}>DMS</span>}
          onTitleTouchTap={this.handleTitleTouchTap}
          iconElementLeft={
            <IconButton onTouchTap={this.handleToggle}>
              <FontIcon className="muidocs-icon-action-home" color={Colors.red500}><i className="fa fa-bars"></i></FontIcon>
            </IconButton>
          }
          iconElementRight={
            (this.state.isLoggedIn) ? <RaisedButton label="Create Document" linkButton href="/create" primary={true} style={{margin: 10}}/>
          : <FlatButton label="Login" style={{color: 'red'}} onTouchTap={this.handleLogin}/>
          }
          style={{backgroundColor: '#FFF', position: 'fixed', boxShadow: 'none'}}
        />
      <Login
        openlogin={this.state.openlogin}
        onClick={this.handleloginclose.bind(this)}
        signupAction={this.handlesignup.bind(this)}
        snackbar={this.handleSnackBar.bind(this)}
      />
      <Signup
        opensignup={this.state.opensignup}
        onClick={this.handlesignupclose.bind(this)}
        loginAction={this.handleLogin.bind(this)}
        snackbar={this.handleSnackBar.bind(this)}
      />
        <LeftNav
          docked={false}
          width={300}
          open={this.state.open}
          onRequestChange={open => this.setState({open})}
        >
          <SideBar />
          <MenuItem onTouchTap={this.handleClose}> <i className="fa fa-home"></i> Home</MenuItem>
          <CategoryList />
        </LeftNav>
        <Snackbar
         open={this.state.opensnackbar}
         message="Welcome to DMS"
         autoHideDuration={4000}
         onRequestClose={this.handleSnackBarClose}
       />
      </div>
    );
  }
}

export default connectToStores(App);
