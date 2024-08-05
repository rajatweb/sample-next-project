import { IDropdownType } from '@/utils/commonTypes';
import { BaseSelectProps} from '@mui/material';
import { Controller, UseControllerProps, useFormContext } from 'react-hook-form';
import InputDropdownField from '../Input/InputDropdownField';

type IProps = {
    dropDownItem: Array<IDropdownType>
} & BaseSelectProps & UseControllerProps;

const FormLevelDropdown = ({
    name,
    label,
    placeholder,
    dropDownItem,
    ...extraProps
}: IProps) => {
    const { control,formState: { errors }  } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            {...extraProps}
            render={({ field: { onChange, onBlur, value } }) => (
                <InputDropdownField
                    label={label}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    placeholder={placeholder}
                    dropDownItem={dropDownItem}
                    disabled={extraProps.disabled}
                    errorMessage={
                        errors?.root
                            ? String(errors.root[name]?.message || "")
                            : String(errors[name]?.message || "")
                    }
                    {...extraProps}
                />
            )}
        />
    )
}

export default FormLevelDropdown