import { configureStore } from '@reduxjs/toolkit';
import UserSlice from './features/User/UserSlice';
import LadenSlice from './features/Laden/LadenSlice';
import WeeksDaysSlice from './features/Laden/WeekDaysSlice';
import AppoSlice from './features/Laden/AppoSlice';
import CloseDaysSlice from './features/Laden/CloseDaysSlice';

const store: any = configureStore({
  reducer: {
    user: UserSlice,
    laden: LadenSlice,
    weeksDays: WeeksDaysSlice,
    appo: AppoSlice,
    closeDays: CloseDaysSlice,
    // Laden ->
    // - LadenProfiles
    // - LadenProfile
    // - APPOs
    // - WEEKDAYS -> von Laden
    //  - Close Days
    //  - Product List
    //  - POSTs !
  },
});
export default store;
