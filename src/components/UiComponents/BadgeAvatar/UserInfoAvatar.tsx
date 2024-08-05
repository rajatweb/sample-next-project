import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Box, Typography } from '@mui/material';
import { stringAvatar } from '@/utils/helpers';



type IProps = {
    label:string;
    emailAddress:string;
}

export default function UserInfoAvatar({label,emailAddress}:IProps) {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar {...stringAvatar(label)} />
      <Box>
        <Typography>{label}</Typography>
        <Typography>{emailAddress}</Typography>
      </Box>
    </Stack>
  );
}