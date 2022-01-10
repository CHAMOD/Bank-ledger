import React, { Component } from 'react'
import { Card, Form, Button, Col } from 'react-bootstrap'
import UserAPI from '../services/UserService'
export default class Adduser extends Component {

	constructor(props) {
		super(props);
		this.state = { username: '', password: '', role: 'USER' };
		this.userChange = this.userChange.bind(this);
		this.submitUser = this.submitUser.bind(this);
	}

	submitUser(event) {
		alert(this.state.username);
		event.preventDefault();

		const user = {
			name: this.state.username,
			password: this.state.password,
			role: this.state.role

		};



		UserAPI.addUser(user).then(result => {
			if (result.status === 200) {


			}
		})


	}

	userChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	render() {
		return (
			<Card className={"border border-dark bg-dark text-white"}>
				<Card.Header>Add User</Card.Header>
				<Form onSubmit={this.submitUser} id="bookFormId">
					<Card.Body>
						<Form.Row>
							<Form.Group as={Col} controlId="formGridTitle">
								<Form.Label>User Name</Form.Label>
								<Form.Control required
									type="text" name="username"
									value={this.state.name}
									onChange={this.userChange}
									className={"bg-dark text-white"}
									placeholder="Enter User Name" />
							</Form.Group>
						</Form.Row>
						<Form.Row>
							<Form.Group as={Col} controlId="formGridTitle">
								<Form.Label>Password</Form.Label>
								<Form.Control required
									type="password" name="password"
									value={this.state.password}
									onChange={this.userChange}
									className={"bg-dark text-white"}
									placeholder="Enter Password" />
							</Form.Group>
						</Form.Row>
						<Form.Row>
							<Form.Group as={Col} controlId="formGridTitle">
								<Form.Label>Role</Form.Label>
								<Form.Control required
									name="role"
									as="select"
									value={this.state.role}
									onChange={this.userChange}
								>
									<option value="USER">User</option>
									<option value="ADMIN">Admin</option>
								</Form.Control>
							</Form.Group>
						</Form.Row>

					</Card.Body>
					<Card.Footer style={{ "textAlign": "right" }}>
						<Button size="sm" variant="success" type="submit">
							Submit
						</Button>
					</Card.Footer>
				</Form>
			</Card>
		);
	}
}