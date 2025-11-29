import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  Easing
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient'; // Add this import

const { width, height } = Dimensions.get('window');

const FlashLoadingScreen = () => {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const flashAnim = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const dot1Anim = useRef(new Animated.Value(0)).current;
  const dot2Anim = useRef(new Animated.Value(0)).current;
  const dot3Anim = useRef(new Animated.Value(0)).current;
  const particleAnims = useRef(
    Array.from({ length: 15 }, () => ({
      y: new Animated.Value(0),
      x: new Animated.Value(0),
      opacity: new Animated.Value(0)
    }))
  ).current;

  useEffect(() => {
    // Pulse animation for the flash icon
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true
        })
      ])
    ).start();

    // Flash animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(flashAnim, {
          toValue: 0.6,
          duration: 750,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true
        }),
        Animated.timing(flashAnim, {
          toValue: 1,
          duration: 750,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true
        })
      ])
    ).start();

    // Progress bar animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(progressAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false
        }),
        Animated.timing(progressAnim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: false
        })
      ])
    ).start();

    // Dots animation
    const dotAnimation = (anim, delay) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true
          })
        ])
      );

    dotAnimation(dot1Anim, 0).start();
    dotAnimation(dot2Anim, 200).start();
    dotAnimation(dot3Anim, 400).start();

    // Particle animations
    particleAnims.forEach((particle, index) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(index * 200),
          Animated.parallel([
            Animated.timing(particle.y, {
              toValue: -height,
              duration: 3000,
              easing: Easing.linear,
              useNativeDriver: true
            }),
            Animated.timing(particle.x, {
              toValue: (Math.random() - 0.5) * 100,
              duration: 3000,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true
            }),
            Animated.sequence([
              Animated.timing(particle.opacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true
              }),
              Animated.delay(2400),
              Animated.timing(particle.opacity, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
              })
            ])
          ]),
          Animated.timing(particle.y, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true
          }),
          Animated.timing(particle.x, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true
          })
        ])
      ).start();
    });
  }, []);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%']
  });

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      {/* Particles */}
      {particleAnims.map((particle, index) => (
        <Animated.View
          key={index}
          style={[
            styles.particle,
            {
              left: Math.random() * width,
              bottom: 0,
              transform: [
                { translateY: particle.y },
                { translateX: particle.x }
              ],
              opacity: particle.opacity
            }
          ]}
        />
      ))}

      <View style={styles.contentContainer}>
        {/* Flash Icon */}
        <Animated.View
          style={[
            styles.iconContainer,
            {
              transform: [{ scale: pulseAnim }],
              opacity: flashAnim
            }
          ]}
        >
          <Svg width={100} height={100} viewBox="0 0 100 100">
            <Path
              d="M55 10 L25 50 L45 50 L35 90 L70 45 L50 45 L65 10 Z"
              fill="white"
            />
          </Svg>
        </Animated.View>

        {/* Loading Text */}
        <Text style={styles.loadingText}>LOADING</Text>

        {/* Progress Bar */}
        <View style={styles.progressBar}>
          <Animated.View
            style={[
              styles.progressFill,
              { width: progressWidth }
            ]}
          />
        </View>

        {/* Animated Dots */}
        <View style={styles.dotsContainer}>
          <Animated.Text style={[styles.dot, { opacity: dot1Anim }]}>
            .
          </Animated.Text>
          <Animated.Text style={[styles.dot, { opacity: dot2Anim }]}>
            .
          </Animated.Text>
          <Animated.Text style={[styles.dot, { opacity: dot3Anim }]}>
            .
          </Animated.Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentContainer: {
    alignItems: 'center',
    zIndex: 1
  },
  iconContainer: {
    marginBottom: 30,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 10
  },
  loadingText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
    letterSpacing: 2,
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10
  },
  progressBar: {
    width: 300,
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5
  },
  dotsContainer: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 5
  },
  dot: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold'
  },
  particle: {
    position: 'absolute',
    width: 4,
    height: 4,
    backgroundColor: 'white',
    borderRadius: 2
  }
});

export default FlashLoadingScreen;