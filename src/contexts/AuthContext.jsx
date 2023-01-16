import {createContext, useReducer, useState} from "react";
import axios from '../utils/axios';

const initialState = {
    isAuthenticated: false,
    isInitialized: false,
    user: JSON.parse(localStorage.getItem('user')) ?? null,
    errorBag: null,
};
const reducer = (state, action) => {
    const { isAuthenticated, user, errorBag } = action.payload;
    return {
        ...state,
        isAuthenticated,
        isInitialized: true,
        isEmailVerified: user?.emailVerified || false,
        user,
        errorBag,
    };
};

const AuthContext = createContext({
    ...initialState,
    login: () => Promise.resolve(),
    register: () => Promise.resolve(),
    logout: () => Promise.resolve(),
});

function AuthProvider({children}) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [ loadingState, setLoadingState] = useState(false);
    const [errorBag, setErrorBag ] = useState(null)

    const login =  (email, password) => {
        setLoadingState(true)
        axios.post('/tokens', {
            email: email,
            password: password
        }).then(response => {
            localStorage.setItem("user", JSON.stringify(response.data));
            setLoadingState(false)
            dispatch({
                type: 'INITIALISE',
                payload: { isAuthenticated: true, user: response.data.user }
            });
            location.href = '/dashboard'
        }).catch(error => {
            setLoadingState(false)
            setErrorBag(error.response.data)
            dispatch({
                type: 'INITIALISE',
                payload: { errorBag }
            });
        })
    }

    const register =async (first_name, last_name, email, password) => {
        setLoadingState(true)
        return await axios.post('/me', {
            first_name,
            last_name,
            email: email,
            password: password,
        }).then(response => {
            setLoadingState(false)
            localStorage.setItem("user", JSON.stringify(response.data));
            window.location.href = '/dashboard'
        }).catch(error => {
            setLoadingState(false)
            setErrorBag(error.response.data)
            dispatch({
                type: 'INITIALISE',
                payload: { errorBag }
            });
        })
    }

    const logout = () => {
        localStorage.removeItem("user")
    }

    const resendVerificationEmail = async () => {
        return await axios.post('/me/verification-email/send')
    }

    const emailVerify = (token) => {
         return axios.post('/me/verify', {token: token}).then(response => {
             localStorage.setItem("user", JSON.stringify(response.data));
         })
    }

    const auth = { ...state.user };

    return (
        <AuthContext.Provider value={{
            ...auth,
            state,
            errorBag,
            login,
            register,
            logout,
            resendVerificationEmail,
            emailVerify,
            loadingState
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider };
