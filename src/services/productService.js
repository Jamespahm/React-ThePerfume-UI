import * as request from '~/utils/request';

export const product = async () => {
    try {
        const res = await request.get(`perfume`);
        return res.data;
    } catch (error) {
        console.log('error');
    }
};
