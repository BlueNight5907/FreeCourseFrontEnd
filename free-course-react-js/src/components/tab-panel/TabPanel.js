import { Box } from "@mui/material";

function TabPanel({ children, value, index, ...other }) {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      sx={{
        flexGrow: 1,
      }}
      {...other}
    >
      {value === index && children}
    </Box>
  );
}

export default TabPanel;
