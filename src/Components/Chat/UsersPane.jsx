import React from 'react'
import UserBlock from './UserBlock';
import UsersList from './UsersList';

class UsersPane extends React.Component {
    render() {
        return (
            <div className="usersPane">
                <UserBlock username={this.props.user.name} handleLogout={this.props.handleLogout} />
                <UsersList user={this.props.user} users={this.props.users} />
            </div>
        )
    }
}

export default UsersPane