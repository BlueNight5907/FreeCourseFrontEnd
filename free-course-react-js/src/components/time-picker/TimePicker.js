import { ArrowDropDown, ArrowDropUp, ArrowRightAlt } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import { format, addHours, addMinutes } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const TimePicker = (props) => {
  const { time, setTime, increamentSize } = props;
  const [hourType, setHourType] = useState(
    time ? format(time, "a") : format(new Date(), "a")
  );
  const hour = time ? format(time, "hh:mm") : format(new Date(), "hh:mm");
  useEffect(() => {
    if (time) {
      setHourType(format(time, "a"));
    }
  }, [time]);
  const addMoreHours = (value) => {
    if (Math.abs(value) === 12) {
      setTime(addHours(time, value));
    } else {
      let hours = addHours(time, value).getHours();
      if (hourType === "PM") {
        hours = (hours % 12) + 12;
      } else {
        hours %= 12;
      }
      const result = new Date(
        time.getFullYear(),
        time.getMonth(),
        time.getDate(),
        hours,
        time.getMinutes(),
        0,
        0
      );
      setTime(result);
    }
  };

  const addMoreMinutes = (value) => {
    const result = new Date(
      time.getFullYear(),
      time.getMonth(),
      time.getDate(),
      time.getHours(),
      addMinutes(time, value).getMinutes(),
      0,
      0
    );
    setTime(result);
  };

  const handleChange = (event, type) => {
    if (type) {
      if (type === "PM") {
        addMoreHours(12);
      } else {
        addMoreHours(-12);
      }
      setHourType(type);
    }
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: 1,
        width: "calc((100% - 80px) / 2)",
      }}
    >
      <Stack
        flexDirection="row"
        gap={2}
        alignItems="center"
        justifyContent="center"
      >
        <Box width={100}>
          <Stack flexDirection="row" gap={2} alignItems="center">
            <IconButton
              disabled={!time}
              size="small"
              onClick={() => addMoreHours(1)}
            >
              <ArrowDropUp />
            </IconButton>
            <IconButton
              disabled={!time}
              size="small"
              onClick={() => addMoreMinutes(increamentSize)}
            >
              <ArrowDropUp />
            </IconButton>
          </Stack>
          <Stack flexDirection="row" justifyContent="space-between">
            <Typography variant="h1" fontWeight={500} component="p">
              {hour.split(":")[0]}
            </Typography>
            <Typography variant="h1" fontWeight={500} component="p">
              :
            </Typography>
            <Typography variant="h1" fontWeight={500} component="p">
              {hour.split(":")[1]}
            </Typography>
          </Stack>
          <Stack flexDirection="row" gap={2} alignItems="center">
            <IconButton
              disabled={!time}
              size="small"
              onClick={() => addMoreHours(-1)}
            >
              <ArrowDropDown />
            </IconButton>
            <IconButton
              disabled={!time}
              size="small"
              onClick={() => addMoreMinutes(-increamentSize)}
            >
              <ArrowDropDown />
            </IconButton>
          </Stack>
        </Box>
        <ToggleButtonGroup
          orientation="horizontal"
          value={hourType}
          exclusive
          onChange={handleChange}
          disabled={!time}
        >
          <ToggleButton value="AM">AM</ToggleButton>
          <ToggleButton value="PM">PM</ToggleButton>
        </ToggleButtonGroup>
      </Stack>
    </Box>
  );
};

const DateBox = (props) => {
  const { title, time } = props;
  const theme = useTheme();
  const style = {
    flexGrow: 1,
    padding: 1,
    borderWidth: 0.5,
    borderStyle: "solid",
    borderColor: time ? "transparent" : theme.palette.primary.main,
    width: "calc((100% - 80px) / 2)",
  };

  const date = time ? time.getDate() : "";
  const monthAndYear = time ? format(time, "MMMM yyyy") : "";
  const dayAndTime = time ? format(time, "EEEE hh:mm a") : "";
  return time ? (
    <Box sx={style}>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <Stack flexDirection="row" gap={1} alignItems="center">
        <Typography variant="h1" component="p" fontWeight={500}>
          {date}
        </Typography>
        <Box>
          <Typography variant="h6" component="p">
            {monthAndYear}
          </Typography>
          <Typography variant="caption" component="p">
            {dayAndTime}
          </Typography>
        </Box>
      </Stack>
    </Box>
  ) : (
    <Box sx={style}>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <Typography>Select a date</Typography>
    </Box>
  );
};

