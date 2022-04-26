import { Box } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

function Dropdown(props) {
  const { children, sx, ...others } = props;
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const toggleDropdown = () => {
    setOpen(!open);
  };
  const childrenWithProps = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      if (index === 0) {
        return React.cloneElement(child, { onClick: toggleDropdown });
      } else if (index === 1) {
        return React.cloneElement(child, {
          toggleDropdown,
          open: open,
        });
      }
    }
    return child;
  });
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      if (open) toggleDropdown();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [open]);
  return (
    <Box
      ref={ref}
      sx={{
        ...sx,
      }}
      {...others}
      className="relative"
    >
      {childrenWithProps}
    </Box>
  );
}

export default Dropdown;
