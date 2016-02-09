import React from 'react';
import Category from './Category.jsx';
import CategoryStore from '../../stores/categoryStore';
import CategoryAction from '../../actions/categoryActions';
import connectToStores from 'alt-utils/lib/connectToStores';

class CategoryList extends React.Component {
  constructor() {
   super();
    this.state = {
      categories: [],
    }
   this.onChange = this.onChange.bind(this);
  }

  static getStores(props) {
    return [CategoryStore];
  }
  static getPropsFromStores(props) {
    return CategoryStore.getState();
  }

  componentWillMount() {
    CategoryAction.fetchCategory();
  }

  componentDidMount() {
     CategoryStore.listen(this.onChange);
  }

  onChange(state) {
    this.setState({categories: state.categories});
  }
  render() {
    // nodes
    var categoryNodes = this.state.categories.map((category) => {
      return (
        <Category key={category._id} title={category.category} />
      );
    });

    return (
      <div>
        {categoryNodes}
      </div>
    );
  }
}
//export default CategoryList;
export default connectToStores(CategoryList);