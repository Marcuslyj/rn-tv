import { combineReducers } from 'redux'
import { rootCom, RootNavigator } from '../navigator/AppNavigator'

// 指定默认state
const navState = RootNavigator.router.getStateForAction(RootNavigator.router.getActionForPathAndParams(rootCom))

// 创建自己的navigation reducer
const navReducer = (state = navState, action) => {
    const nextSate = RootNavigator.router.getStateForAction(action, state)
    return nextSate || state
}

// 合并reducer
const index = combineReducers({
    nav: navReducer
})

export default index












