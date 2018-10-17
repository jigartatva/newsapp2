import { all, fork } from 'redux-saga/effects';
import newsSaga from './NewsSaga';

const forkList = (sagasList) => sagasList.map(saga => fork(saga));

export default function* rootSaga() {
    yield all([
        ...forkList(newsSaga)
    ])
}