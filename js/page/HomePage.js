
import React, { Component } from 'react';
import { Animated, Easing, View, TouchableOpacity, Image, StyleSheet, Dimensions, Text, Button, Alert } from "react-native"
import NavigationUtil from '../navigator/NavigationUtil'
import BackPressComponent from '../common/BackPressComponent'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'

export default class HomeWrapper extends Component {
    render() {
        // 外层navigation存起来
        NavigationUtil.navigation = this.props.navigation
        return <HomePageConnect />
    }
}

class HomePage extends Component {
    // static navigationOptions = ({ navigation }) => ({
    //     title: `${navigation.state.params.nameAnimated}`,
    // })

    constructor(props) {
        super(props)
        this.backPress = new BackPressComponent({
            backPress: this.onBackPress
        })
        this.state = {
            drawData: [
                { id: 1, title: "谢谢参与", icon: require('../res/imgs/cry_coin.png'), isNull: true },
                { id: 2, title: "手机1", icon: require('../res/imgs/phone1_coin.png') },
                { id: 3, title: "+20金币", icon: require('../res/imgs/gold_coin.png') },
                { id: 4, title: "手机2", icon: require('../res/imgs/phone2_coin.png') },
                { id: 5, title: "手机50", icon: require('../res/imgs/gold_coin.png') },
                { id: 6, title: "+100金币", icon: require('../res/imgs/gold_coin.png') },
                { id: 7, title: "谢谢参与", icon: require('../res/imgs/cry_coin.png'), isNull: true },
                { id: 8, title: "手机3", icon: require('../res/imgs/phone3_coin.png') }
            ],
            isOn: false,
            rotateDeg: new Animated.Value(0),
            times: 1,

            ctrl_turnable: false
        };
    }

    // 监听返回按钮
    componentDidMount() {
        this.backPress.componentDidMount()
    }
    componentWillUnmount() {
        this.backPress.componentWillUnmount()
    }
    onBackPress = () => {
        const { dispatch, nav } = this.props
        if (nav.routes[1].index === 0) {
            return false
        }
        dispatch(NavigationActions.back())
        // 禁止按钮
        return true
    }

    rotateImg() {
        if (!this.state.isOn) {
            this.rotateImg1();
        }
    };

    rotateImg1() {
        //获取抽奖位置
        let number = Math.floor(Math.random() * 8);

        let valCtrl = (0.02 + Number((Math.random() * 0.085).toFixed(3)));
        let oneTimeRotate = (number / 8 + 3 * this.state.times + valCtrl);

        this.setState({
            isOn: true,
        });

        Animated
            .timing(this.state.rotateDeg, {
                toValue: oneTimeRotate,
                duration: 4000,
                easing: Easing.in(Easing.bezier(0.075, 0.82, 0.165, 1))
            })
            .start(() => {
                //动画结束时，会把toValue值，回调给callback
                this.state.rotateDeg.stopAnimation(() => {
                    this.changeValue(number);
                    this.setState({
                        isOn: false,
                        times: this.state.times + 1
                    });
                })
            })

            ;
    };

    changeValue = (postion) => {
        let item = this.state.drawData[postion];
        Alert.alert(
            "抽奖结果",
            item.title + (item.isNull? '':"，请及时兑奖"),
            [
                { text: "确定" }
            ],
            { cancelable: false }
        )
        // debugger
        // NavigationUtil.goPage({}, "SimplePage")
    };

