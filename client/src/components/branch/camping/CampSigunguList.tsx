
import React, { useEffect } from 'react';
import CampingList from '~/components/branch/camping/CampingList'
import { getCampData } from '~/store/camp';
import { useDispatch, useSelector } from 'react-redux';


function CampSigunguList({ navigation, route }: any) {
  const dispatch = useDispatch();
  const { sort, filter, limit, page } = useSelector(
    (state: any) => ({
      sort: state.camp.param.sort,
      filter: state.camp.param.filter,
      limit: state.camp.param.limit,
      page: state.camp.page,
    })
  );
  const campData = useSelector((state: any) => state.camp.camp);

  useEffect(() => {
    onGetCamp(true);
    
  }, [])

  const onGetCamp = async (refresh = false) => {
    try {
      const params: any = {
        sigunguName: route.params.sigunguNm,
        filter: JSON.stringify(filter),
        sort: JSON.stringify(sort),
        offset: 0,
        limit: limit,
        refresh: refresh
      };

      if (refresh) {
        // 처음부터 조회
        params.refresh = true;
      } else {
        // 이어서 조회
        params.offset = limit * page;
      }

      await dispatch(getCampData(params));
    } catch (error) {
      console.log('Target onGetTarget', error);
    }
  };
  return (
    <CampingList data={campData} noMap={true} infinitScroll={() => onGetCamp(false)} />
  );
};



export default CampSigunguList;