import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import { submitForm } from '../../model/actions';
import AutocompleteInput from './AutocompleteInput';

class SearchForm extends React.Component {
  state = {
    startingPlace: '',
    endingPlace: '',
    date: moment(new Date()).format('YYYY-MM-DD'),
    passengers: 0
  }

  onSearchFormSubmit = event => {
    event.preventDefault();
    this.props.submitForm(this.state)
  }

  render() {
    return (
      <form onSubmit={this.onSearchFormSubmit}>
        <label>
          Starting Point
          <AutocompleteInput 
            selectedValue={this.state.startingPlace}
            onSelectPlace={startingPlace => this.setState({ startingPlace })} 
          />
        </label>
        <label>
          Ending Point
          <AutocompleteInput
            selectedValue={this.state.endingPlace}
            onSelectPlace={endingPlace => this.setState({ endingPlace })} 
          />
        </label>
        <label>
          Date
          <input type='date' value={this.state.date} onChange={event => this.setState({ date: event.target.value })} />
        </label>
        <label>
          Passengers
          <input type='number' value={this.state.passengers} onChange={event => this.setState({ passengers: event.target.value })} />
        </label>
        <button>Search</button>
      </form>
    )
  }
};

const mapStateToProps = state => {
  return {
    errorState: state.searchForm.errorState
  }
};
const mapDispatchToProps = { submitForm };

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);