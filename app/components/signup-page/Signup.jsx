import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import Checkbox from 'material-ui/lib/checkbox';
import SignupAction from '../../actions/SignupActions.js';
import SignupStore from '../../stores/SignupStore';
import LoginActions from '../../actions/LoginActions';
import LoginStore from '../../stores/LoginStore';
import connectToStores from 'alt-utils/lib/connectToStores';

const FMUI = require('formsy-material-ui');
const {FormsyText} = FMUI;

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canSubmit: false,
      model: null,
      success: false,
      error: false,
      message: '',
      errormsg: ''
    }
  }

  componentDidMount() {
    SignupStore.listen(this.onChange);
  }

  onChange = (state) => {
    if (state && state.message) {
      this.setState({success: true, errormsg: '', message: 'Signup success. Proceed to login.'});
      LoginActions.loginUser(this.state.model);
      this.props.onClick();
    } else if (state && state.error) {
      if(state.error.indexOf('username') > -1) {
        this.setState({success: false, error: true, errormsg: 'username already taken'});
      }
    }
  };

  handleCreateUser = (model, resetForm) => {
    this.setState({model: model});
    SignupAction.createUser(model);
    resetForm();
  };
  componentWillUnmount() {
    this.setState({success: false});
  }
  enableButton = () => {
    this.setState({canSubmit: true});
  };

  disableButton = () => {
    this.setState({canSubmit: false});
  };

  render() {
    return (
      <Dialog actionsContainerClassName="" bodyClassName="" modal={false} open={this.props.opensignup} onRequestClose={this.props.onClick} autoScrollBodyContent>
        <div className="signup">
          <h3 className="">Sign up</h3>
          <p className="">To save stories or get stories, edit or delete – all free.</p>
          <hr/>
          <div className="row">
            <p style={
                this.state.success ?
                   {
                     display: 'block',
                     color: '#0ACA36',
                     textAlign: 'center',
                     fontSize: '1.2em',
                     fontFamily: 'monospace'
                    }
                 : {display: 'none'}
              }
              >{this.state.message}</p>
              <p style={
                  this.state.error ?
                     {
                       display: 'block',
                       color: '#F12727',
                       textAlign: 'center',
                       fontSize: '1.2em',
                       fontFamily: 'monospace'
                      }
                   : {display: 'none'}
                }
                >{this.state.errormsg}</p>
          </div>
          <Formsy.Form onValid={this.enableButton} onInvalid={this.disableButton} onValidSubmit={this.handleCreateUser}>
            <FormsyText className="" name='username' validations='isWords' validationError="Please use letters only" required fullWidth hintText="johndoe?" floatingLabelText="Username"/>
            <br/>
            <FormsyText className="" name='email' validations='isEmail' fullWidth validationError="Please enter a valid email" required hintText="johndoe@example.com" floatingLabelText="email"/>
            <FormsyText className="" name='firstname' fullWidth validations='isWords' validationError="Please use letters only" required hintText="John" floatingLabelText="Firstname"/>
            <FormsyText className="" name='lastname' validations='isWords' fullWidth validationError="Please use letters only" required hintText="Doe" floatingLabelText="Lastname"/>
            <FormsyText className="" name='password' fullWidth validations="minLength:6" validationError="Length should be greater than 6" required hintText="Password" type="password" floatingLabelText="Password"/>
            <FormsyText className="" name='repeated_password' fullWidth validations="equalsField:password" validationError="Passwords don't match" required hintText="Repeat Password" type="password" floatingLabelText="Repeat Password"/>
            <br/>
            <RaisedButton className="" label="Create account" type="submit" primary={true} disabled={!this.state.canSubmit}/>
          </Formsy.Form>
          <div className="row">
            <p className="">Already have an account?</p>
            <FlatButton label="Log In" secondary={true} onTouchTap={this.props.loginAction}/>
          </div>
        </div>
      </Dialog>
    );
  }
}

export default Signup;
// export default connectToStores(Signup);
