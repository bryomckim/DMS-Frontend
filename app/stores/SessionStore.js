import alt from '../alt';
import SessionActions from '../actions/SessionActions';

class SessionStore {
  constructor() {
    this.state = {user: [], error: null};
    this.bindListeners({
      handleSession: SessionActions.getSession,
      handleSessionSuccess: SessionActions.sessionSuccessDispatcher,
      handleSessionError: SessionActions.invalidSessionDispatcher
    });
  }

  handleSession(session) {
    this.setState({user: []});
  }

  handleSessionSuccess(user) {
    this.setState({user: user, error: null});
  }

  handleSessionError(error) {
    this.setState({error: error, user: null});
  }
}

export default alt.createStore(SessionStore, 'SessionStore');
