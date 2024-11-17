import { configureStore } from '@reduxjs/toolkit';
import UserSlice from './features/User/UserSlice';
const store: any = configureStore({
  reducer: {
    user: UserSlice,

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
