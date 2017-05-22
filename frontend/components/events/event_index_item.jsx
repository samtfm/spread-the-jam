import React from 'react';


class EventIndexItem extends React.Component{

  componentDidMount(){

  }

  register(){
    this.props.joinEvent({user_id: this.props.userId, event_id: this.props.id});
  }
  unregister(){
    this.props.leaveEvent({user_id: this.props.userId, event_id: this.props.id});
    // this.props.leaveEvent({user_id: this.props.userId, event_id: this.props.id});
  }

  render(){
    const date = new Date(this.props.dateTime);
    const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    // const MONTHS = "January February March April May June July August September October November December".split(' ');
    const MONTHS = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(' ');

    const isHost = this.props.userId === this.props.host.id;

    const EditCancelButtons = () => (
      <div>
        <button onClick={console.log('edit')}>
          EDIT
        </button>
        <button onClick={console.log('cancel')}>
          CANCEL
        </button>
      </div>
    );

    const JoinLeaveButton = () => (
      this.props.attendees[this.props.userId] ?
      (
        <button onClick={this.unregister.bind(this)}>
          LEAVE
        </button>
      ) : (
        <button onClick={this.register.bind(this)}>
          JOIN
        </button>
      )
    );
    return (
      <div className={isHost ? 'event-item hosted' : 'event-item'} >
        <div className='date'>
          <div id='day'>{DAYS[date.getDay()]}</div>
          <div id='date'>{MONTHS[date.getMonth()] + ' ' + date.getDate()}</div>
          <div id='time'>{date.toLocaleTimeString().match( /(\S*)\S{3}\s(\S\S)/).slice(1, 3).join(" ")}</div>
        </div>
        <div className='host'><div id='host'>host</div><div id='name'>{this.props.host.username}</div></div>
        <ul>
          <li>{this.props.address}</li>
          <li>number attending: {this.props.numAttendees}</li>
          <li>
            {isHost ? (
              <EditCancelButtons />
            ) : (
              <JoinLeaveButton />
            )}
          </li>
        </ul>
      </div>
    );
  }
}


export default EventIndexItem;
