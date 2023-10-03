export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
}

type ActionsType = ReturnType<typeof setAppStatus>
type AppStateType = typeof initialState

export const appReducer = (state: AppStateType = initialState, action: ActionsType): AppStateType => {
    switch (action.type) {
        case 'APP/STATUS':
            return {
                ...state,
                status: action.status
            }
        default:
            return state
    }
}

export const setAppStatus = (status: RequestStatusType) => ({
    type: "APP/STATUS" as const,
    status,
})