import { Clear, ExpandMore, FilterAlt as MuiFilter } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  Drawer,
  FormControl,
  FormControlLabel,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_CATEGORIES_REQUEST,
  GET_TAGS_REQUEST,
} from "store/types/data-types/category-types";
import { scrollSetting } from "utils/classUltis";
import Button from "../../../components/button/Button";

const FilterSection = (props) => {
  const {
    type = "radio",
    handleChange,
    value,
    data,
    title,
    defaultOpen,
  } = props;
  const [expanded, setExpanded] = useState(defaultOpen ? "panel" : "");
  const handleExpaned = (panel) => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Accordion
      square
      elevation={0}
      expanded={expanded === "panel"}
      onChange={handleExpaned("panel")}
    >
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <FormControl>
          {type === "radio" && (
            <RadioGroup
              value={value}
              onChange={(event) => handleChange(event.target.value)}
            >
              {data?.map((item, index) => (
                <FormControlLabel
                  key={index}
                  value={item.value}
                  control={<Radio />}
                  label={item.name}
                />
              ))}
            </RadioGroup>
          )}
          {type === "checkbox" &&
            data?.map((item, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={value?.filter((a) => a === item.value).length > 0}
                    onChange={(e) => {
                      let arr = value;
                      if (e.target.checked) {
                        arr.push(item.value);
                      } else {
                        arr = value.filter((tag) => tag !== item.value);
                      }
                      handleChange(arr);
                    }}
                  />
                }
                label={item.name}
              />
            ))}
        </FormControl>
      </AccordionDetails>
    </Accordion>
  );
};

const Filter = (props) => {
  const { open, setOpen, params, updateCategory, updateTags } = props;
  const theme = useTheme();
  const matchLg = useMediaQuery(theme.breakpoints.up("lg"));

  const { categories, tags } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: GET_CATEGORIES_REQUEST });
    dispatch({ type: GET_TAGS_REQUEST });
  }, [dispatch]);

  return (
    <>
      {matchLg ? (
        <Paper
          square
          elevation={0}
          sx={{
            width: 350,
            marginLeft: !open ? -36 : 0,
            transition: "all 0.3s ease",
            height: "fit-content",
          }}
        >
          <FilterSection
            title="Danh mục khóa học"
            type="radio"
            name="category"
            handleChange={updateCategory}
            defaultOpen
            value={params.category}
            data={[
              { value: "all", name: "Toàn bộ" },
              ...categories.map((item) => ({
                value: item.urlPath,
                name: item.name,
              })),
            ]}
          />
          <FilterSection
            title="Tag"
            type="checkbox"
            name="rate"
            handleChange={updateTags}
            value={params.queries.tags}
            data={tags.map((item) => ({
              value: item.name,
              name: item.name,
            }))}
          />
        </Paper>
      ) : (
        <Drawer
          anchor="right"
          sx={{
            zIndex: theme.zIndex.drawer + 100,
          }}
          open={open}
          onClose={() => setOpen(false)}
        >
          <Paper
            square
            elevation={0}
            sx={{
              width: 320,
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                boxShadow: theme.shadows[3],
                zIndex: 2,
                backgroundColor: theme.palette.foreground.main,
              }}
              className=" sticky top-0 flex shrink-0 items-center justify-between mb-3 px-2 py-2"
            >
              <Typography className="ml-3 font-medium flex gap-1 items-center">
                <MuiFilter fontSize="small" color="primary" />
                Lọc kết quả
              </Typography>
              <IconButton onClick={() => setOpen(false)}>
                <Clear />
              </IconButton>
            </Box>

            <Box className="grow" sx={scrollSetting()}>
              <FilterSection
                title="Danh mục khóa học"
                type="radio"
                name="category"
                handleChange={updateCategory}
                defaultOpen
                value={params.category}
                data={[
                  { value: "all", name: "Toàn bộ" },
                  ...categories.map((item) => ({
                    value: item.urlPath,
                    name: item.name,
                  })),
                ]}
              />
              <FilterSection
                title="Tag"
                type="checkbox"
                name="rate"
                handleChange={updateTags}
                value={params.queries.tags}
                data={tags.map((item) => ({
                  value: item.name,
                  name: item.name,
                }))}
              />
            </Box>
            <Button
              className="m-2"
              variant="contained"
              onClick={() => setOpen(false)}
            >
              Hoàn tất
            </Button>
          </Paper>
        </Drawer>
      )}
    </>
  );
};

export default Filter;
