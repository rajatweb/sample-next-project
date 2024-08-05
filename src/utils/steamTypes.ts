type IUserInfoType = {
  id: number;
  platformName: string;
  socialIcon: string;
  userAvatar: string;
  userName: string;
}
export type IReplyType = {
  id: number;
  content: string;
  userInfo: IUserInfoType;
  timestamp: string;
  youLike: boolean;
}

export type ICommentType = {
  id: number;
  userInfo: IUserInfoType;
  comment: string;
  timestamp: string;
  youLike: boolean;
  replies: IReplyType[];
}

export type IStreamPostType = {
  id: number;
  userInfo: IUserInfoType;
  timestamp: string;
  postContent: string;
  postImages: string[];
  postComments: ICommentType[];
  youLike: boolean;
}