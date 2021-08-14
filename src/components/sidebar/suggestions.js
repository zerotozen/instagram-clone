import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getSuggestedProfiles } from "../../services/firebase";
import Skeleton from "react-loading-skeleton";
import SuggestedProfile from "./suggested-profile";

function Suggestions({ currentUserId, following, currentUserDocId }) {
  const [profiles, setProfiles] = useState(null);

  useEffect(() => {
    async function suggestedProfiles() {
      const response = await getSuggestedProfiles(currentUserId, following);
      setProfiles(response);
    }

    if (currentUserId) {
      suggestedProfiles();
    }
  }, [currentUserId]);
  console.log("profilesssssssssss", profiles);
  return !profiles ? (
    <Skeleton count={1} height={150} className="mt-5" />
  ) : profiles.length > 0 ? (
    <div className="rounded flex flex-col">
      <div className="text-sm flex items-center align-items justify-between mb-2">
        <p className="font-bold text-gray-base">Suggestions for your</p>
      </div>
      <div className="my-4 grid gap-5">
        {profiles.map((profile) => (
          <SuggestedProfile
            key={profile.docId}
            suggesteProfileDocId={profile.docId}
            username={profile.username}
            suggestedProfileId={profile.userId}
            currentUserId={currentUserId}
            currentUserDocId={currentUserDocId}
          />
        ))}
      </div>
    </div>
  ) : null;
}

Suggestions.propTypes = {
  userId: PropTypes.string,
  followoing: PropTypes.array,
  loggedInUserDocId: PropTypes.string,
};

export default Suggestions;
