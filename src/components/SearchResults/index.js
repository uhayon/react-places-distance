import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import places from '../../model/mockPlaces.json';
import { submitForm } from '../../model/actions';
import styles from './SearchResults.module.scss';

class SearchResults extends React.Component {
  getDistanceFromLatLonInKm = () => {
    const { startingPlace, endingPlace } = this.props;
    const startingGeo = startingPlace.geo;
    const endingGeo = endingPlace.geo;

    const R = 6371; // Radius of the earth in km
    const dLat = this.deg2rad(endingGeo.lat - startingGeo.lat);  // deg2rad below
    const dLon = this.deg2rad(endingGeo.lng - startingGeo.lng); 
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(endingGeo.lat)) * Math.cos(this.deg2rad(startingGeo.lat)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const d = R * c; // Distance in km
    return d;
  }

  deg2rad(deg) {
    return deg * (Math.PI/180)
  }

  componentDidMount() {
    if (this.props.formData)  {
      this.props.submitForm(this.props.formData);
    }
  }

  render() {
    const { startingPlace, endingPlace, date, passengers } = this.props;
    return (
      <div>
        <p>Starting: {startingPlace.name}</p>
        <p>Ending: {endingPlace.name}</p>
        <p>Distance between places: {this.getDistanceFromLatLonInKm().toFixed(2)} KM</p>
        <p>Date: {moment(date).format('MM/DD/YYYY')}</p>
        <p>Passengers: {passengers}</p>
      </div> 
    )
  }
};

const mapStateToProps = (state, ownProps) => {
  if (ownProps.match.params) {
    return { formData: ownProps.match.params };
  }

  const { startingPlace, endingPlace } = state.searchForm;
  
  return { 
    ...state.searchForm,
    startingPlace: places.find(place => place.name === startingPlace),
    endingPlace: places.find(place => place.name === endingPlace)
  };
};

const mapDispatchToProps = { submitForm };

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);