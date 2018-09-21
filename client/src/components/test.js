<Navbar className="navbar-header">
    <NavbarBrand href="/" id="logo">
        Share.
    </NavbarBrand>
    <NavbarToggler onClick={this.toggle} />
    <Collapse isOpen={this.state.isOpen}>
        <Nav className="ml-auto">
            <NavItem>
                <NavLink to="/">Home</NavLink>
            </NavItem>
            <NavItem>
                <NavLink to="/add-product">Add product</NavLink>
            </NavItem>
            <NavItem>{!api.isLoggedIn() && <NavLink to="/signup">Signup</NavLink>}</NavItem>
            <NavItem>{!api.isLoggedIn() && <NavLink to="/login">Login</NavLink>}</NavItem>
            <NavItem>
                {api.isLoggedIn() && (
                    <NavLink to="/" onClick={e => this.handleLogoutClick(e)}>
                        Logout
                    </NavLink>
                )}
            </NavItem>
            <NavItem>
                <NavLink to="/userProfile">UserProfile</NavLink>
            </NavItem>
        </Nav>
    </Collapse>
</Navbar>;
