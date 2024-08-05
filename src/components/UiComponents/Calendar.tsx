import { styled } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers";

const StyledCalendar = styled(DateCalendar)({
    backgroundColor: "rgb(252, 252, 251)",
    border: "2px solid rgb(84, 61, 128)",
    fontFamily: '"Source Sans Pro", "Helvetica Neue", Helvetica, Arial',
    '& .MuiPickersDay-root': {
        fontSize: "16px",
        fontWeight: 700,
    },
    '& .MuiPickersDay-today': { border: "1px solid rgb(152, 139, 179)", fontWeight: "bold" },
    '& .MuiMonthCalendar-root':{
        border:'none'
    }
});

export default StyledCalendar;