import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import Checkbox from 'material-ui/lib/checkbox';
import LoginActions from '../../actions/LoginActions';
import LoginStore from '../../stores/LoginStore';
import connectToStores from 'alt-utils/lib/connectToStores';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: false,
    }
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  static getStores(props) {
    return [LoginStore];
  }

  static getPropsFromStores(props) {
    // called when stores experience change in state
    return LoginStore.getState();
  }

  handleFieldChange(e) {
    let field = e.target.name;
    let value = e.target.value;
    if(field === 'username') {
      this.setState({username: value})
    } else if(field === 'password') {
      this.setState({password: value});
    }
  }

  componentDidMount() {
    LoginStore.listen(this.onChange);
  }

  onChange(state) {
    if(state && state.message.success) {
      this.setState({error: false});
      this.props.snackbar();
      this.props.onClick();
      localStorage.setItem('x-access-token', state.message.token);
      var user = {
        username: state.message.user.username,
        id: state.message.user._id,
        roleId: state.message.user.role._id,
        title: state.message.user.role.title,
      };
      localStorage.setItem('user', JSON.stringify(user));
    } else if(state && state.error.error){
      console.log('error', state);
      this.setState({error: true});
    }
  }

  handleLogin() {
    let user = {
      username: this.state.username,
      password: this.state.password,
    };
    LoginActions.loginUser(user);
  }

  render() {
    return (
        <Dialog
          actionsContainerClassName="trial"
          bodyClassName="loginDialog"
          modal={false}
          open={this.props.openlogin}
          onRequestClose={this.props.onClick}
          autoScrollBodyContent
        >
        <div className="login">
          <h3 className="">Log In</h3>
          <p className="">To save stories or get stories, edit or delete – all free.</p>
          <hr/>
          <div className="row">
            <TextField
              hintText="johndoe"
              floatingLabelText="Username"
              onChange={this.handleFieldChange}
              name="username"
              fullWidth
            />
          </div>
          <div className="row">
            <TextField
              hintText="johndoe"
              floatingLabelText="password"
              type="password"
              onChange={this.handleFieldChange}
              name="password"
              fullWidth
            />
          </div>
          <div className="row">
            <Checkbox
              className=""
              label="Remember me"
              defaultChecked={true}
            />
          </div>
          <div className="row">
            <p style={
                this.state.error ?
                   {
                     display: 'block',
                     color: '#FF0404',
                     'text-align': 'center',
                     'font-size': '1.2em',
                     'font-family': 'monospace'
                    }
                 : {display: 'none'}
              }
              >Wrong username/password combination</p>
          </div>
          <div className="row">
            <RaisedButton
              className="loginbtn"
              label="Log in"
              primary={true}
              onTouchTap={this.handleLogin}
              fullWidth
            />
          </div>
          <div className="row">
            <RaisedButton
              style={{marginTop: 10}}
              className="signupbtn"
              label="Sign up"
              secondary={true}
              onTouchTap={this.props.signupAction}
              fullWidth
            />
          </div>
        </div>
      </Dialog>
    );
  }
}

export default connectToStores(Login);
