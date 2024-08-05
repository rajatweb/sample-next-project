import { Post, IStatusType, PostType, IUserType } from '@/utils/commonTypes';
import { IStreamPostType } from '@/utils/steamTypes';
import { faker } from '@faker-js/faker';
import moment from 'moment';

const statusType = ['draft', 'published', 'scheduled', 'failed'];
const platform = ['facebook', 'instagram', 'linkedin'];
const socialAccounts = platform.map(() => faker.internet.email())

export const getPosts = (fromDate: string, endDate: string): Post[] => {
    const records = faker.datatype.array(100);

    return records.map(() => ({
        id: Date.now(),
        img: faker.image.url(),
        account: {
            id: String(Math.floor(Math.random() * 3)),
            userId: socialAccounts[Math.floor(Math.random() * 3)],
            platform: platform[Math.floor(Math.random() * 3)]
        },
        content: faker.person.jobDescriptor(),
        timestamp: moment(faker.date.between({ from: fromDate, to: endDate })).format(),
        status: statusType[Math.floor(Math.random() * 4)] as IStatusType,
        socialAccount: platform[Math.floor(Math.random() * 3)]
    }))

}

export const getStreamsPosts = (fromDate: string, endDate: string): IStreamPostType[] => {

    const records = faker.datatype.array(100);

    return records.map((item, key) => ({
        id: Date.now(),
        timestamp: moment(faker.date.between({ from: fromDate, to: endDate })).format(),
        postContent: faker.random.alpha(100),
        postImages: faker.datatype.array(key % 3).map(() => faker.image.url()),
        youLike: !!(key % 2),
        userInfo: {
            id: Date.now(),
            platformName: platform[Math.floor(Math.random() * 3)],
            socialIcon: platform[Math.floor(Math.random() * 3)],
            userAvatar: !!(key % 2) ? faker.image.url() : '',
            userName: !!(key % 2) ? faker.person.fullName() : faker.person.firstName()
        },
        postComments: faker.datatype.array(key % 3).map(() => ({
            id: Date.now(),
            userInfo: {
                id: Date.now(),
                platformName: platform[Math.floor(Math.random() * 3)],
                socialIcon: platform[Math.floor(Math.random() * 3)],
                userAvatar: !!(key % 2) ? faker.image.url() : '',
                userName: !!(key % 2) ? faker.person.fullName() : faker.person.firstName()
            },
            comment: faker.random.alpha(100),
            replies: faker.datatype.array(key % 3).map(() => ({
                id: Date.now(),
                content: faker.random.alpha(100),
                userInfo: {
                    id: Date.now(),
                    platformName: platform[Math.floor(Math.random() * 3)],
                    socialIcon: platform[Math.floor(Math.random() * 3)],
                    userAvatar: !!(key % 2) ? faker.image.url() : '',
                    userName: !!(key % 2) ? faker.person.fullName() : faker.person.firstName()
                },
                youLike: !!(key % 2),
                timestamp: moment(faker.date.between({ from: fromDate, to: endDate })).format()
            })),
            youLike: !!(key % 2),
            timestamp: moment(faker.date.between({ from: fromDate, to: endDate })).format()
        }))
    }));
}

export const getContent = (id: string) => {
    return {
        id,
        platform: 'instagram',
        status: 'published',
        message: 'abc #abc',
        media: Array.from([1, 2, 3], () => faker.image.url()),
        contentType: 'post'
    } as PostType;
}

export const getUser = (id: string) => {
    return {
        id,
        userName: faker.internet.email(),
        socialAccounts: socialAccounts.map((item, key) => ({
            id: String(key + 1),
            platform: platform[key],
            name: item
        }))
    } as IUserType;
}

export const getTeams = () => {

    return Array.from([1, 2, 3], (item) => ({ id: String(item), name: faker.person.jobArea() }));

};