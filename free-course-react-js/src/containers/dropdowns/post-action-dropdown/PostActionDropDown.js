import { MoreHoriz } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Dropdown from "../../../components/dropdown/Dropdown";
import DropdownItem from "../../../components/dropdown/DropdownItem";
import DropdownMenu from "../../../components/dropdown/DropdownMenu";
import DropdownToggle from "../../../components/dropdown/DropdownToggle";

const PostActionDropDown = ({ props }) => {
  return (
    <Dropdown>
      <DropdownToggle
        render={({ toggleDropdown }) => (
          <IconButton onClick={toggleDropdown}>
            <MoreHoriz />
          </IconButton>
        )}
      />
      <DropdownMenu
        shadow={8}
        width={{
          md: 300,
          xs: 280,
        }}
        direction="right"
      >
        <DropdownItem>Báo cáo</DropdownItem>
        <DropdownItem>Theo dõi/Hủy theo dõi</DropdownItem>
        <DropdownItem>Sao chép liên kết</DropdownItem>
        <DropdownItem>Đánh dấu</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default PostActionDropDown;