const TimeRangePickerModal = (props) => {
  const { startDate, endDate, setOpen, onConfirm } = props;
  const [increamentSize, setIncreamentSize] = useState(1);
  const [state, setState] = useState({
    startDate: new Date(),
    endDate: null,
    key: "selection",
  });

  useEffect(() => {
    setState({
      startDate: startDate || new Date(),
      endDate: endDate || null,
      key: "selection",
    });
  }, [startDate, endDate]);

  const styles = {
    divider: {
      borderWidth: 1,
      my: 2,
      flexGrow: 1,
      alignSelf: "center",
    },
    btn: {
      width: 100,
    },
  };
  const setTime = (option) => (value) => {
    state[option] = value;
    setState({
      ...state,
    });
  };

  const handleChange = (item) => {
    const { selection } = item;
    const startDate = new Date(
      selection.startDate.getFullYear(),
      selection.startDate.getMonth(),
      selection.startDate.getDate(),
      state.startDate.getHours(),
      state.startDate.getMinutes(),
      0,
      0
    );
    const endDate = new Date(
      selection.endDate.getFullYear(),
      selection.endDate.getMonth(),
      selection.endDate.getDate(),
      state.endDate ? state.endDate.getHours() : state.startDate.getHours(),
      state.endDate ? state.endDate.getMinutes() : state.startDate.getMinutes(),
      0,
      0
    );
    setState({
      ...selection,
      startDate,
      endDate,
    });
  };

  return (
    <Box width="100%">
      <Stack flexDirection="row" gap={1}>
        <DateBox title="START" time={state.startDate} />
        <ArrowRightAlt
          fontSize="large"
          sx={{ flexShrink: 0, alignSelf: "center" }}
        />
        <DateBox title="FINISH" time={state.endDate} />
      </Stack>
      <Divider sx={styles.divider} />
      <Box
        sx={{
          "& .rdrCalendarWrapper": {
            width: "100%",
            "& .rdrMonthAndYearWrapper": {
              pt: 0,
            },
            "& .rdrMonth": {
              width: "inherit",
              padding: 0,
            },
          },
        }}
      >
        <DateRange
          showDateDisplay={false}
          onChange={handleChange}
          moveRangeOnFirstSelection={false}
          ranges={[state]}
        />
      </Box>
      <Divider sx={styles.divider} />
      <Stack flexDirection="row" gap={1}>
        <TimePicker
          time={state.startDate}
          setTime={setTime("startDate")}
          increamentSize={increamentSize}
        />
        <ArrowRightAlt
          fontSize="large"
          sx={{ flexShrink: 0, alignSelf: "center" }}
        />
        <TimePicker
          time={state.endDate}
          setTime={setTime("endDate")}
          increamentSize={increamentSize}
        />
      </Stack>
      <Stack flexDirection="row" gap={1} width="100%" alignItems="center">
        <Typography>INCREAMENT SIZE</Typography>
        <Divider flexItem sx={styles.divider} orientation="horizontal" />
        <FormControl>
          <RadioGroup
            value={increamentSize}
            onChange={(event) => setIncreamentSize(event.target.value)}
            sx={{ flexDirection: "row" }}
          >
            <FormControlLabel
              labelPlacement="start"
              value={1}
              control={<Radio size="small" />}
              label="1min"
            />
            <FormControlLabel
              labelPlacement="start"
              value={5}
              control={<Radio size="small" />}
              label="5min"
            />
            <FormControlLabel
              labelPlacement="start"
              value={15}
              control={<Radio size="small" />}
              label="15min"
            />
          </RadioGroup>
        </FormControl>
      </Stack>
      <Stack
        flexDirection="row"
        gap={1}
        width="100%"
        alignItems="center"
        justifyContent="flex-end"
        mt={3}
      >
        <Button sx={styles.btn} onClick={() => setOpen && setOpen(false)}>
          Cancel
        </Button>
        <Button
          sx={styles.btn}
          variant="contained"
          disabled={
            !state.endDate ||
            state.startDate.getTime() >= state.endDate.getTime()
          }
          onClick={() => {
            if (setOpen) setOpen(false);
            if (onConfirm) onConfirm(state.startDate, state.endDate);
          }}
        >
          Save
        </Button>
      </Stack>
    </Box>
  );
};

export default TimeRangePickerModal;
