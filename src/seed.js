/* eslint-disable no-plusplus */
// NOTE: replace 'NvPY9M9MzFTARQ6M816YAzDJxZ72' with your Firebase auth user id (can be taken from Firebase)
export function seedDatabase(firebase) {
  // const users = [
  //   {
  //     userId: "vhz7mDQe6ZhTW601nh241TybCMJ3",
  //     username: "AlexFullStack",
  //     fullName: "Alex Wong",
  //     emailAddress: "alexwong@email.com",
  //     following: ["2"],
  //     followers: ["2", "3", "4"],
  //     dateCreated: Date.now(),
  //   },
  //   {
  //     userId: "2",
  //     username: "Gitanas",
  //     fullName: " Gitanas Nausėda",
  //     emailAddress: "gitanas@president.com",
  //     following: [],
  //     followers: ["NvPY9M9MzFTARQ6M816YAzDJxZ72"],
  //     dateCreated: Date.now(),
  //   },
  //   {
  //     userId: "3",
  //     username: "Cindy",
  //     fullName: "Cindy Crawford",
  //     emailAddress: "cindycrawford@email.com",
  //     following: [],
  //     followers: ["NvPY9M9MzFTARQ6M816YAzDJxZ72"],
  //     dateCreated: Date.now(),
  //   },
  //   {
  //     userId: "4",
  //     username: "Michael J",
  //     fullName: "Michael Jordan",
  //     emailAddress: "mjordan@email.com",
  //     following: [],
  //     followers: ["NvPY9M9MzFTARQ6M816YAzDJxZ72"],
  //     dateCreated: Date.now(),
  //   },
  // ];

  // // eslint-disable-next-line prefer-const
  // for (let k = 0; k < users.length; k++) {
  //   firebase.firestore().collection("users").add(users[k]);
  // }

  // eslint-disable-next-line prefer-const
  for (let i = 1; i <= 5; ++i) {
    firebase
      .firestore()
      .collection("photos")
      .add({
        photoId: i,
        userId: "a56f7u1ViZPa3R2HYe4bMBdcLOO2",
        imageSrc: `/images/users/frida_khalo/${i}.jpg`,
        caption: "",
        likes: [],
        comments: [
          {
            displayName: "",
            comment: "",
          },
          {
            displayName: "",
            comment: "",
          },
        ],
        userLatitude: "40.7128°",
        userLongitude: "74.0060°",
        dateCreated: Date.now(),
      });
  }
}
