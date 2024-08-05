import { Controller, UseControllerProps, useFormContext } from 'react-hook-form';
import { TextFieldProps } from '@mui/material';
import InputTextField from '../Input/InputTextField';

type IProps = {
    formstyle?: string,
} & TextFieldProps & UseControllerProps;

const FormLabelInput = ({
    name,
    ...extraProps
}: IProps) => {
    const { control, formState: { errors } } = useFormContext();
    return (
        <Controller
            name={name}
            control={control}
            {...extraProps}
            render={({ field }) => {
                return (
                    <InputTextField
                        inputProps={{ ...field }}
                        errorMessage={
                            errors?.root
                                ? String(errors.root[name]?.message || "")
                                : String(errors[name]?.message || "")
                        }
                        {...extraProps}
                    />
                )
            }}
        />
    )
}

export default FormLabelInput