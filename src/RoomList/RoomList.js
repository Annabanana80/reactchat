import React, { Component } from 'react';

class RoomList extends Component{
	constructor(props){
		super(props)
		this.state ={
			rooms: [],
			newRoomName: ''
		};
		this.roomsRef = this.props.firebase.database().ref('rooms');
	}
	componentDidMount(){
		this.roomsRef.on('child_added', snapshot =>{
			const room = snapshot.val();
			console.log(snapshot);
			room.key = snapshot.key;
			this.setState({rooms: this.state.rooms.concat(room)})
		});
	}

	handleChange(event){
		this.setState({newRoomName: event.target.value})
	}
	createRoom(newRoomName){
		
		this.roomsRef.push({
			name: newRoomName
		})
		this.setState({newRoomName: ''})
	}
	render(){
		return(
			<section className="RoomList">
				<ul id="room-list">
					{this.state.rooms.map(room=>
						<li key={room.key}>
							<span
								id="room-name"
								className={room.name === this.props.activeRoom.name ? "highlight" :null}
								onClick={() => this.props.setActiveRoom(room)}
							>{room.name}</span>
						

						</li>
					)}
				</ul>
				<form id="create-room" onSubmit={(e)=> {e.preventDefault(); this.createRoom(this.state.newRoomName)}}>
					<input type="text" 
						   value={this.state.newRoomName} 
						   onChange={this.handleChange.bind(this)} 
						   name="newRoomName" 
						   placeholder="Create a new room" />
					<input type="submit" value="+" />
				</form>
			</section>
		)
	}
}
export default RoomList;