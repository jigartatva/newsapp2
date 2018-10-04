import { all, fork } from 'redux-saga/effects';
import appSaga from './app';
import newsSaga from './newsSaga';

const forkList = (sagasList) => sagasList.map(saga => fork(saga));

export default function* rootSaga() {
    yield all([
        ...forkList(appSaga),
        ...forkList(newsSaga)
    ])
}