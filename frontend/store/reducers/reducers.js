import { useMemo } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import {
    products, 
    productsCollectionSix, 
    productsCollectionSeven, 
    productsCollectionEight, 
    productsCollectionNine, 
    productsCollectionTen, 
    productsCollectionEleven,
    productsCovid19,
    productsGrocery,
    productsElectronics,
    productsFurniture
} from '../json-data/products';

let store

import { 
    ADD_TO_CART,
    REMOVE_ITEM,
    SUB_QUANTITY,
    ADD_QUANTITY, 
    ADD_SHIPPING,
    ADD_QUANTITY_WITH_NUMBER,
    RESET_CART,
    ADD_TO_COMPARE,
    REMOVE_ITEM_FROM_COMPARE
} from '../actions/action-types/action-names'

const initialState = {
    products: products,
    productsCollectionSix: productsCollectionSix,
    productsCollectionSeven: productsCollectionSeven,
    productsCollectionEight: productsCollectionEight,
    productsCollectionNine: productsCollectionNine,
    productsCollectionTen: productsCollectionTen,
    productsCollectionEleven: productsCollectionEleven,
    productsCovid19: productsCovid19,
    productsGrocery: productsGrocery,
    productsElectronics: productsElectronics,
    productsFurniture: productsFurniture,
    addedItems:[],
    addedItemsToCompare:[],
    total: 0,
    shipping: 0
}

const reducers = (state = initialState, action) => {
   
    if(action.type === ADD_TO_CART){
        let addedItem = state.products.find(item => item.id === action.id) 
        || state.productsCollectionSix.find(item => item.id === action.id)
        || state.productsCollectionSeven.find(item => item.id === action.id)
        || state.productsCollectionEight.find(item => item.id === action.id)
        || state.productsCollectionNine.find(item => item.id === action.id)
        || state.productsCollectionTen.find(item => item.id === action.id)
        || state.productsCollectionEleven.find(item => item.id === action.id)
        || state.productsCovid19.find(item => item.id === action.id)
        || state.productsGrocery.find(item => item.id === action.id)
        || state.productsElectronics.find(item => item.id === action.id)
        || state.productsFurniture.find(item => item.id === action.id)
        //check if the action id exists in the addedItems
        let existed_item = state.addedItems.find(item => action.id === item.id)
        if(existed_item){
            addedItem.quantity += 1 
            return {
                ...state,
                total: state.total + addedItem.price 
            }
        } else {
            addedItem.quantity = 1;
            //calculating the total
            let newTotal = state.total + addedItem.price 
            
            return {
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total : newTotal
            }
            
        }
    }

    if(action.type === ADD_TO_COMPARE){
        let addedItemToCompare = state.products.find(item => item.id === action.id)
        || state.productsCollectionSix.find(item => item.id === action.id)
        || state.productsCollectionSeven.find(item => item.id === action.id)
        || state.productsCollectionEight.find(item => item.id === action.id)
        || state.productsCollectionNine.find(item => item.id === action.id)
        || state.productsCollectionTen.find(item => item.id === action.id)
        || state.productsCollectionEleven.find(item => item.id === action.id)
        || state.productsCovid19.find(item => item.id === action.id)
        || state.productsGrocery.find(item => item.id === action.id)
        || state.productsElectronics.find(item => item.id === action.id)
        || state.productsFurniture.find(item => item.id === action.id)
        
        addedItemToCompare.quantity = 1;
        
        return {
            ...state,
            addedItemsToCompare: [...state.addedItemsToCompare, addedItemToCompare]
        }
    }

    if(action.type === ADD_QUANTITY_WITH_NUMBER){
        let addedItem = state.products.find(item => item.id === action.id)
        //check if the action id exists in the addedItems
        let existed_item = state.addedItems.find(item=> action.id === item.id)
        if(existed_item)
        {
            addedItem.quantity += action.qty
            return {
                ...state,
                total: state.total + addedItem.price * action.qty
            }
        } else {
            addedItem.quantity = action.qty;
            //calculating the total
            let newTotal = state.total + addedItem.price * action.qty
            
            return {
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total : newTotal
            }
            
        }
    }

    if(action.type === REMOVE_ITEM){
        let itemToRemove = state.addedItems.find(item=> action.id === item.id)
        let new_items = state.addedItems.filter(item=> action.id !== item.id)
        
        //calculating the total
        let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity );

        return {
            ...state,
            addedItems: new_items,
            total: newTotal
        }
    }

    if(action.type === REMOVE_ITEM_FROM_COMPARE){
        let new_items = state.addedItemsToCompare.filter(item=> action.id !== item.id)
        
        return {
            ...state,
            addedItemsToCompare: new_items
        }
    }

    if(action.type === ADD_QUANTITY){
        let addedItem = state.products.find(item=> item.id === action.id)
        addedItem.quantity += 1 
        let newTotal = state.total + addedItem.price
        return {
            ...state,
            total: newTotal
        }
    }

    if(action.type === SUB_QUANTITY){  
        let addedItem = state.products.find(item=> item.id === action.id) 
        //if the qt == 0 then it should be removed
        if(addedItem.quantity === 1){
            let new_items = state.addedItems.filter(item=>item.id !== action.id)
            let newTotal = state.total - addedItem.price
            return {
                ...state,
                addedItems: new_items,
                total: newTotal
            }
        } else {
            addedItem.quantity -= 1
            let newTotal = state.total - addedItem.price
            return {
                ...state,
                total: newTotal
            }
        }
        
    }

    if(action.type === ADD_SHIPPING){
        return {
            ...state,
            shipping: state.shipping += 6
        }
    }

    if(action.type === 'SUB_SHIPPING'){
        return {
            ...state,
            shipping: state.shipping -= 6
        }
    }

    if(action.type === RESET_CART){
        return {
            ...state,
            addedItems: [],
            total: 0,
            shipping: 0
        }
    }
    
    else {
        return state
    }
}

const initStore = (preloadedState = initialState) => {
    return createStore(
        reducers,
        preloadedState,
        composeWithDevTools(applyMiddleware(thunkMiddleware))
    )
}

export const initializeStore = (preloadedState) => {
    let _store = store ?? initStore(preloadedState)
  
    // After navigating to a page with an initial Redux state, merge that state
    // with the current state in the store, and create a new store
    if (preloadedState && store) {
        _store = initStore({
            ...store.getState(),
            ...preloadedState,
        })
        // Reset the current store
        store = undefined
    }
  
    // For SSG and SSR always create a new store
    if (typeof window === 'undefined') return _store
    // Create the store once in the client
    if (!store) store = _store
  
    return _store
}

export const useStore = (initialState) => {
    const store = useMemo(() => initializeStore(initialState), [initialState])
    return store
}
  