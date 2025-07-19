import { TZDate } from '@date-fns/tz';

export const getCurrentDt = () => new TZDate(new Date(), 'Asia/Tokyo');
