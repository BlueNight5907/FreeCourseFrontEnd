import image from "../assets/background/login.jpg";

const Posts = [
  {
    id: 1,
    username: "Test",
    createDate: new Date(),
    avatar: "A",
    media: image,
    like: 100,
    caption:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis varius quam quisque id diam. Ultricies mi eget mauris pharetra. Fringilla urna porttitor rhoncus dolor purus non enim.",
  },
  {
    id: 2,
    username: "Test 2",
    createDate: new Date(),
    avatar: "B",
    media: image,
    like: 0,
    caption:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis varius quam quisque id diam. Ultricies mi eget mauris pharetra. Fringilla urna porttitor rhoncus dolor purus non enim.",
  },
];

export default Posts;
