import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import FlatButton from 'material-ui/lib/flat-button';
import Divider from 'material-ui/lib/divider';
import FontIcon from 'material-ui/lib/font-icon';
import Colors from 'material-ui/lib/styles/colors';
import styles from 'material-ui/lib/styles';
import Avatar from 'material-ui/lib/avatar';

import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import Delete from 'material-ui/lib/svg-icons/action/delete';
import Info from 'material-ui/lib/svg-icons/action/info';
import Edit from 'material-ui/lib/svg-icons/editor/mode-edit';

import FloatingActionButton from 'material-ui/lib/floating-action-button';
import Content from 'material-ui/lib/svg-icons/content/send';
import {Router, Route, Link} from 'react-router';
import moment from 'moment';

import DocumentActions from '../../actions/DocumentActions';
import DocumentStores from '../../stores/DocumentStore';
const colors = styles.Colors;

export default class Document extends React.Component {
  constructor(props) {
    super(props);
    this.state = {docId: ''}
  }

  componentDidMount() {
    this.setState({docId: this.props.document._id});
  }

  componentWillUnmount() {}

  render () {
    let ActionNodes = () => {
      if(this.props.user._id === this.props.document.ownerId._id) {
        return (
          <div>
            <MenuItem primaryText="Edit" leftIcon={<Edit />} href={'/edit?document=' + this.props.document._id}/>
          </div>
        );
      } else {
        return;
      }
    }
    return (
      <Card style={{margin: 15}}>
        <CardMedia
        >
          <img src="http://lorempixel.com/600/337/technics/" />
        </CardMedia>
        <div className="row">
          <div className="col-xs-9
                col-sm-9
                col-md-9
                col-lg-9" >
            <Link to={`/document/${this.props.document._id}`}>
              <CardTitle actAsExpander expandable showExpandableButton title={this.props.document.title} />
            </Link>
          </div>
          <div className="col-xs-3
                col-sm-3
                col-md-3
                col-lg-3">
            <FloatingActionButton primary mini style={{margin: 10}} linkButton href={'/document/' + this.props.document._id}  >
              <Content />
            </FloatingActionButton>
          </div>
        </div>
        <Divider />
        <CardActions>
          <CardText>
            <div className="row" style={{marginBottom: 10}}>
              <div className="col-xs-2
                    col-sm-2
                    col-md-2
                    col-lg-2"
              >
                <Avatar
                  src="http://lorempixel.com/600/337/people/"
                  color={Colors.blue500}
                />
              </div>
              <div className="col-xs-3
                col-sm-3
                col-md-3
                col-lg-3">
                <a href={'/author?user=' + this.props.document.ownerId._id} style={{color: '#982893'}}>{this.props.document.ownerId.username}</a>
              </div>
              <div className="col-xs-6
                col-sm-6
                col-md-6
                col-lg-6">
                {moment(this.props.document.createdAt).format('MMM Do')} in &nbsp;
                <a href={'/category?category='+ this.props.document.category.category} style={{color: '#982893'}}>
                    {this.props.document.category.category}
                </a>
              </div>
              <div className="col-xs-1
                col-sm-1
                col-md-1
                col-lg-1">
                <IconMenu
                   iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                   anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                   targetOrigin={{horizontal: 'left', vertical: 'top'}}
                 >
                   <MenuItem primaryText="More info" href={'/document/' + this.props.document._id} leftIcon={<Info />}/>
                   {ActionNodes()}
                 </IconMenu>
              </div>
            </div>
          </CardText>
        </CardActions>
      </Card>
    );
  }
}
