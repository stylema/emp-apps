import { put, takeEvery, call, takeLatest, race } from 'redux-saga/effects'
import { requestCode } from '@/utils/varbile'
import * as SAGA from '@/redux/constants/sagaType'
import { getAccessMenuList, getAccessMenu, userList, userInfo } from '@/api/login'
import { getMenuTree, getMenuList, getUserList, getUserInfo, loadingMenuTree, loadingUserInfo } from '@/redux/action/user'
import Tools from '@/utils'

const tools = new Tools();

export const effects = {
  *getMenTree() {
    try {
      const res = yield call(getAccessMenuList);
      // console.log('++++++_--------+++++++++');
      // console.log(res);
      // const ch = [
      //   {
      //     createTime: 1619000386000,
      //     icon: null,
      //     id: 175,
      //     pid: 75,
      //     title: "导出选择项2",
      //     url: "/excel/select-export-excel/datav",
      //   }
      // ]
      // res.data[1].children[1].children=ch;
      yield put(loadingMenuTree(false));

      if (res.code === requestCode.successCode) {
        yield race([put(loadingMenuTree(true)), put(getMenuTree(res.data))])
      }

    } catch (error) {
      yield put(getMenuTree([]));
    }
  },

  *getMenuList({ payload }) {
    try {
      const res = yield call(getAccessMenu, payload);

      let { list = [], total = 0 } = res.data;

      if (res.code === requestCode.successCode && list.length) {
        list = list.map((item) => Object.assign({}, item, { createTime: tools.formatDate(item.createTime, 'YYYY-MM-DD hh:mm:ss') }));
      }

      yield put(getMenuList({ list, total }));

    } catch (error) {
      yield put(getMenuList({ list: [], total: 0 }));
    }
  },

  *getUserData({ payload }) {
    try {
      const res = yield call(userList, payload);

      res.code === requestCode.successCode && (yield put(getUserList(res.data)));
    } catch (error) {
      yield put(getUserList([]));
    }
  },

  *getUserInfoData() {
    try {
      const res = yield call(userInfo);

      yield put(loadingUserInfo(false));

      res.code === requestCode.successCode && (yield race([put(loadingUserInfo(true)), put(getUserInfo(res.data))]));
    } catch (error) {
      yield put(getUserInfo({}));
    }
  },
}
export default function* users() {
  yield takeEvery(SAGA.SAGA_GETMENUTREE, effects.getMenTree);
  yield takeLatest(SAGA.SAGA_GETMENULIST, effects.getMenuList);
  yield takeLatest(SAGA.SAGA_GET_USER_LIST, effects.getUserData);
  yield takeEvery(SAGA.SAGA_GET_USER_INFO, effects.getUserInfoData);
}
