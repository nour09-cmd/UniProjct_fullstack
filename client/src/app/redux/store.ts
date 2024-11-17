import { configureStore } from '@reduxjs/toolkit';
import UserSlice from './features/User/UserSlice';
import LadenSlice from './features/Laden/LadenSlice';

const store: any = configureStore({
  reducer: {
    user: UserSlice,
    laden: LadenSlice,
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
