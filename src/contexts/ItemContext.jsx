import {createContext, useEffect, useReducer, useState} from "react";
import axios from "../utils/axios.js";
import {act} from "react-dom/test-utils";

const initialState = {
    items: [],
}

const ItemContext = createContext({
    ...initialState
})

const reducer = (state, action) => {
    switch (action.type) {
        case "GET_ITEMS":
            return {
                items: state.items = action.payload,
            };
        case "ADD_ITEMS":
            console.log(action.payload.item)
            return {
                ...state,
                items: [...state.items, action.payload.item],
            };

        case "EDIT_ITEM":
            const updatedItem = action.payload;

            const updatedItems = state.items.map((item) => {
                if (item.uuid === updatedItem.uuid) {
                    return updatedItem;
                }
                return item;
            });

            return {
                ...state,
                items: updatedItems,
            };

        case "REMOVE_ITEMS":
            return {
                ...state,
                items: state.items.filter(
                    (item) => item.uuid !== action.payload
                ),
            };

        default:
            return state;
    }
};

function ItemProvider({children}) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [success, setSuccess ] = useState(null)

    useEffect( () => {
         getItems()
    }, [dispatch]);


    const getItems = (page = 1, count = 10) => {
        return axios.get(`/items?page=${page}&count=${count}`).then(response => {
            dispatch({
                type: 'GET_ITEMS',
                payload: response.data.items
            })
        })
    }

    const createItem = (name, description) => {
        return axios.post('/items', {name, description}).then(response => {
            setSuccess('Item successfully created')
            dispatch({
                type: 'ADD_ITEMS',
                payload: response.data
            })
        })
    }

    const getItemByUuid = (uuid) => {
        return axios.get(`/item/${uuid}`)
    }

    const updateItem = (uuid) => {
        return axios.put(`/items/${uuid}`).then(response => {
            dispatch({
                type: 'EDIT_ITEMS',
                payload: response.data
            })
        })
    }

    const deleteItem = (uuid) => {
        return axios.delete(`/items/${uuid}`).then(response => {
            dispatch({
                type: 'REMOVE_ITEMS',
                payload: uuid
            })
        })
    }

    const items = { ...state.items}


    return (
        <ItemContext.Provider value={{
            items,
            success,
            getItems,
            createItem,
            getItemByUuid,
            updateItem,
            deleteItem
        }}>
            {children}
        </ItemContext.Provider>
    )
}

export { ItemContext, ItemProvider };
