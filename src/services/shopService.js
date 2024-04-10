import * as request from '~/utils/request';

export const shop = async (q, type = 'less') => {
    try {
        const res = await request.get(`perfume`);
        return res.data;
    } catch (error) {
        console.log('error');
    }
};
