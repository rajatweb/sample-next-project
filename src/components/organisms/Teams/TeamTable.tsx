import { CustomMRTTable } from '@/components/UiComponents/Table';
import { useDeleteTeamMutation, useDeleteTeamUserMutation } from '@/lib/api/coreApi';
import { useActions } from '@/lib/hooks';
import { ITeams } from '@/utils/commonTypes';
import { Edit, Delete } from '@mui/icons-material';
import { MenuItem, ListItemIcon } from '@mui/material';
import { MRT_ColumnDef } from 'material-react-table';
import React, { useMemo } from 'react'

type IProps = {
    data: ITeams[];
    isLoading:boolean;
}

const TeamTable = ({data,isLoading}:IProps) => {
    const [deleteTeam] = useDeleteTeamMutation();


    const {openEditTeamModal,toggleSuccessSnackbar,toggleErrorSnackbar} = useActions();
    const columns = useMemo<MRT_ColumnDef<ITeams>[]>(
        () => [
            {
                accessorKey:'name',
                header: 'Team Name',
                filterVariant:'text',
            },
        ],
        [data],
    );

    const handleDeleteUser =(data:ITeams) =>{
        deleteTeam(data).then(()=>{
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
                    openEditTeamModal(row.original)
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

export default TeamTable