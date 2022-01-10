import React, { Component } from 'react'

import { Card, Table } from 'react-bootstrap'
import UserAPI from '../services/UserService';

export default class Userslist extends Component {

	constructor(props) {
		super(props);
		this.state = {
			users: []
		};
	}

	componentDidMount() {

		UserAPI.getAllUsers().then(result => {
			if (result.status === 200) {
				this.setState({ users: result.data });

			}
		})
	}

	render() {
		return (
			<Card className={"border border-dark bg-dark text-white"}>
				<Card.Header>User List</Card.Header>
				<Card.Body>
					<Table bordered hover striped variant="dark">
						<thead>
							<tr>
								<th>User ID</th>
								<th>User Name</th>
							</tr>
						</thead>
						<tbody>
							{
								this.state.users.length === 0 ?
									<tr align="center">
										<td colSpan="6">Users Present.</td>
									</tr> :
									this.state.users.map((user) => (
										<tr key={user.id}>
											<td>{user.id}</td>
											<td>{user.name}</td>
										</tr>
									))

							}
						</tbody>
					</Table>
				</Card.Body>
			</Card>
		);
	}
}