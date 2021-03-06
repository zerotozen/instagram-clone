import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function Header({ username }) {
 
  return (
    <div className="flex border-b border-gray-primary h-4 p-4 py-8">
      <div className="flex items-center">
        <Link to={`/p/${username}`} className="flex items-center">
          <img
            className="rounded-full h-9 w-9 flex mr-3 object-cover"
            src={`/images/avatars/${username}.jpg`}
            alt={`${username} profile `}
          />
        </Link>
        <p className="font-bold">{username}</p>
      </div>
    </div>
  );
}

Header.prototype = {
  username: PropTypes.string.isRequired,
};
