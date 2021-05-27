import {OPEN_TASK, COMPLETE_TASK, DELETE_TASK} from '../constants/API.constants'

const API = {
    toggle: (_id, completed) => {
        let endpoint = completed ? `${OPEN_TASK}${_id}` : `${COMPLETE_TASK}${_id}`
        return fetch(endpoint, {method: 'PUT'})
    },
    delete: _id => {
        let endpoint = `${DELETE_TASK}${_id}`
        return fetch(endpoint, {method: 'DELETE'})
    }
}

export default API;