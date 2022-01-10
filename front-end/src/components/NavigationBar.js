import React, { useContext } from 'react'
import { Navbar, Nav, NavItem, NavbarBrand } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { LoginContext } from "./loginContext";


const NavigationBar = () => {

	const loginContext = useContext(LoginContext);
	return (


		<div>
			<Navbar color="light" expand="md" bg="dark" variant="dark">
				<NavbarBrand>Bank Ledger</NavbarBrand>
				<Nav className="mr-auto" navbar>
					{loginContext.role === 'ADMIN' && loginContext.isLoggedIn ?
						<>
							<NavItem>
								<Link to={"Adduser"} className="nav-link">Add User</Link>
							</NavItem>
							<NavItem>
								<Link to={"Userslist"} className="nav-link">Users</Link>
							</NavItem>
							<NavItem>
								<Link to={"Addaccount"} className="nav-link">Add Account</Link>
							</NavItem>
							<NavItem>
								<Link to={"Accountslist"} className="nav-link">Show Accounts</Link>
							</NavItem>
						</>
						: loginContext.role === 'USER' && loginContext.isLoggedIn ?

							<>
								<NavItem>
									<Link to={"Deposit"} className="nav-link">Deposit</Link>
								</NavItem>
								<NavItem>
									<Link to={"Withdraw"} className="nav-link">Withdraw</Link>
								</NavItem>

								<NavItem>
									<Link to={"Transactions"} className="nav-link">View Transaction History</Link>
								</NavItem>
							</>
							:
							<>

							</>
					}
				</Nav>


				<Nav className="ml-auto" navbar>
					{/* <NavItem>
				  <NavLink tag={RRNavLink} exact to="/account-create" activeClassName="active">Create New Account</NavLink>
				</NavItem> */}
					{loginContext.isLoggedIn ?
						<NavItem right="true">
							<Link exact="true" to={"logout"} className="nav-link">Logout</Link>
						</NavItem> :
						<NavItem className="nav navbar-nav navbar-right">
							<Link exact="true" to={"login"} className="nav-link">Login</Link>
						</NavItem>
					}
				</Nav>
			</Navbar>
		</div>

	);


}

export default withRouter(NavigationBar);