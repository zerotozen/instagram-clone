import { useState, useEffect } from "react";
import { getPhotos } from "../services/firebase";

export default function usePhotos(user) {
  const [photos, setPhotos] = useState(null);

  useEffect(() => {
    async function getTimeLinePhotos() {
      if (user?.following?.length > 0) {
        const followedUserPhotos = await getPhotos(user.userId, user.following);

        followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
        setPhotos(followedUserPhotos);
      }
    }

    getTimeLinePhotos();
  }, [user?.userId, user?.following]);

  return { photos };
}
