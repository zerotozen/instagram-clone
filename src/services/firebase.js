import { firebase, FieldValue } from "../lib/firebase";

export async function doesUsernameExist(username) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get();

  return result.docs.length > 0;
}

export async function getUserByUsername(username) {

  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get();

  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
}

// get user from the firestore where userId = userId (from auth)
export async function getUserByUserId(userId) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("userId", "==", userId)
    .get();

  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return user;
}

export async function getSuggestedProfiles(currentUserId, following) {

  const result = await firebase.firestore().collection("users").limit(10).get();

  return result.docs
    .map((user) => ({ ...user.data(), docId: user.id }))
    .filter(
      (profile) =>
        profile.userId !== currentUserId && !following.includes(profile.userId)
    );
  return result;
}

export async function updateMyFollowingArray(userDocId, currentUserId) {

  const result = await firebase
    .firestore()
    .collection("users")
    .where("userId", "==", userDocId)
    .get();

  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return user;
}
//  updateLoggedInUserFollowing,updateFollowedUserFollowers,

export async function updateCurrentUserFollowing(
  currentUserDocId,
  suggestedProfileId,
  isFollowingProfile
) {
  return firebase
    .firestore()
    .collection("users")
    .doc(currentUserDocId)
    .update({
      following: isFollowingProfile
        ? FieldValue.arrayRemove(suggestedProfileId)
        : FieldValue.arrayUnion(suggestedProfileId),
    });
}

export async function updateFollowedUserFollowers(
  suggesteProfileDocId,
  currentUserId,
  isFollowingProfile
) {
  return firebase
    .firestore()
    .collection("users")
    .doc(suggesteProfileDocId)
    .update({
      followers: isFollowingProfile
        ? FieldValue.arrayRemove(currentUserId)
        : FieldValue.arrayUnion(currentUserId),
    });
}

export async function getPhotos(userId, following) {
 
  const result = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "in", following)
    .get();

  const userFollowedPhotos = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id,
  }));

  const photosWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async (photo) => {
      let userLikedPhoto = false;
      if (photo.likes.includes(userId)) {
        userLikedPhoto = true;
      }
      const user = await getUserByUserId(photo.userId);
      const { username } = user[0];

      return { username, ...photo, userLikedPhoto };
    })
  );
  return photosWithUserDetails;
}

export async function getUserPhotosByUsername(username) {
  const [user] = await getUserByUsername(username);
  const result = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "==", user.userId)
    .get();

  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
}

export async function isUserFollowingProfile(
  loggedInUserUsername,
  profileUserId
) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", loggedInUserUsername) // karl (active logged in user)
    .where("following", "array-contains", profileUserId)
    .get();

  const [response = {}] = result.docs.map((item) => ({
    ...item.data(),
    docID: item.id,
  }));
  return response.userId;
}

export async function toggleFollow(
  isFollowingProfile,
  activeUserDocId,
  profileDocId,
  profileUserId,
  followingUserId
) {
  //1 param -> my profile,
  //2 param -> User i want to follow Id,
  //3 param -> is the user following this profile?
  await updateCurrentUserFollowing(
    activeUserDocId,
    profileUserId,
    isFollowingProfile
  );

  await updateFollowedUserFollowers(
    profileDocId,
    followingUserId,
    isFollowingProfile
  );
}