    render() {
        // // 外层navigation存起来
        // NavigationUtil.navigation = this.props.navigation

        return (
            <View style={styles.container}>
                <View style={{ opacity: 0 }}>
                    <Button title="按钮" />
                </View>
                <View style={styles.turnableContainer}>
                    <Animated.View style={[styles.mainImg, {
                        transform: [{
                            rotate: this.state.rotateDeg.interpolate({
                                inputRange: [0, 3],
                                outputRange: ['0deg', '1080deg']
                            })
                        }]
                    }]}>
                        <View style={{ height: 360, width: 360, alignItems: "center" }}>
                            <Image style={{ position: "absolute", height: 360, width: 360, resizeMode: 'stretch' }} source={require('../res/imgs/circle_bg.png')} />
                            {this.state.drawData.map((one, index) => {
                                const rotateDeg = 22.5;
                                let translateX = 0;
                                let translateY = 0;
                                const rotateTemp = -rotateDeg - (index * 45);
                                const sinTemp = Math.sin(rotateDeg * Math.PI / 180) * 105;
                                const consTemp = Math.cos(rotateDeg * Math.PI / 180) * 105;
                                switch (index) {
                                    case 0:
                                        translateX = -sinTemp;
                                        translateY = -consTemp;
                                        break;
                                    case 1:
                                        translateX = -consTemp;
                                        translateY = -sinTemp;
                                        break;
                                    case 2:
                                        translateX = -consTemp;
                                        translateY = sinTemp;
                                        break;
                                    case 3:
                                        translateX = -sinTemp;
                                        translateY = consTemp;
                                        break;
                                    case 4:
                                        translateX = sinTemp;
                                        translateY = consTemp;
                                        break;
                                    case 5:
                                        translateX = consTemp;
                                        translateY = sinTemp;
                                        break;
                                    case 6:
                                        translateX = consTemp;
                                        translateY = -sinTemp;
                                        break;
                                    case 7:
                                        translateX = sinTemp;
                                        translateY = -consTemp;
                                        break;
                                    default:
                                        break
                                }
                                return (
                                    <View key={one.id} style={{ justifyContent: "center", alignItems: "center", position: "absolute", zIndex: 99, height: 70, width: 60, top: 145, transform: [{ translateX: translateX }, { translateY: translateY }, { rotateZ: `${rotateTemp}deg` }] }}>
                                        <Text style={{ fontSize: 12, color: "#74340A", fontFamily: "STYuanti-SC-Regular", marginBottom: 10 }}>{one.name}</Text>
                                        <Image style={{ width: 50, height: 50, resizeMode: "contain" }} source={one.icon} />
                                        {/* <Text>{one.id - 1}</Text> */}
                                    </View>
                                )
                            })}
                        </View >
                    </Animated.View>
                    <TouchableOpacity
                        autoFocus={true}
                        onFocus={() => {
                            this.setState({
                                ctrl_turnable: true
                            })
                        }}
                        onBlur={() => {
                            this.setState({
                                ctrl_turnable: false
                            })
                        }}
                        activeOpacity={1} onPress={() => { this.rotateImg() }} style={[styles.centerPoint, this.state.ctrl_turnable ? styles.activeCenterPoint : null]}>
                        <Image source={require('../res/imgs/point_new.png')} style={{ height: 134, width: 107, resizeMode: "stretch", position: "absolute" }} />
                        <Text style={[styles.centerText, this.state.ctrl_turnable ? styles.activeCenterText : null]}>{"开始抽奖" || "start game"}</Text>
                    </TouchableOpacity>
                </View>
            </View>

        );
    }
}

const mapStateToProps = state => ({
    nav: state.nav
})

const HomePageConnect = connect(mapStateToProps)(HomePage)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ff9800',
        alignItems: 'center',
        justifyContent: 'center'
    },
    turnableContainer: {
        width: Dimensions.get('window').width,
        height: 360,
        alignItems: 'center',
        position: 'relative'
    },
    imgPoint: {
        width: 100,
        height: 100,
    },
    activeCenterPoint: {
        transform: [{ scaleX: 1.05, scaleY: 1.05 }],
    },
    centerPoint: {
        position: 'absolute',
        left: Dimensions.get('window').width / 2 - 53,
        top: 100,
        zIndex: 100,
        height: 134,
        width: 107,
        alignItems: 'center',
        justifyContent: 'center',
    },
    centerText: {
        color: "#ffffff",
        textAlign: "center",
        fontSize: 17,
        fontWeight: 'bold',
        width: 45,
        marginTop: 20
    },
    activeCenterText: {
        fontSize: 18
    },
    mainImg: {
        width: 360,
        height: 360,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    }
});

