import React from 'react'
import '../App.css';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loginName: getRandomName(),
        };
    }
    
    render() {
        const loginName = this.state.loginName;
        const loginNameChange = (e) => {
            this.setState({ 'loginName': e });
        };
        
        const handleSubmit = (e) => {
            e.preventDefault();
            this.props.onLogin(loginName);
        };
        
        const randomizeName = () => {
            this.setState({loginName: getRandomName()})
        }
        
        return (
            <div className="App view-login">
                <img className="loginLogo" src="/assets/logo.webp" alt="BChat" />
                <div className="login">
                    <div className="login-inner">
                        <b>PRIJAVA</b>

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="loginName">Korisničko ime</label>
                                <div className="input-group">
                                    <div className="input-group-addon"><i className="fa fa-user"></i></div>
                                    <input className="form-control" id="loginName" value={this.state.loginName} onChange={(e) => loginNameChange(e.target.value)} />
                                    <div className="input-group-addon randomizeName" onClick={randomizeName} title="Novo nasumično ime"><i className="fa fa-random"></i></div>
                                </div>
                            </div>
                            <div className="form-group text-center">
                                <button className="btn btn-success" type="submit">PRIJAVA <i className="fa fa-long-arrow-right"></i></button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        )
    }
}

function getRandomName() {
    var nameList = [
        'Branka', 'Branko',
        'Darija', 'Dario',
        'Monika', 'Nik',
        'Ivana', 'Ivan',
        'Ivančica', 'Ivana',
        'Valentina', 'Valentino',
        'Jasmina', 'Jasmin',
        'Antonija', 'Anton',
        'Bernarda', 'He who shall not be named',
    ];

    var finalName = nameList[Math.floor(Math.random() * nameList.length)];
    return finalName;
}

export default Login