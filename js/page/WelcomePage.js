
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import NavigationUtil from '../navigator/NavigationUtil'
// import SplashScreen from 'react-native-splash-screen'
import Video from 'react-native-video';


export default class WelcomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            readyToPlay: false,
        }
    }
    switchToMain() {
        const { navigation } = this.props

        NavigationUtil.resetToHomePage({
            navigation
        })
    }
    // componentDidMount() {
    //     this.timer = setTimeout(() => {
    //         // SplashScreen.hide();

    //         const { navigation } = this.props

    //         NavigationUtil.resetToHomePage({
    //             navigation
    //         })
    //     }, 3000)
    // }
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer)
    }
    render() {
        return (
            <View style={styles.container}>
                {/* <Text style={styles.welcome}>WelcomePage</Text> */}
                {/* <Image source={require('../res/startups/background.jpg')}/> */}
                <ImageBackground source={require('../res/startups/background.jpg')} style={{ width: '100%', height: '100%' }}>
                    {/* https://ad-clarins.tvflnet.com/clarins/attaches/clarins.mp4 */}
                    <Video source={{ uri: "https://ad-clarins.tvflnet.com/clarins/attaches/clarins.mp4" }}   // Can be a URL or a local file.
                        ref={ref => {
                            this.player = ref
                        }}                                      // Store reference
                        // onBuffer={this.onBuffer}                // Callback when remote video is buffering
                        onError={() => { this.switchToMain() }}
                        onEnd={() => { this.switchToMain() }}
                        onReadyForDisplay={() => {
                            this.setState({
                                readyToPlay: true
                            })
                        }}       // Callback when video cannot be loaded
                        // 可以播放时才显示
                        style={[styles.backgroundVideo, this.state.readyToPlay ? null : styles.hide]}
                    />

                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    backgroundVideo: {
        position: 'absolute',
        top: '22%',
        left: '40%',
        bottom: '22%',
        right: '3%',
    },
    hide: {
        opacity: 0
    }
});
