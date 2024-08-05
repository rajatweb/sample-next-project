import { Box, styled } from "@mui/material";

export const PostPreviewContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "460px",
  height: "100%",
  borderLeft: "1px solid rgb(211, 211, 211)",
  borderRadius:'5px',
  outline: "0px",
  backgroundColor: "rgb(249, 248, 247)",
  transition: 'left .10s cubic-bezier(0.820, 0.085, 0.395, 0.895)',
  '& .preview-header':{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "70px",
    backgroundColor: "rgb(238, 235, 232)",
    padding: "0px 16px",
    '& .preview-header-left':{ 
      display: "flex", 
      flexDirection: "column", 
      color: "rgb(67, 89, 122)",
      '& :first-child': {
        fontSize: '16px',
      },
      '& :last-child': { 
        color: "rgb(67, 89, 122)", 
        fontSize: "24px", 
        fontWeight: 700 
      }
    }
  },
  '& .preview-content':{ 
    backgroundColor: "rgb(249, 248, 247)",
    '& .preview-content-item':{
      minHeight: "120px",
      padding: "10px",
      borderBottom: "1px solid rgb(211, 210, 211)",
      borderRadius: "2px", 
      marginBottom: "8px",
      height: "100%",
      border: "1px solid rgb(230, 234, 235)",
      boxShadow:
        "rgba(28, 28, 28, 0.28) 0px 0px 1px, rgba(28, 28, 28, 0.16) 0px 1px 1px",
      fontFamily: '"Source Sans Pro", "Helvetica Neue", Helvetica, Arial',
      overflow: "hidden",
      cursor: "pointer",
      background: "rgb(253, 253, 253)",
      gap:'4px',
      '& .thumbnail-container':{
        minWidth: "100px",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        flex:"0 0 30%",
        '& img':{
          height:'100%'
        }
      },
      '& .preview-post-content':{
        flex:'0 0 70%',
        paddingLeft:'2px',
        '& .post-content':{
          width:'200px',
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis"
        }
      }
    }
  }
})

export const WeekSchedulerContainer = styled(Box)({
  backgroundColor: '#ffffff',
  fontFamily: '"Source Sans Pro","Helvetica Neue",Helvetica,Arial',
  fontSize: "16px",
  fontWeight: 700,
  color: 'rgb(20, 48, 89)',
  border: '1px solid #cfd7e3',
  '& .scheduler-header': {
    display: "grid",
    gridTemplateColumns: "repeat(8, 1fr)",
    height: '60px',
    border: '1px solid #cfd7e3',
    '& .scheduler-header-col': {
      borderRight: '1px solid #cfd7e3',
      textAlign: 'center',
    },
    '& :last-child': {
      borderRight: 'none',
    }
  },
  '& :first-child': {
    border: 'none',
  },
  '& .scheduler-content': {
    borderTop: '1px solid #cfd7e3',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    'cursor-pointer': {
      cursor: 'pointer'
    },
    '& .scheduler-content-row': {
      display: "grid",
      gridTemplateColumns: "repeat(8, 1fr)",
      borderBottom: '1px solid #cfd7e3',
    },
    '& .border-right': {
      borderRight: '1px solid #cfd7e3'
    },
    '& :last-child': {
      border: 'none',
    },
    '& .post-count':{
      fontWeight: 700,
      fontSize: "18px",
      color: "rgb(80, 76, 77)"
    },
    '& .post-type':{
      fontSize:'16px',
      fontWeight:400,
      color: "rgb(80, 76, 77)" 
    }
  },
  '& .calendar-day-not-current': {
    backgroundColor: "#F5F5F5",
    color: "#b5c0cd"
  },
  '& .calendar-day-today': {
    color: "rgba(0, 0, 0, 0.87)",
    backgroundColor: "rgb(238, 235, 232)",
  },
});

export const StyledMonthScheduler = styled(Box)({
  border: '1px solid #cfd7e3',
  backgroundColor: '#ffffff',
  '& ol': {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    fontFamily: '"Source Sans Pro","Helvetica Neue",Helvetica,Arial',
    fontSize: "16px",
  },
  '& .day-of-week': {
    fontWeight: 700,
    color: "rgb(20, 48, 89)",
    height: '35px',
    '& li': {
      borderRight: '1px solid #cfd7e3'
    },
    '& :last-child': {
      borderRight: 'none',
    },

  },
  '& .calendar-day-content': {
    height: '100%',
    '& .days-grid': {
      borderTop: '1px solid #cfd7e3',
      height: '100%',
      '& .calendar-day': {
        minHeight: '130px',
        '& .calendar-date': {
          paddingRight:'5px'
        }
      },
      '& .calendar-day-today': {
        paddingTop: '4px',
        color: "rgba(0, 0, 0, 0.87)",
        backgroundColor: "rgb(238, 235, 232)",
        '& .calendar-date': {
          color: "#fff",
          borderRadius: "9999px",
          backgroundColor: "#3e4e63"
        }
      },
      '& .calendar-day-not-current': { backgroundColor: "#F5F5F5", color: "#b5c0cd" },
      '& li': {
        borderRight: '1px solid #cfd7e3'
      },
      '& :last-child': {
        borderRight: 'none',
      },

    }

  }
});
