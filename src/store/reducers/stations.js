import * as actionTypes from '../actions/actionTypes';
import { UpdateObject } from '../utility';

const initialState = {
    schedule: [],
    loading: false,
    book: false,
    stations: 1,
    booked: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        
        case actionTypes.FETCH_SCHEDULE_START:
            return UpdateObject(state, { loading: true });

        case actionTypes.FETCH_SCHEDULE_SUCCESS:
            return UpdateObject(state, {
                schedule: action.fetchedSchedule,
                loading: false
            })

        case actionTypes.FETCH_SCHEDULE_ERROR:
            return UpdateObject(state, {
                loading: false
            })

        case actionTypes.BOOK_ERROR:
            return UpdateObject(state, {
                loading: false
            })

        case actionTypes.BOOK_SUCCESS:
            const newBook = UpdateObject(action.bookData, { id: action.bookId })
            return UpdateObject(state, {
                schedule: action.fetchedSchedule,
                loading: false,
                book: true,
                booked: state.booked.concat(newBook),
            })

        case actionTypes.BOOK_START:
            return UpdateObject(state, { loading: true });

        default:
            return state;
    }
}

export default reducer;