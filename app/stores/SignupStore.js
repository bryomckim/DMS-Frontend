import alt from '../alt';
import SignupAction from '../actions/signupActions';

class SignupStore {
  constructor() {
    this.state = {
      message: {},
      error: '',
    }

    this.bindListeners({
      handleSignup: SignupAction.createUser,
      handleSignupSuccess: SignupAction.signupSuccess,
      handleError: SignupAction.signupError,
    });
  }

  handleSignup() {
    // while it is signing up
    this.setState({message: {}, error: ''})
  }

  handleSignupSuccess(user) {
    this.setState({message: user})
  }

  handleError(error) {
    this.setState({error: err})
  }
}

export default alt.createStore(SignupStore);