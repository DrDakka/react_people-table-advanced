import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

const navLinks = [
  {
    to: `/`,
    name: 'Home',
  },
  {
    to: `/people`,
    name: 'People',
  },
];

export const Header = () => {
  return (
    <header>
      <nav
        data-cy="nav"
        className="navbar is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <ul className="navbar-brand">
            {navLinks.map(el => (
              <li key={el.to} style={{ display: 'flex' }}>
                <NavLink
                  to={el.to}
                  className={({ isActive }) =>
                    classNames('navbar-item', {
                      ['has-background-grey-lighter']: isActive,
                    })
                  }
                >
                  {el.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};
