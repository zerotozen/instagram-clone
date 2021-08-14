import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  updateCurrentUserFollowing,
  updateFollowedUserFollowers,
} from "../../services/firebase";

export default function SuggestedProfile({
  suggesteProfileDocId,
  currentUserDocId,
  username,
  suggestedProfileId,
  currentUserId,
}) {
  const [followed, setFollowed] = useState(false);

  async function handleFollowUser() {
    setFollowed(true);

    await updateCurrentUserFollowing(
      currentUserDocId,
      suggestedProfileId,
      false
    );
    //firebase: create 2 services ( functions )
    //update the following array of the logged in user ( in this case my profile)
    //update the followers array o the user who has beeen followes

    await updateFollowedUserFollowers(
      suggesteProfileDocId,
      currentUserId,
      false
    );
  }

  return (
    <>
      {!followed ? (
        <div className="flex flex-row items-center align-items justify-between">
          <div className="flex items-center justify-between">
            <img
              className="rounded-full w-10 h-10 flex mr-3 object-cover"
              src={`/images/avatars/${username}.jpg`}
              alt=""
            />
            <Link to={`/p/${username}`}>
              <p className="font-bold text-sm">{username}</p>
            </Link>
          </div>

          <button
            className="text-xs font-bold text-blue-medium"
            type="button"
            onClick={handleFollowUser}
          >
            Follow
          </button>
        </div>
      ) : null}
    </>
  );
}

SuggestedProfile.propTypes = {
  suggesteProfileDocId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  loggedInUserDocId: PropTypes.string.isRequired,
};
