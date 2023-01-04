// example of data from search results. If no pending users, entire pending key is omitted. same for requestor/requestee key as well as accepted/strangers keys. If no users found, empty array.
searchResult = {
  pending: {
    requestor: [
      {
        id: "tester1",
        requestee: "tester1",
        requestor: "auth0|63aea209ac231151d6a252f7",
        status: "pending",
        createdAt: "2022-12-31T22:03:22.197Z",
        updatedAt: "2022-12-31T22:03:22.197Z",
        email: "admin@a.com",
        username: "Tester 1",
        profilePicture: null,
        contactNumber: 98761234,
      },
    ],
    requestee: [
      {
        id: "a1b2c3d4e5",
        requestee: "auth0|63aea209ac231151d6a252f7",
        requestor: "a1b2c3d4e5",
        status: "pending",
        createdAt: "2022-12-31T22:03:22.197Z",
        updatedAt: "2022-12-31T22:03:22.197Z",
        email: "johnsmith@unicornmail.com",
        username: "John Smith",
        profilePicture: null,
        contactNumber: 12345678,
      },
    ],
  },
  accepted: [
    {
      id: "f1g2h3i4j5",
      requestee: "auth0|63aea209ac231151d6a252f7",
      requestor: "f1g2h3i4j5",
      status: "accepted",
      createdAt: "2022-12-31T22:03:22.197Z",
      updatedAt: "2022-12-31T22:03:22.197Z",
      email: "bobjohnson@magicalmail.biz",
      username: "Bob Johnson",
      profilePicture: null,
      contactNumber: 44556677,
    },
  ],
  strangers: [
    {
      id: "x1y2z3a4b5",
      email: "sarahjohnson@mysticalmail.net",
      username: null,
      profilePicture: null,
      contactNumber: 87654321,
      createdAt: "2022-12-31T22:03:22.197Z",
      updatedAt: "2022-12-31T22:03:22.197Z",
    },
  ],
};

// example of data from getUser(findOrCreate)
getUser = {
  id: "auth0|63aea209ac231151d6a252f7",
  email: "mahe@admin.com",
  username: "123",
  profilePicture: {
    downloadUrl:
      "https://firebasestorage.googleapis.com/v0/b/wannabet-capstone.appspot.com/o/profilepics%2Fauth0%7C63aea209ac231151d6a252f7%2Fprofilepic?alt=media&token=70cb95a5-9029-49dc-8b91-2ceef5f1018f",
    firebasePath: "profilepics/auth0|63aea209ac231151d6a252f7/profilepic",
  },
  contactNumber: 23232322,
  createdAt: "2022-12-31T22:24:07.102Z",
  updatedAt: "2023-01-03T12:21:31.683Z",
};

// example of data from getFriends. If no pending users, entire pending key is omitted. same for requestor/requestee key as well as accepted key. If no friends found, empty array
getFriends = {
  pending: {
    requestor: [
      {
        id: "tester1",
        requestee: "tester1",
        requestor: "auth0|63aea209ac231151d6a252f7",
        status: "pending",
        createdAt: "2022-12-31T22:03:22.197Z",
        updatedAt: "2022-12-31T22:03:22.197Z",
        email: "admin@a.com",
        username: "Tester 1",
        profilePicture: null,
        contactNumber: 98761234,
      },
    ],
    requestee: [
      {
        id: "a1b2c3d4e5",
        requestee: "auth0|63aea209ac231151d6a252f7",
        requestor: "a1b2c3d4e5",
        status: "pending",
        createdAt: "2022-12-31T22:03:22.197Z",
        updatedAt: "2022-12-31T22:03:22.197Z",
        email: "johnsmith@unicornmail.com",
        username: "John Smith",
        profilePicture: null,
        contactNumber: 12345678,
      },
    ],
  },
  accepted: [
    {
      id: "tester2",
      requestee: "tester2",
      requestor: "auth0|63aea209ac231151d6a252f7",
      status: "accepted",
      createdAt: "2022-12-31T22:03:22.197Z",
      updatedAt: "2022-12-31T22:03:22.197Z",
      email: "tester2@tester.com",
      username: null,
      profilePicture: null,
      contactNumber: 87655678,
    },
  ],
};
