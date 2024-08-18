import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: "users",
    initialState: { name: "", users: [], loading : false , toggle : false , userInfo: { token: null, tickets: null, role: null, userId: null } },
    reducers: {

        setUserInfo: (state, action) => {
            const { role, token } = action.payload;
            state.token = token;
            state.role = role;

        },

        setUserTickets: (state, action) => {
            const { raisedBy, allTickets } = action.payload;
            state.tickets = allTickets;
            state.userId = raisedBy
        },

        setUsers: (state, action) => {
          state.users = action.payload.users;
        },

        setLoading : (state , actions) => {
            state.loading = actions.payload;
        },
        setToggle : (state , actions) => {
            state.toggle = actions.payload;
        },


        logoutUser: (state, action) => {
            state.token = null;
            state.userId = null;
            state.tickets = [];
            state.role = null,
            state.users = [],
            state.loading = false,
            state.toggle = false
        },
    }
});

export const { setUserInfo, logoutUser, setUserTickets , setUsers , setLoading , setToggle } = userSlice.actions;
export default userSlice.reducer;