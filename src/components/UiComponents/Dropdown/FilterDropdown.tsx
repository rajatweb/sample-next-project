import { styled, Box, ClickAwayListener, Checkbox } from '@mui/material';
import React from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SimpleButton from '../Button/SimpleButton';
import UiButton from '../Button/UiButton';
import { IDropdownType } from '@/utils/commonTypes';

type IProps = {
    placeholder: string;
    dropdownItems: IDropdownType[];
    defaultSelected: string[];
    onSubmitHandler: (arg: string[]) => void;
}

const StyledDropdownContainer = styled(Box)({
    position: 'relative',
    height: '36px',
    padding: '8px 24px',
    fontFamily: '"Source Sans Pro", "Helvetica Neue", Helvetica, Arial',
    fontSize: "16px",
    fontWeight: 700,
    lineHeight: "20px",
    color: "rgb(20, 48, 89)",
    backgroundColor: "rgb(208, 214, 222)",
    borderRadius: "50px",
    '& .placeholder-container': {
        cursor: 'pointer'
    },
    '& .dropdown-item-container': {
        position: 'absolute',
        color: "rgb(36, 31, 33)",
        background: "rgb(252, 252, 251)",
        boxShadow: "rgb(84, 61, 128) 0px 0px 0px 2px",
        display: "block",
        boxSizing: "border-box",
        zIndex: 2122,
        top: "100%",
        marginTop: "8px",
        left: "0px",
        width: "max-content",
    },
    '& .dropdown-item-actions': {
        display: "flex",
        justifyContent: 'center',
        alignItems: "center",
        padding: "8px",
        gap: "8px",
        borderTop: "2px solid rgb(84, 61, 128)"
    },
    '& .dropdown-items': {
        padding: '10px'
    },
    '& .item-total': {
        backgroundColor: 'rgb(251, 169, 25)',
        padding: '2px 6px',
        borderRadius: '50%'
    }

});

const FilterDropdown = ({ placeholder, dropdownItems, defaultSelected, onSubmitHandler }: IProps) => {
    const [toggleDropdown, setDropdown] = React.useState(false);
    const [filterCount,setFilterCount] = React.useState<number>(defaultSelected.length)
    const [selectedItems, setSelectedItems] = React.useState<string[]>(defaultSelected);

    React.useEffect(()=>{
        setFilterCount(defaultSelected.length);
        setSelectedItems(defaultSelected);

    },[defaultSelected])

    const onResetHander = () => {
        if (selectedItems.length){
            onSubmitHandler([]);
            setSelectedItems([]);
        }
        else setDropdown(false);
    }

    return (<StyledDropdownContainer>
        <div onClick={() => setDropdown((value) => !value)} className="placeholder-container">
            {!!filterCount && <span className='item-total'>{filterCount} </span>}
            {placeholder} <ArrowDropDownIcon /></div>
        {toggleDropdown && <ClickAwayListener onClickAway={() => setDropdown(false)}>
            <div className="dropdown-item-container">
                <div className='dropdown-items'>
                    {dropdownItems.map((item, key) => <div key={key}> <Checkbox value={item.value} checked={selectedItems.includes(item.value)} onChange={(e) => setSelectedItems(value => {
                        const targetValue = e.target.value
                        const data = [...value];
                        const idx = data.findIndex((item) => item === targetValue)
                        if (idx === -1) data.push(e.target.value);
                        else data.splice(idx,1);
                        return data;

                    })} />{item.text}</div>)}
                </div>
                <div className='dropdown-item-actions'>
                    <SimpleButton onClick={() => onResetHander()}> {selectedItems.length ? 'Reset' : 'Close'}</SimpleButton>
                    <UiButton primary label='Apply' onClick={() => {
                        onSubmitHandler(selectedItems);
                        setDropdown(false);
                    }} disabled={!selectedItems.length && !defaultSelected.length} />
                </div>
            </div>
        </ClickAwayListener>}
    </StyledDropdownContainer>

    )
}

export default FilterDropdown