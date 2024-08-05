import { Box, Slide, Card, CardMedia, styled } from "@mui/material";
import Arrow from "./Arrow";
import Dots from "./Dots";
import { useState } from "react";
import React from "react";

const StyledWrapper = styled(Box)({
    '& .card': {
        borderRadius: 5,
        maxHeight: "300px",
        color: "black"
    },
    '& .img': {
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center"
    },
    '& .slider': {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
})

export default function ImageCrousel({ contents }: { contents: string[] }) {
    const [slideIn, setSlideIn] = useState(true);
    const [slideDirection, setSlideDirection] = useState<"right" | "left">("right");
    const [index, setIndex] = useState(0);
    const content = contents[index];
    const numSlides = contents.length;
    const sliderContainerRef = React.useRef(null)

    const onArrowClick = (direction: "left" | "right") => {
        const increment = direction === "left" ? -1 : 1;
        const newIndex = (index + increment + numSlides) % numSlides;
        const oppDirection = direction === "left" ? "right" : "left";
        setSlideDirection(direction);
        setSlideIn(false);

        setTimeout(() => {
            setIndex(newIndex);
            setSlideDirection(oppDirection);
            setSlideIn(true);
        }, 500);
    };


    return (
        <StyledWrapper>
            <Box className={'slider'}>
                        <Card className={'card'} ref={sliderContainerRef}>
                        <Slide in={slideIn}  direction={slideDirection} container={sliderContainerRef.current}>
                            <CardMedia className={'img'} component="img" src={content} />
                        </Slide>
                        </Card>

            </Box>
            {contents.length > 1 &&
                <Box className="flex justify-center items-center pt-2">
                    <Arrow direction="left" handleClick={() => onArrowClick("left")} />
                    <Dots content={contents} index={index} />
                    <Arrow direction="right" handleClick={() => onArrowClick("right")} />
                </Box>}
        </StyledWrapper>
    );
}
