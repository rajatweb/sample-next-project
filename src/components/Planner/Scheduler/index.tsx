import { Moment } from 'moment';
import React from 'react'
import WeekScheduler from './WeekScheduler';
import MonthScheduler from './MonthScheduler';
import { PostPreviewContainer } from './Scheduler.style';
import UiIconButton from '@/components/UiComponents/Button/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import moment from 'moment';
import { Box, ClickAwayListener, Typography } from '@mui/material';
import DraftsIcon from '@mui/icons-material/Drafts';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { ImgType, Post } from '@/utils/commonTypes';
import { useLazyGetContentByIdQuery } from '@/lib/api/coreApi';
import UiLoader from '@/components/UiComponents/UiLoader';
import InstagramPostPreview from '@/components/Create/InstagramPostPreview';
import { useAppSelector } from '@/lib/hooks';

type IProps = {
    parentRef:React.MutableRefObject<HTMLDivElement | null>
};


const Scheduler = ({ parentRef }: IProps) => {

    const [previewPost, setPreviewPosts] = React.useState<Post[]>([]);
    const [isLoading, setLoading] = React.useState<boolean>(false);
    const [previewContent, setPreviewContent] = React.useState<{
        userName: string;
        content: string;
        imageFiles: Array<ImgType>
    } | null>(null);
    const [getPostById, { isLoading: isPostLoading }] = useLazyGetContentByIdQuery();


    const calendarType = useAppSelector(state =>state.filterToolbar.calendarType);
    const selectedDate = useAppSelector(state =>state.filterToolbar.selectedDate);

    const onPreviewHandler = (posts: Post[]) => {
        setPreviewPosts(posts);
        parentRef?.current && parentRef.current.scrollTo({ top:parentRef.current.offsetTop-100,behavior: "smooth" });
    }

    const socialPreviewHandler = async (post: Post) => {
        setLoading(true);
        getPostById(post.id.toString()).unwrap().then((response) => {
            setLoading(false);
            const payload = {
                content: response.message,
                imageFiles: response.media.map((item) => ({ imgFile: item, id: +response.id })) || [] as Array<ImgType>,
                userName: 'abc@gmail.com'
            }
            setPreviewContent(payload)
        }).catch(() => {
            setLoading(false);
        })

    }


    return (<ClickAwayListener onClickAway={() => onPreviewHandler([])}>
        <div className='w-full relative'>
            <div>{calendarType === 'week' ?
                <WeekScheduler
                    setPreviewPosts={onPreviewHandler}
                    selectedDate={selectedDate}
                /> :
                <MonthScheduler
                    setPreviewPosts={onPreviewHandler}
                    selectedDate={selectedDate}
                />}</div>
            {!!previewPost.length && <PostPreviewContainer className="absolute min-w-64 min-h-full z-10 top-px right-px bg-slate-400">
                <div className="preview-header">
                    <div className='preview-header-left'>
                    {previewContent ?<UiIconButton onClick={()=>setPreviewContent(null)}><ArrowBackIosIcon/></UiIconButton>:<>
                        <Typography>{moment(previewPost[0].timestamp).format('ddd')}</Typography>
                        <Typography>{moment(previewPost[0].timestamp).format('DD MMM')}</Typography>
                    </>}
                    </div>
                    <div className='preview-header-right'><UiIconButton onClick={() =>{
                        setPreviewContent(null);
                        setPreviewPosts([]);
                    }}><CloseIcon /></UiIconButton></div>
                </div>
                {isPostLoading || isLoading ? <UiLoader /> :
                    <div className='preview-content flex flex-col px-2.5 pt-2 overflow-y-auto'>
                        {previewContent ?
                            <InstagramPostPreview selectedUser={previewContent} /> : previewPost.map((item, key) => {

                                return <div key={key} className='preview-content-item flex-auto flex' onClick={() => socialPreviewHandler(item)}>
                                    <Box className="thumbnail-container">
                                        <img src={item.img} />
                                    </Box>
                                    <Box className="preview-post-content flex flex-col gap-1">
                                        <Typography> {
                                            item.account.platform === 'facebook' && <FacebookIcon color={'primary'} /> ||
                                            item.account.platform === 'instagram' && <InstagramIcon color={'error'} /> ||
                                            item.account.platform === 'linkedin' && <LinkedInIcon color={'primary'} />
                                        }{` ${item.account.userId}`}</Typography>
                                        <Box className="post-content">{item.content}</Box>
                                        <Box className="flex justify-between pr-2 items-center">
                                            {item.status === 'draft' && <Typography className='cursor-pointer flex pl-1 gap-2 items-center justify-center'>
                                                <DraftsIcon fontSize='small' color='warning' />
                                                <span className='post-type'> Drafts</span>
                                            </Typography>}
                                            {item.status === 'published' && <Typography className='cursor-pointer flex pl-1 gap-2 items-center justify-center'>
                                                <CheckBoxIcon fontSize='small' color='success' />
                                                <span className='post-type'>Published</span>
                                            </Typography>}
                                            {item.status === 'scheduled' && <Typography className='cursor-pointer flex pl-1 gap-2 items-center justify-center'>
                                                <AvTimerIcon fontSize='small' color="secondary" />
                                                <span className='post-type'>Scheduled </span>
                                            </Typography>}
                                            <Typography className=''>{moment(item.timestamp).format('hh:mm A')}</Typography>
                                        </Box>
                                    </Box>
                                </div>
                            })}
                    </div>}
            </PostPreviewContainer>}
        </div>
    </ClickAwayListener>);
}

export default Scheduler;