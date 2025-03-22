import './Navigation.css';

import Button from '../UI/Button';

const Navigation = (props) => {
    return (
        <nav className="nav">
            <ul>
                <li>
                    <a href="/">Users</a>
                </li>
                <li>
                    <a href="/new-meetup">Admin</a>
                </li>
                {
                    props.isLoggedIn && (
                        <li>
                            <Button onClick={props.onLogout}> Logout </Button>
                        </li>
                    )
                }
            </ul>
        </nav>
    );
}

export default Navigation;