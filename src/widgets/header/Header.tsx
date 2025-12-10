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
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          {navLinks.map(el => (
            <NavLink
              to={el.to}
              key={el.to}
              className={({ isActive }) =>
                classNames('navbar-item', {
                  ['has-background-grey-lighter']: isActive,
                })
              }
            >
              {el.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};
