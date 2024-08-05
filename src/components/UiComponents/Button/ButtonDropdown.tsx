import { ArrowDown } from '@/assets/icons'
import { styled, Button, ButtonProps } from '@mui/material'
import { ArrowDropDownIcon } from '@mui/x-date-pickers'
import React from 'react'

const StyledButtonDropdown = styled(Button)({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    minWidth: "80px",
    maxWidth: "500px",
    width: "auto",
    height: "44px",
    padding: "0px 24px",
    verticalAlign: "middle",
    fontFamily: '"Source Sans Pro", "Helvetica Neue", Helvetica, Arial',
    fontSize: "16px",
    fontWeight: 700,
    lineHeight: "20px",
    textAlign: "center",
    textDecoration: "none",
    textShadow: "none",
    whiteSpace: "nowrap",
    userSelect: "none",
    transition:
      "background-color 0.15s ease-out 0s, border-color 0.1s ease-out 0s",
    position: "relative",
    overflow: "hidden",
    textOverflow: "ellipsis",
    color: "rgb(20, 48, 89)",
    backgroundColor: "rgb(208, 214, 222)",
    borderRadius: "50px"
  })

const ButtonDropdown = ({onClick,children}:ButtonProps) => {
  return (
    <StyledButtonDropdown onClick={onClick}>{children} <ArrowDropDownIcon/></StyledButtonDropdown>
  )
}

export default ButtonDropdown