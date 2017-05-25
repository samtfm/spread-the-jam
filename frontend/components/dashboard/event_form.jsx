 import React from 'react';

class EventForm extends React.Component{
//TODO: ADD DROPDOWN TO CHOOSE EVENT CITY
  constructor(props){
    const date = new Date(Date.now()).toDateString();
    super(props);
    this.state = {
      id: 6,
      description: '',
      address: '',
      date: '',
      time: '12:00',
      cityId: this.props.cityId || this.props.cities[0].id
    };
  }

  componentWillUnmount(){
    this.props.clearErrors();
  }
  componentDidMount(){
    this.props.requestCities();
    if (this.props.edit) {
      this.props.requestEvent();
    }
  }

  componentWillReceiveProps(newProps){
    if (newProps.eventObj){
      console.log(newProps.eventObj);
      console.log(this.state);
      this.setState({
        description: newProps.eventObj.description,
        address: newProps.eventObj.address,
        date: newProps.eventObj.dateTime.slice(0,10),
        time: newProps.eventObj.dateTime.slice(11,16),
        cityId: newProps.eventObj.cityId,
        id: newProps.eventObj.id
      });

    }
  }

  submit(){
    const rubyDateTime = (this.state.date) ?
    this.state.date + 'T' + this.state.time + ':00.000Z' : null;
    const eventObj = {
      address: this.state.address,
      description: this.state.description,
      city_id: this.state.cityId,
      host_id: this.props.userId,
      date_time: rubyDateTime,
      id: this.state.id
    };
    if (this.props.edit){
      this.props.updateEvent(eventObj);
    } else {
      this.props.createEvent(eventObj);
    }
  }

  updateDescription(e) {
    e.preventDefault();
    this.setState({ description: e.target.value });
  }
  updateAddress(e) {
    e.preventDefault();
    this.setState({ address: e.target.value });
  }
  updateDate(e) {
    e.preventDefault();
    this.setState({ date: e.target.value });
  }
  updateTime(e) {
    e.preventDefault();
    this.setState({ time: e.target.value });
  }
  updateCity(e) {
    e.preventDefault();
    this.setState({ cityId: e.target.value });
  }

  render(){
    return (
      <form className="event-form body">
        <ul className='errors'>
          {this.props.errors ?
          (this.props.errors.map((err) => <li>{err}</li>)) : ''}
        </ul>
        <label>
          Date
          <input type='date'
            value={this.state.date}
            onChange={this.updateDate.bind(this)} />
        </label>
        <label>
          Time
          <input type='time'
            value={this.state.time}
            onChange={this.updateTime.bind(this)} />
        </label>
        <label>
          Address
          <input type='text'
            value={this.state.address}
            onChange={this.updateAddress.bind(this)} />
        </label>
        <label>
          City
          <select value={this.state.cityId} onChange={this.updateCity.bind(this)}>
            {this.props.cities.map((city, id) => (
              <option key={id} value={city.id}>{city.name}</option>
            ))};
          </select>
        </label>
        <label>
          description
          <textarea onChange={this.updateDescription.bind(this)} value={this.state.description}>
          </textarea>
        </label>

        <button onClick={this.submit.bind(this)}>
          {this.props.edit ? 'Update Jam' : 'Create Jam'}
        </button>
      </form>
    );
  }
}

export default EventForm;
