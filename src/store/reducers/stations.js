import * as actionTypes from '../actions/actionTypes';
import { UpdateObject } from '../utility';

const initialState = {
    schedule: [],
    loading: false,
    book: false,
    stations: 1,
    booked: [],
    // checkLogin: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        // SCHEDULE
        case actionTypes.FETCH_SCHEDULE_START:
           return UpdateObject(state, { loading: true });
        case actionTypes.FETCH_SCHEDULE_SUCCESS:
            return UpdateObject(state, {
                schedule: action.fetchedSchedule,
                loading: false,
                book: false,
            })
        case actionTypes.FETCH_SCHEDULE_ERROR:
            return UpdateObject(state, {
                loading: false
            })

        case actionTypes.UPDATE_TIME_ID:
            const timeIndex = state.schedule.findIndex(s => {
                return s.time_id == action.time.time_id
            }) 
            if(timeIndex >= 0){
                const timeUpdate = [...state.schedule];
                timeUpdate[timeIndex].count_seat = action.time.count_seat;
                return  UpdateObject(state ,{schedule : timeUpdate} );
            }
           
        //  BOOK  
        case actionTypes.BOOK_ERROR:
            return UpdateObject(state, {
                loading: false,
            })
        case actionTypes.BOOK_SUCCESS:
            //const newBook = UpdateObject(action.bookData, { id: action.bookId })
            return UpdateObject(state, {
                // schedule: action.fetchedSchedule,
                loading: false,
                book: true,
                // booked: state.booked.concat(newBook),
            })
        case actionTypes.BOOK_START:
            return UpdateObject(state, { loading: true, book: true });

        // INITIALBOOKED
        case actionTypes.INITIALBOOKED_ERROR:
            return UpdateObject(state, {
                loading: false
            })
        case actionTypes.INITIALBOOKED_SUCCESS:
            return UpdateObject(state, {
                booked: action.initailbooked,
                loading: false,
                book: false,
                stations: action.port,
            })
        case actionTypes.INITIALBOOKED_START:
            return UpdateObject(state, { 
                loading: true,
                book: false,
             });
        //REFESH 
        case actionTypes.REFESH_STATION:
            return UpdateObject(state, { refeshLogin: !(state.refeshLogin) });
        //CANCLEBOOK
        case actionTypes.CANCLEBOOK_START:
            return UpdateObject(state, { loading: true });
        case actionTypes.CANCLEBOOK_SUCCESS:
            return UpdateObject(state, { 
                loading: false,
                book: true,
            });
        case actionTypes.CANCLEBOOK_ERROR:
            return UpdateObject(state, { loading: false });
       
        default:
            return state;
    }
}

export default reducer;