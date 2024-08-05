import { Box, styled } from '@mui/material'
import React from 'react'
import SocialUserInfoAvatar from '../UiComponents/BadgeAvatar/SocialUserInfoAvatar';
import { IStreamPostType } from '@/utils/steamTypes';
import ImageCrousel from '../UiComponents/ImageCrousel';

const StyledStreamsWrapper = styled(Box)({
  backgroundColor: "#fcfcfb",
  borderBottom: "0 none",
  paddingBottom: "1px",
  marginBottom: "1px",
  fontSize:'14px',
  wordWrap: "break-word", 
  wordBreak: "break-word", 
  padding: "4px 12px 0",
  '& .post-user-infobar': {
    marginBottom:'4px'
  },
  '& .post-content-section': {
    marginBottom:'8px',
    whiteSpae:'pre-wrap'
  },
  '& .post-image-preview': {
    marginBottom:'8px',
    padding:'0 16px'
  },

});

const StreamPost = ({ userInfo, timestamp, postContent,postImages }: IStreamPostType) => {
  return (
    <StyledStreamsWrapper className={`${postImages.length?'row-span-2 w-full':'w-full'}`}>
      <Box className="post-user-infobar">
        <SocialUserInfoAvatar
          socialIcon={userInfo.socialIcon}
          userAvatar={userInfo.userAvatar}
          socialUserName={userInfo.userName}
          postCreateDate={timestamp}
        />
      </Box>
      <Box className="post-content-section break-words">
        {postContent}
      </Box>
      {!!postImages.length &&<Box className="post-image-preview">
        <ImageCrousel contents={postImages} />
      </Box>}
      <Box className="post-comments-section"></Box>
    </StyledStreamsWrapper>
  )
}

export default StreamPost