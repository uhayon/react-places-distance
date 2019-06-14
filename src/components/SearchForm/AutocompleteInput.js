import React from 'react';
import places from '../../model/mockPlaces.json';

class AutocompleteInput extends React.Component {
  state = { searchValue: '', showOptions: false };

  componentDidMount() {
    this.setState({ searchValue: this.props.selectedValue });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.selectedValue !== this.props.selectedValue ||
      nextState.searchValue !== this.state.searchValue ||
      nextState.showOptions !== this.state.showOptions
    );
  }

  onInputBlur = () => {
    if (this.props.selectedValue === '') {
      this.setState({
        searchValue: '',
        showOptions: false
      });
    }
  }

  onInputChange = event => {
    this.setState({
      searchValue: event.target.value,
      showOptions: true
    }, () => {
      this.onPlaceChange('')
    });
  }

  onPlaceClick = place => {
    this.setState({
      searchValue: place,
      showOptions: false
    }, () => {
      this.onPlaceChange(this.state.searchValue)
    });
  }

  onPlaceChange = place => {
    this.props.onSelectPlace(place)
  }

  render() {
    const { searchValue, showOptions } = this.state;

    return (
      <div>
        <input 
          type='text'
          value={searchValue}
          onChange={this.onInputChange}
          onBlur={this.onInputBlur}
        />
        {
          showOptions &&
          <ul>
            { 
              places
                .filter(place => place.name.toUpperCase().indexOf(searchValue.toUpperCase()) > -1 || place.country.toUpperCase().indexOf(searchValue.toUpperCase()) > -1)
                .sort((firstPlace, secondPlace) => {
                  if (firstPlace.name.toUpperCase() > secondPlace.name.toUpperCase()) return 1;
                  if (firstPlace.name.toUpperCase() < secondPlace.name.toUpperCase()) return -1;
                  return 0;
                })
                .map(place => <li onMouseDown={() => this.onPlaceClick(place.name)} key={place.name}>{`${place.name}, ${place.country}`}</li>)
            }
          </ul>
        }
      </div>
    )
  }
}

export default AutocompleteInput;