import { requestGet, requestPost } from './request';

export const apiPostRegister = (payload) => requestPost('/user/register', payload);
export const apiPostLogin = (payload) => requestPost('/user/send-verification-code', payload);
export const apiPostLoginVerify = (payload) => requestPost('/user/validate-code', payload);
export const apiPostResetPasswordRequest = (payload) => requestPost('/user/reset-password-request', payload);
export const apiPostResetPassword = (payload) => requestPost('/user/reset-password', payload);

export const apiGetUserInfo = (token) => requestGet('/user/info', {}, false, token);

export const apiGetHomeBanner = () => requestGet(`/home/banner`);
export const apiGetHomeAD = () => requestGet(`/home/home-ad`);
export const apiGetHomeEvent = () => requestGet(`/home/event`);
export const apiGetHomeEventDetail = (id) => requestGet(`/home/event/${id}`);
export const apiGetHomeEventSearch = () => requestGet(`/home/event/search`);


export const apiGetEvents = () => requestGet(`/event`);
export const apiGetEventDetail = (id) => requestGet(`/event/${id}`);