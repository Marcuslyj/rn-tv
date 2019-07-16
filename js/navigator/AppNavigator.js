import React from 'react'
import {
    createStackNavigator,
    createSwitchNavigator
} from 'react-navigation'

import HomePage from '../page/HomePage'
import WelcomePage from '../page/WelcomePage'

import { connect } from 'react-redux'
import { createReactNavigationReduxMiddleware, reduxifyNavigator } from 'react-navigation-redux-helpers'
import SimplePage from '../page/SimplePage';

const InitNavigator = createStackNavigator({
    WelcomePage: {
        screen: WelcomePage,
        navigationOptions: {
            header: null
        }
    }
})

const MainNavigator = createStackNavigator({
    HomePage: {
        screen: HomePage,
        navigationOptions: {
            header: null
        }
    },
    SimplePage: {
        screen: SimplePage,
        navigationOptions: {
            header: null
        }
    }
})

// console.log('====================================');
// console.log(SimplePage);
// console.log('====================================');

export const rootCom = 'Init'   //设置根路由

// 连接两个导航器
export const RootNavigator = createSwitchNavigator(
    {
        Init: InitNavigator,
        Main: MainNavigator
    },
    {
        navigationOptions: {
            header: null
        }
    }
)

export const middleware = createReactNavigationReduxMiddleware(
    'root',
    state => state.nav
)

const AppWithNavigationState = reduxifyNavigator(RootNavigator, 'root')

const mapStateToProps = state => ({
    state: state.nav
})

export default connect(mapStateToProps)(AppWithNavigationState)