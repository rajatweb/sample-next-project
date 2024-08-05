import { UseControllerProps } from 'react-hook-form';

import { Box, FormHelperText, TextField, TextFieldProps, styled } from '@mui/material';
import { grey, red } from '@mui/material/colors';


const StyledContentWrapper = styled(Box)<{ formstyle: string }>(({ formstyle }) => ({
    display: formstyle === "flex" ? formstyle : 'inline-block',
    justifyContent: "center",
    alignItems: "center",
    padding: "5px 0px",
    flex:1
}));

const StyledTextField = styled(TextField)({
    flexBasis: "150px",
    flexGrow: 1,
    "& .MuiOutlinedInput-input": {
        backgroundColor: "#fff",
        borderRadius: "5px",
        border: "none",
    },
    "& .MuiOutlinedInput-input.Mui-disabled": {
        opacity: "0.8"
    }
});

const StyledErrorMessageText = styled(FormHelperText)({
    color: "#d32f2f"
});

type IProps = {
    errorMessage?: string,
    formstyle?: string,
} & TextFieldProps & Pick<UseControllerProps, "rules">;

const InputTextField = ({
    formstyle = "",
    errorMessage = "",
    ...extraProps
}: IProps) => {
    return (
        <StyledContentWrapper formstyle={formstyle}>
            <StyledTextField
                size="medium"
                variant="outlined"
                error={!!errorMessage.length}
                {...extraProps}
            />

            {!!errorMessage && !!errorMessage.length && (
                <StyledErrorMessageText>{errorMessage}</StyledErrorMessageText>
            )}

        </StyledContentWrapper>
    )
}

export default InputTextField;