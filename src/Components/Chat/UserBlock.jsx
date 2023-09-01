import React from 'react'

const UserBlock = (props) => {
    return (
        <div className="userBlock">
            <div>
                <div className="userAvatar">
                    <i className="fa fa-user-circle"></i>
                </div>
                <div className="userName">
                    {props.username}
                    <div className="logOut">
                        <span className="btn btn-xs btn-warning" onClick={props.handleLogout}>Odjava</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserBlock