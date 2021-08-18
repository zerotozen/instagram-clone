import { useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import Header from "./header";
import Photos from "./photos";
import { getUserPhotosByUserId } from "../../services/firebase";
import usePhotos from "../../hooks/use-photos";

// import usePhotos from "../../hooks/use-photos";

export default function UserProfile({ user }) {
  const reducer = (state, newState) => ({ ...state, ...newState });
  const initialState = {
    profile: {},
    photosCollection: [],
    followerCount: 0,
  };
  const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initialState
  );

  //ojo
  const { photos } = usePhotos(user);

  // const { photos } = usePhotos(user);

  useEffect(() => {
    async function getProfileInfoAndPhotos() {
      const photos = await getUserPhotosByUserId(user?.userId);

      dispatch({
        profile: user,
        photosCollection: photos,
        followerCount: user.followers.length,
      });
    }
    getProfileInfoAndPhotos();
  }, [user.username]);

  return (
    <>
      <Header
        photosCount={photosCollection ? photosCollection.length : 0}
        profile={profile}
        followerCount={followerCount}
        setFollowerCount={dispatch}
      />
      <Photos user={user} photos={photosCollection} />
    </>
  );
}

UserProfile.propTypes = {
  user: PropTypes.shape({
    dateCreated: PropTypes.number.isRequired,
    emailAddress: PropTypes.string.isRequired,
    followers: PropTypes.array.isRequired,
    following: PropTypes.string.isRequired,
    fullname: PropTypes.string.isRequired,
    useId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }),
};
