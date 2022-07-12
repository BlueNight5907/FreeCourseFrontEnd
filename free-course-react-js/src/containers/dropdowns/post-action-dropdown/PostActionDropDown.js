import { MoreHoriz } from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import Dropdown from "../../../components/dropdown/Dropdown";
import DropdownItem from "../../../components/dropdown/DropdownItem";
import DropdownMenu from "../../../components/dropdown/DropdownMenu";
import DropdownToggle from "../../../components/dropdown/DropdownToggle";

const PostActionDropDown = ({ props }) => {
  const theme = useTheme();
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
        <DropdownItem>
          {/* <Box display="flex" justifyContent="space-between"> */}
          <MoreHoriz />
          <Typography color={theme.palette.tomato.main} fontWeight={550}>
            Báo cáo
          </Typography>
          {/* </Box> */}
        </DropdownItem>
        <Divider />
        <DropdownItem>Theo dõi/Hủy theo dõi</DropdownItem>
        <DropdownItem>Sao chép liên kết</DropdownItem>
        <DropdownItem>Đánh dấu</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default PostActionDropDown;
