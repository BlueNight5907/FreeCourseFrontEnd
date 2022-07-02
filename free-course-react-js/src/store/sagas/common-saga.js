import { take, call, fork } from "redux-saga/effects";
import { getAccountInfor } from "services/api/accountAPI";
import { GET_ACCOUNT_INFORMATION } from "store/types/data-types/common-types";

// Get teacher infor
function* getAccountInforWorker(accountId, callback) {
  try {
    const accountInformation = yield call(getAccountInfor, accountId);
    callback(accountInformation);
  } catch (error) {
    console.log(error);
  }
}

function* watchGetAccountInfor() {
  while (true) {
    const { accountId, callback } = yield take(GET_ACCOUNT_INFORMATION);
    yield fork(getAccountInforWorker, accountId, callback);
  }
}

const commonSagaList = [fork(watchGetAccountInfor)];
export default commonSagaList;
