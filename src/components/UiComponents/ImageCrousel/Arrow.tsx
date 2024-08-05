import { Button, Fab } from "@mui/material";
import { MouseEvent } from "react";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

type IProps = {
    direction: 'left' | 'right';
    handleClick: (e: MouseEvent<HTMLButtonElement>) => void;
}


const Arrow = ({ direction, handleClick }: IProps) => {
    return (
        <Button
            onClick={(e) => handleClick(e)}
        >
            {direction === "right" ? <KeyboardArrowRightIcon /> : <KeyboardArrowLeftIcon />}
        </Button>
    );
};

export default Arrow;
