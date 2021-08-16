import { useContext } from "react";
import Skeleton from "react-loading-skeleton";
import usePhotos from "../hooks/use-photos";
import Post from "./post/";
import LoggedInUserContext from "../context/logged-user";

export default function TimeLine() {
  const { user } = useContext(LoggedInUserContext);
  const { photos } = usePhotos(user);

  return (
    <div className="container col-span-2">
      {!photos ? (
        <Skeleton count={1} width={640} height={500} className="mb-5" />
      ) : (
        photos
          .sort((a, b) => (new Date(a) < new Date(b) ? 1 : -1))
          .map((content) => <Post key={content.docId} content={content} />)
      )}
    </div>
  );
}
