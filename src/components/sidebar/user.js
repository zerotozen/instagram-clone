import { memo } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const User = ({ username, fullName }) => {
  return (
    <div>
      {!username || !fullName ? (
        <Skeleton count={1} height={61} />
      ) : (
        <Link
          to={`/p/${username}`}
          className="grid grid-cols-4 gap-4 mb-6 items-center"
        >
          <div className="flex items-center justify-between col-span-1">
            <img
              className="rounded-full h-14 w-14 flex mr-3 object-cover"
              src={`/images/avatars/${username}.jpg`}
              alt=""
            />
          </div>
          <div className="col-span-3">
            <p className="font-bold text-sm">{username}</p>
            <p className="text-sm">{fullName}</p>
          </div>
        </Link>
      )}
    </div>
  );
};

//memo is a HOC

User.propTypes = {
  username: PropTypes.string,
  fullName: PropTypes.string,
};

User.whyDidYouRender = true;

export default User;
