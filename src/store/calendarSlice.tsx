import {createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { gapi } from "gapi-script";

interface InitialState {
    calendarEvents: Array<any>
}

const INITIAL_STATE:InitialState = {
    calendarEvents: []
};

const sortByDate = (a:any, b:any) => {
  console.log(a);
  console.log(b);
  var dateA = new Date(a.start.dateTime).getTime();
  var dateB = new Date(b.start.dateTime).getTime();
  return dateB > dateA ? 1 : -1;
};

// Get calendar list -Thunk
export const getCalendarEvents = createAsyncThunk(
  'calendar/getCalendarEvents',
  async () => {
    let calendarItems:Array<any> = [];
    const events = await gapi.client.calendar.events.list({
        calendarId: 'primary',
        timeMin: new Date('2022-01-01').toISOString(),
        showDeleted: false,
        // singleEvents: true,
        // orderBy: 'startTime'
      })
    calendarItems = events.result.items.sort(sortByDate)
    return calendarItems;
  }
)

export const calendarSlice = createSlice({
    name: 'calendarSlice',
    initialState: INITIAL_STATE,
    reducers: {
        updateCalendarEventsReducer: (state, action) => {
            console.log('updateCalendarEventsReducer', action.payload);
            state.calendarEvents = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getCalendarEvents.fulfilled, (state, action) => {
            state.calendarEvents = action.payload;
        });
    },
  });

export const { updateCalendarEventsReducer } = calendarSlice.actions;  

export default calendarSlice.reducer;