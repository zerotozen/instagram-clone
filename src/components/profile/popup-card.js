import { useState, useEffect } from "react";
import Header from "../post/header";
import Actions from "../post/action";
import AddComment from "../post/add-comment";
import { Link } from "react-router-dom";
import { getPhotos } from "../../services/firebase";

export default function PopupCard({
  handlePopupCard,
  user,
  photos,
  imageSrc,
  photoProfileId,
  photoComments,
  photoLikes,
  photoCaption,
  photoDocId,
  photoDateCreated,
  likedPhoto,
}) {
  const [comments, setComments] = useState(photoComments);
  const [response, setResponse] = useState();

  useEffect(() => {
    async function getTimeLinePhotos() {
      const followedUserPhotos = await getPhotos(user?.userId, user?.following);

      setResponse(followedUserPhotos);
    }

    getTimeLinePhotos();
  }, [user?.userId, user?.following]);

  return (
    <>
      <div
        onClick={() => handlePopupCard()}
        className="h-full w-full inset-0 fixed bg-black-faded z-50"
      ></div>
      <div className=" bg-white w-1/2 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
        <div className="flex">
          <img className="object-content h-popup w-2/3" src={imageSrc} alt="" />
          <div className="w-full">
            {/* Header */}
            <div className="">
              <Header username={user.username} />
            </div>

            <div className="h-349 text-sm">
              {photoCaption ? (
                <div className="ml-1 ">
                  <span className="font-bold">{user.username}: </span>{" "}
                  <span>{photoCaption}</span>{" "}
                </div>
              ) : null}

              <div className="ml-1">
                {comments.length >= 3 && (
                  <p className="text-sm text-gray-base mb-1 cursor-pointer">
                    View all comments
                  </p>
                )}
                {comments.slice(0, 10).map((item) => (
                  <p key={`${item.comment}-${item.displayName}`}>
                    <Link to={`/p/${item.displayName}`}>
                      <span className="mr-1 font-bold">{item.displayName}</span>
                    </Link>
                    <span>{item.comment}</span>
                  </p>
                ))}
              </div>

              <div className="rounded col-span-4 bg-white  mb-12"></div>
            </div>

            <div className="border-t border-gray-primary w-full">
              <Actions
                docId={photoDocId}
                totalLikes={photoLikes.length}
                likedPhoto={response}
                // handleFocus={handleFocus}
              />
              <AddComment
                // commentInput={commentInput}
                comments={photoComments}
                setComments={setComments}
                docId={photoDocId}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
