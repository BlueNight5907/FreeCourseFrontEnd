import {
  AddRounded,
  BallotRounded,
  ChatBubbleOutlineRounded,
  DashboardRounded,
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
    end: true,
    roles: ["teacher", "student", "admin"],
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
    roles: ["teacher", "student", "admin"],
  },
  {
    type: "divider",
    title: "Khóa học",
  },
  {
    name: "Khóa học của tôi",
    icon: MenuBookRounded,
    href: "/my-courses",
    roles: ["teacher", "student", "admin"],
  },
  {
    name: "Quản lý khóa học",
    icon: DashboardRounded,
    href: "/manage/courses",
    roles: ["teacher", "admin"],
    callFunction: (callback) => callback,
  },
  {
    name: "Danh mục khóa học",
    icon: BallotRounded,
    href: "/courses",
    roles: ["teacher", "student", "admin"],
  },
  {
    type: "divider",
    title: "Mạng xã hội",
    roles: ["teacher", "student", "admin"],
  },
  {
    name: "Tạo bài viết",
    icon: AddRounded,
    href: "/post/create",
    roles: ["teacher", "student", "admin"],
  },

  {
    name: "Cộng đồng",
    icon: PublicRounded,
    href: "/community",
    roles: ["teacher", "student", "admin"],
  },
  {
    name: "Nhắn tin",
    icon: ChatBubbleOutlineRounded,
    href: "/groups",
    badge: "15",
    roles: ["teacher", "student", "admin"],
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
    roles: ["teacher", "student", "admin"],
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
    roles: ["teacher", "student", "admin"],
  },
];

export const teacherSubMenuList = [
  {
    name: "Tạo khóa học",
    icon: MenuBookRounded,
    href: "/manage-course/create",
  },
  {
    name: "Danh sách khóa học",
    icon: ViewListRounded,
    href: "/manage-course/category",
  },
];

export default mainMenuList;
