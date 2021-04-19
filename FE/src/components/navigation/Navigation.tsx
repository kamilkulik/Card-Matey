import React from 'react';
import { Link } from 'react-router-dom';
import { useActions } from '../../hooks/useActions';

const Navigation: React.FC = () => {
  const {startLogout} = useActions()

  const logout = () => {
    startLogout();
  };

  return (
    <>
      <ul className="navigation">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/add">Create Card</Link>
        </li>
        <li>
          <button type="button" onClick={logout}>
            Logout
          </button>
        </li>
      </ul>
    </>
  );
};

export default Navigation;
