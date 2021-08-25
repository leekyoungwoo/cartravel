import { apiUrl, execUrl } from '~/utils/commonValues';
import { actionFormat, getFollowOrderArray } from '~/utils/commonFunctions';

// Action Types
const SET_INITIAL = 'camp/SET_INITIAL';
const GET_CAMP = 'camp/GET_CAMP';
const GET_ADMIN = 'camp/GET_ADMIN';
const GET_SIGINGU = 'camp/GET_SIGINGU';
const GET_CAMPLIST = 'camp/GET_CAMPLIST';
const GET_NEWS = 'camp/GET_NEWS';

// Actions
export const getCampList = (params: { [key: string]: string }) =>
  actionFormat(GET_CAMP, params, 'get', `${apiUrl}Camp`)
export const getAdminList = (params: { [key: string]: string } = {}) =>
  actionFormat(GET_ADMIN, { ...params, zoom: 8 }, 'get', `${apiUrl}Camp`)
export const getSigunguList = (params: { [key: string]: string } = {}) =>
  actionFormat(GET_SIGINGU, { ...params, zoom: 9 }, 'get', `${apiUrl}Camp`)
export const getCampData = (params: { [key: string]: string }) =>
  actionFormat(GET_CAMPLIST, params, 'get', `${apiUrl}Camp`)
export const getNewsData = (params: { [key: string]: string }) =>
  actionFormat(GET_NEWS, params, 'get', `${apiUrl}Camp`)

// initial state
interface stateType {
  data: Array<any>;
  admin: Array<any>;
  sigungu: Array<any>;
  camp: Array<any>;
  news: Array<any>;
  param: { [key: string]: any };
  needReload: boolean;
  page: number,
  totalPages: number;
  totalCount: number;
}

const initialState: stateType = {
  data: [],
  admin: [],
  sigungu: [],
  camp: [],
  news: [],
  param: {
    filter: {},
    sort: [{ field: 'firstImageUrl', order: 'DESC' }],
    limit: 10,
  },
  needReload: false,
  page: 1,
  totalPages: 0,
  totalCount: 0,
};

// Reducers
export default function (state: { [key: string]: any } = initialState, action: any) {
  switch (action.type) {
    case SET_INITIAL:
      return initialState;
    case GET_CAMP:
      if (action.payload) {
        const { data } = action.payload;
        if (data == 'unexpected end of stream') state.data = state.data
        else state.data = data.list;
        
      }
      return state;
    case GET_ADMIN:
      if (action.payload) {
        const { data } = action.payload;
        state.admin = data.list;
      }
      return state;
    case GET_SIGINGU:
      if (action.payload) {
        const { data } = action.payload;
        state.sigungu = data.list;
      }
      return state;
    case GET_NEWS:
      if (action.payload) {
        const { data } = action.payload;
        state.news = data.list;
      }
      return state;

    case GET_CAMPLIST:
      if (action.payload) {
        const { data } = action.payload;
        const { offset, limit, refresh } = action.payload.config.params;
        const totalCount = data.list.length > 0 ? data.list[0].rnum + offset : 0;
        const totalPages = Math.ceil(totalCount / limit);

        let curPage = 1;
        let curDataList: any = [];

        if ( data.list && data.list.length > 0) {

          if (refresh) {
            curDataList = data.list;
          } else {
            curPage = state.page + 1;
            curDataList = state.camp.concat(data.list);
          }
          
          state.totalPages = totalPages;
          state.totalCount = totalCount;
          state.camp = curDataList;
          state.page = curPage;
          state.needReload = false;
        } else {
          state.totalPages = 0;
          state.totalCount = 0;
        }

      }
      return state;
    default:
      return state;
  }
}
