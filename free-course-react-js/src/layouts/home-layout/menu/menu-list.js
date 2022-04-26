import {
  AddRounded,
  BallotRounded,
  ChatBubbleOutlineRounded,
  DashboardRounded,
  EmojiEventsRounded,
  GridViewRounded,
  HomeRounded,
  LogoutRounded,
  MenuBookRounded,
  PublicRounded,
  Settings,
  TravelExploreRounded,
  ViewListRounded,
} from "@mui/icons-material";

const mainMenuList = [
  {
    name: "Trang chủ",
    icon: HomeRounded,
    href: "/",
    selected: true,
  },
  {
    name: "Tìm kiếm",
    icon: TravelExploreRounded,
    href: "/search",
    additional: {
      display: {
        md: "none",
      },
    },
  },
  {
    type: "divider",
    title: "Khóa học",
  },
  {
    name: "Khóa học của tôi",
    icon: MenuBookRounded,
    href: "/my-courses",
  },
  {
    name: "Quản lý khóa học",
    icon: DashboardRounded,
    href: "/manage/courses",
    callFunction: (callback) => callback,
  },
  {
    name: "Danh mục khóa học",
    icon: BallotRounded,
    href: "/category",
  },
  {
    type: "divider",
    title: "Mạng xã hội",
  },
  {
    name: "Tạo bài viết",
    icon: AddRounded,
    href: "/post/create",
  },

  {
    name: "Newfeeds",
    icon: PublicRounded,
    href: "/newfeeds",
  },
  {
    name: "Nhắn tin",
    icon: ChatBubbleOutlineRounded,
    href: "/groups",
    badge: "15",
  },
  {
    type: "divider",
    title: "",
    additional: {
      display: {
        md: "none",
      },
    },
  },
  {
    name: "Cài đặt",
    icon: Settings,
    href: "/setting",
    additional: {
      display: {
        md: "none",
      },
    },
  },
  {
    type: "divider",
    title: "",
    additional: {
      display: {
        md: "none",
      },
    },
  },
  {
    name: "Đăng xuất",
    icon: LogoutRounded,
    href: "/logout",
    additional: {
      display: {
        md: "none",
      },
    },
  },
];

export const teacherSubMenuList = [
  {
    name: "Tạo khóa học",
    icon: MenuBookRounded,
    href: "/my-courses",
  },
  {
    name: "Dashboard",
    icon: GridViewRounded,
    href: "/manage/dashboard",
  },
  {
    name: "Danh sách khóa học",
    icon: ViewListRounded,
    href: "/manage/course-list",
  },
  {
    name: "Danh hiệu",
    icon: EmojiEventsRounded,
    href: "/category",
  },
];

export default mainMenuList;
