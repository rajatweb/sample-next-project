import { styled } from '@mui/material';
import { FormProvider } from 'react-hook-form';

interface IProps {
    methods: any;
    children: React.ReactNode;
    id?: string;
    onSubmit?: () => void;
}

const StyledForm = styled("form")({
    display: "flex",
    flexDirection: "column",
    gap: "15px",
});

const FormWrapper = ({ methods, children, ...extraProps }: IProps) => {
    return (
        <FormProvider {...methods}>
            <StyledForm {...extraProps}>{children}</StyledForm>
        </FormProvider>
    )
}

export default FormWrapper;