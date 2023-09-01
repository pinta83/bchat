import React from 'react'

const UsersList = (props) => {
    return (
        <div className="usersList">
            <ul id="usersList">
                {Object.keys(props.users).map((key) => {
                    if (props.users[key].id === props.user.id)
                        return '';

                    return (
                        <li key={props.users[key].id}>
                            <span className="listUserAvatar" style={{ color: props.users[key].color, borderColor: props.users[key].color }}><i className="fa fa-user"></i></span>
                            <span className="listUserName">{props.users[key].name}</span>
                        </li>
                    );
                })}
            </ul>
            <div className="usersCountInfo">
                <span className="badge" style={Object.keys(props.users).length > 1 ? {backgroundColor: '#0b6c3f'} : {backgroundColor: '#777'}}>{Object.keys(props.users).length}</span> korisnik{Object.keys(props.users).length !== 1 ? 'a' : ''} online
            </div>
        </div>

    )
}

export default UsersList