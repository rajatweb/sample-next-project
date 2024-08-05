import { styled, Box, Avatar, Badge, Stack } from '@mui/material'
import React from 'react'
import moment from 'moment';
import { stringAvatar } from '@/utils/helpers';

type IProps = {
    socialIcon: string;
    userAvatar?: string;
    socialUserName: string;
    postCreateDate: string;
};

const StyledWrapper = styled(Box)({
    fontSize: '14px',
    "& .social-info-box": {
        marginLeft:'8px',
        '& .user-name': {
            color: '#2f6b9a',
            lineHeight: 1.2

        },
        "* .post-meta-data": {
            color: '#5c6365',
        }
    }

})

const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
}));


const SocialUserInfoAvatar = ({ socialIcon, userAvatar, socialUserName, postCreateDate }: IProps) => {

    const postMetadata = moment(postCreateDate).fromNow();
    return (<StyledWrapper className="w-full flex">
        {
            <Stack direction="row" spacing={2}>
                <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                        <SmallAvatar src={socialIcon} />
                    }
                >
                    {userAvatar?.length ? <Avatar src={userAvatar} /> : <Avatar {...stringAvatar(socialUserName)} />}
                </Badge>
            </Stack>
        }
        <Box className="social-info-box">
            <Box className="user-name">{socialUserName}</Box>
            <Box className="post-meta-data">{postMetadata}</Box>
        </Box>

    </StyledWrapper>

    )
}

export default SocialUserInfoAvatar