import {OPEN_TASK, COMPLETE_TASK, DELETE_TASK, FETCH_TASKS} from '../constants/API.constants'

const API = {
    fetchAll: () => {
        return fetch(FETCH_TASKS, {method: 'GET'})
                .then(res => res.json())
    },
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