import React from 'react';
import NewStockForm from './NewStockForm';
import StockList from './StockList';
import ItemDetail from './ItemDetail';
import EditItemForm from './EditItemForm';

class StockControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,
      masterStockList: [],
      selectedItem: null,
      editing: false
    };
  }

  handleAddingNewStockToList = (newStock) => {
    const newMasterStockList = this.state.masterStockList.concat(newStock);
    this.setState({
      masterStockList: newMasterStockList,
      formVisibleOnPage: false
    });
  }

  handleChangingSelectedItem = (id) => {
    const selectedItem = this.state.masterStockList.filter(item => item.id === id)[0];
    this.setState({selectedItem: selectedItem});
  }

  handleEditStockInList = (stockToEdit) => {
    const editedMasterStockList = this.state.masterStockList
      .filter(item => item.id !== this.state.selectedItem.id)
      .concat(stockToEdit);
    this.setState({
      masterStockList: editedMasterStockList,
      editing: false,
      selectedItem: null
    });
  }

  handleSellingStockInList = (toIncrease) => { // Method to decrement Item quantity by one. //
    const selectedItem = this.state.selectedItem;
    let newQuantity;
    if (toIncrease) {
      newQuantity = Object.assign({}, selectedItem, { quantity: parseInt(selectedItem.quantity) + 1 });
    } else {
      newQuantity = Object.assign({}, selectedItem, { quantity: parseInt(selectedItem.quantity) - 1 });
    }
    const newItemList = this.state.masterStockList
      .filter(item => item.id !== this.state.selectedItem.id)
      .concat(newQuantity);
    this.setState({
      masterStockList: newItemList,
      selectedItem: newQuantity
    });
  }

  handleDeletingStock = (id) => {
    const newMasterStockList = this.state.masterStockList.filter(stockItem => stockItem.id !== id);
    this.setState({
      masterStockList: newMasterStockList,
      selectedItem: null
    });
  }

  handleEditClick = () => {
    console.log("handleEditClick reached!");
    this.setState({editing: true});
  }

  handleClick = () => {
    if (this.state.selectedItem != null) {
      this.setState({
        formVisibleOnPage: false,
        selectedItem: null,
        editing: false
      });
    } else {
      this.setState(prevState => ({
        formVisibleOnPage: !prevState.formVisibleOnPage
      }));
    }
  }

  render() {
    let currentlyVisibleState = null;
    let buttonText = null;
    if (this.state.editing) {
      currentlyVisibleState = <EditItemForm item={this.state.selectedItem} onEditItem={this.handleEditStockInList}/>
      buttonText = "Return to Stock List";
    } else if (this.state.selectedItem != null) {
      currentlyVisibleState = <ItemDetail item={this.state.selectedItem} onClickingDelete={this.handleDeletingStock} onClickingEdit={this.handleEditClick} onClickingSell={this.handleSellingStockInList}/>
      buttonText = "Return to Stock List";
    } else if (this.state.formVisibleOnPage) {
      currentlyVisibleState = <NewStockForm onNewStockCreation={this.handleAddingNewStockToList} />
      buttonText = "Return to Stock List";
    } else {
      currentlyVisibleState = <StockList stockList={this.state.masterStockList} onItemSelection={this.handleChangingSelectedItem} />
      buttonText = "Add Stock";
    }
    return (
      <>
        {currentlyVisibleState}
        <button onClick = {this.handleClick}>{buttonText}</button>
      </>
    );
  }
}

export default StockControl;