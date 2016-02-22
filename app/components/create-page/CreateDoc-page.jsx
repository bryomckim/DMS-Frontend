import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';

import TextField from 'material-ui/lib/text-field';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Select from 'react-select';
import FlatButton from 'material-ui/lib/flat-button';
import Snackbar from 'material-ui/lib/snackbar';
import Checkbox from 'material-ui/lib/checkbox';

import DocumentActions from '../../actions/documentActions';
import DocumentStore from '../../stores/DocumentStore';
import CategoryActions from '../../actions/categoryActions';
import CategoryStore from '../../stores/categoryStore';

const FMUI = require('formsy-material-ui');
const {FormsyText, FormsySelect, FormsyRadioGroup, FormsyRadio} = FMUI;

require('../../styles/component.css');

class CreateDoc extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      content: '',
      accessLevel: 3,
      category: '',
      open: false,
      snackbarmsg: '',
      canSubmit: false,
      categories: []
    }
  }

  handleTouchTap = () => {
    this.setState({open: true});
  };

  handleRequestClose = () => {
    this.setState({open: false});
  };

  componentWillMount() {
    CategoryActions.fetchCategory();
    if (this.props.location.pathname === '/edit') {
      // get the query
      // get the document from db
      // edit data
      // save
      console.log(this.props.location.query.document);
      var id = this.props.location.query.document;
      let token = localStorage.getItem('x-access-token');
      DocumentActions.getDocument(id, token);

    }
  }

  componentDidMount() {
    console.log(this.state.title);
    CategoryStore.listen(this.onCategoryChange);
    DocumentStore.listen(this.onChange);
  }

  onCategoryChange = (state) => {
    console.log(state.categories);
    this.setState({categories: state.categories});
  };

  onChange = (state) => {
    console.log('STATE', state);
    if (!state.errorMessage && state.documents.doc) {
      console.log('saved');
      this.setState({snackbarmsg: 'created successfully'});
      this.handleTouchTap();
    }
    if (!state.errorMessage && state.documents.data) {
      console.log('fetched data');
      this.setState({title: state.documents.data.title, content: state.documents.data.content, category: state.documents.data.category.category});
    }
    if (!state.errorMessage && state.documents.title) {
      console.log('updated');
      this.setState({title: '', content: '', category: ''});
      this.setState({snackbarmsg: 'updated successfully'});
      this.handleTouchTap();
    }
    if (state.errorMessage) {
      // error report
    }
  };

  onSubmit = (model, resetForm) => {
    console.log(model);
    resetForm();
    // get token
    // get the url
    let token = localStorage.getItem('x-access-token');
    let url = this.props.location.pathname;
    let id = this.props.location.query.document;
    console.log(url);
    if (url === '/create') {
      DocumentActions.createDocument(model, token);
      DocumentStore.listen(this.onChange);
    } else if (url === '/edit') {
      DocumentActions.updateDocument(model, token, id);
      DocumentStore.listen(this.onChange);
    }
  };

  handleSelectField = (e, index, value) => {
    this.setState({accessLevel: value});
  };

  handleChange = (e) => {
    let field = e.target.name;
    let value = e.target.value;
    if (field === 'title') {
      this.setState({title: value});
    } else if (field === 'content') {
      this.setState({content: value});
    } else if (field === 'category') {
      this.setState({category: value});
    }
  };
  enableButton = () => {
    this.setState({canSubmit: true});
  };

  disableButton = () => {
    this.setState({canSubmit: false});
  };
  render() {
    let categoryNodes = this.state.categories.map((category, index) => {
      return (<MenuItem key={index} value={category.category} primaryText={category.category}/>);
    });

    var getOptions = function(input, callback) {
      setTimeout(function() {
        callback(null, {
          options: [
            {
              value: 'one',
              label: 'One'
            }, {
              value: 'two',
              label: 'Two'
            }, {
              value: 'three',
              label: 'Three'
            }, {
              value: 'four',
              label: 'Four'
            }
          ],
          // CAREFUL! Only set this to true when there are no more options,
          // or more specific queries will not be sent to the server.
          complete: true
        });
      }, 3000);
    };

    return (
      <div className="container editor">
        <h5>create && edit</h5>
        <Formsy.Form onValid={this.enableButton} onInvalid={this.disableButton} onValidSubmit={this.onSubmit}>

          <FormsyText className="" name='title' validationError="This field is required" required fullWidth hintText="Title" floatingLabelText="Title" style={{
            margin: 5,
            paddingLeft: 10
          }}/>
        <FormsySelect name='category' fullWidth required floatingLabelText="Document Category">
            {categoryNodes}
          </FormsySelect>
          <FormsyRadioGroup className="row" name="shipSpeed" fullWidth defaultSelected="not_light">
            <FormsyRadio className="col-md-4" value="Public" label="Public"/>
            <FormsyRadio className="col-md-4" value="Contributors" label="Contributors"/>
            <FormsyRadio className="col-md-4" value="Admins" label="Admins"/>
          </FormsyRadioGroup>
          <FormsyText className="" name='content' validations="minLength:10" validationError="Miminum of 10 chars required" required fullWidth hintText="Content" multiLine={true} rows={4} floatingLabelText="Document Content" style={{
            margin: 5,
            paddingLeft: 10
          }}/>
          <div className="row">
            <FlatButton label="Save" style={{
              margin: '0 auto'
            }} primary={true} type="submit" disabled={!this.state.canSubmit} />
          </div>
        </Formsy.Form>
        <Snackbar open={this.state.open} message={this.state.snackbarmsg} action="undo" autoHideDuration={4000} onRequestClose={this.handleRequestClose}/>
      </div>
    )
  }
}

export default CreateDoc;