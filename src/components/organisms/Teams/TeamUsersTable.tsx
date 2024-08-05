import { IDropdownType, ITeamPerson } from '@/utils/commonTypes';
import { Badge, Chip, ListItemIcon, MenuItem } from '@mui/material';
import Box from '@mui/material/Box';
import { MRT_ColumnDef, useMaterialReactTable, MaterialReactTable } from 'material-react-table';
import React, { useMemo } from 'react';
import { Edit, Delete } from '@mui/icons-material';
import UserInfoAvatar from '@/components/UiComponents/BadgeAvatar/UserInfoAvatar';
import { CustomMRTTable } from '@/components/UiComponents/Table';
import { useActions } from '@/lib/hooks';
import { useDeleteTeamUserMutation } from '@/lib/api/coreApi';

type IProps = {
    data: ITeamPerson[];
    isLoading:boolean;
}

const dropdownHelper = (data:ITeamPerson[],key:keyof ITeamPerson):IDropdownType[] =>{
    return data.reduce((acc,initValue,idx)=>{
        if(!idx) acc.push({text:initValue[key],value:initValue[key]});
        else {
            const isExsist = !!acc.find((item)=>item.value === initValue[key]);
            if(!isExsist) acc.push({text:initValue[key],value:initValue[key]});
        }
        return acc;
    },[] as IDropdownType[])
}

const TeamUsersTable = ({ data,isLoading }: IProps) => {

    const [deleteUser] = useDeleteTeamUserMutation();

    const teamsFilterDropdown = dropdownHelper(data,'team');
    const roleFilterDropdown = dropdownHelper(data,'role');
    const statusFilterDropdown = dropdownHelper(data,'status');

    const {openEditTeamUserModal,toggleSuccessSnackbar,toggleErrorSnackbar} = useActions();
    const columns = useMemo<MRT_ColumnDef<ITeamPerson>[]>(
        () => [
            {
                accessorKey:'name',
                header: 'Full Name',
                filterVariant:'text',
                Cell: ({ row }) => (<UserInfoAvatar label={row.original.name} emailAddress={row.original.email} />
                ),
            },
            {
                accessorKey: 'role',
                header: 'Role',
                filterVariant: 'multi-select',
                filterSelectOptions:roleFilterDropdown
            },
            {
                accessorKey: 'team',
                header: 'Team',
                filterVariant: 'multi-select',
                filterSelectOptions:teamsFilterDropdown
            },
            {
                accessorKey: 'status',
                header: 'Status',
                filterVariant: 'select',
                filterSelectOptions:statusFilterDropdown,
                Cell: ({ renderedCellValue }) => {
                    if(renderedCellValue==='banned') return <Chip label={'Banned'} color="error" />;
                    else if(renderedCellValue==='pending') return <Chip label={'Pending'} color="primary" />;
                    return <Chip label={renderedCellValue} color="success" />
                }
            },
        ],
        [data],
    );

    const handleDeleteUser =(data:ITeamPerson) =>{
        deleteUser(data).then(()=>{
            toggleSuccessSnackbar({message:'User Deleted Succesfully'})
        }).catch(()=>{
            toggleErrorSnackbar({message:'Failed to delete user'})
        })
    }


    return <CustomMRTTable
        columns={columns}
        data={data}
        state={{isLoading}}
        enableRowActions
        renderRowActionMenuItems={({ closeMenu,row }) => [
            <MenuItem
                key={0}
                onClick={() => {
                    openEditTeamUserModal(row.original)
                    closeMenu();

                }}
                sx={{ m: 0 }}
            >
                <ListItemIcon>
                    <Edit />
                </ListItemIcon>
                Edit
            </MenuItem>,
            <MenuItem
                key={1}
                onClick={() => {
                    handleDeleteUser(row.original)
                    closeMenu();
                }}
                sx={{ m: 0 }}
            >
                <ListItemIcon>
                    <Delete />
                </ListItemIcon>
                Delete
            </MenuItem>,
        ]} />;
}

export default TeamUsersTable