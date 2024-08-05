
import { IDropdownType } from '@/utils/commonTypes';
import { BaseSelectProps, FormControl, FormHelperText, InputLabel, MenuItem, Select,  } from '@mui/material';

type IProps = {
    dropDownItem: Array<IDropdownType>,
    errorMessage:string,
} & BaseSelectProps;


const InputDropdownField = ({
    onBlur,
    onChange,
    value,
    dropDownItem,
    disabled,
    errorMessage,
    ...extraProps
}: IProps) => {
    console.log(value,'value')
    return (
        <FormControl sx={{ minWidth: 120,width:'100%' }} error={!!errorMessage.length}>
        <InputLabel id="demo-simple-select-helper-label">{extraProps.label}</InputLabel>
            <Select
                labelId="demo-simple-select-helper-label"
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                size="medium"
                disabled={disabled}
                {...extraProps}
            >
                {dropDownItem.map((el,key) => (
                        <MenuItem key={key} value={el.value}>
                            {el.text}
                        </MenuItem>
                    ))
                }
            </Select>
            {!!errorMessage.length && <FormHelperText>{errorMessage}</FormHelperText>}
            </FormControl>
    )
}

export default InputDropdownField