const groupReducer = (state = {}, { type, group }) => {
    switch(type) {
        case 'SIGN-IN':
            return {
                ...state,
                group
            }
        case 'SIGN-OUT':
            return {
                group: undefined
            }
        default:
            return state;
    }
}

export default groupReducer;