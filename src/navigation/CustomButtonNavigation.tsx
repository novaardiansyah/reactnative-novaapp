import { Text, View } from 'react-native';
import { NavigationContainer, CommonActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider, BottomNavigation } from 'react-native-paper';
import MaterialCommunityIcons from '@react-native-vector-icons/material-design-icons';
import HomeScreen from '@/screens/HomeScreen/HomeScreen';
import MeScreen from '@/screens/MeScreen';

const Tab = createBottomTabNavigator();

export default function CustomButtonNavigation() {
  return (
    <Provider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            animation: 'shift',
            headerShown: false,
          }}
          tabBar={({ navigation, state, descriptors, insets }) => (
            <BottomNavigation.Bar
              navigationState={state}
              safeAreaInsets={{ 
                top: insets.top,
                bottom: -30,
                left: insets.left,
                right: insets.right,
               }}
              shifting={false}
              onTabPress={({ route, preventDefault }) => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });

                if (event.defaultPrevented) {
                  preventDefault();
                } else {
                  navigation.dispatch({
                    ...CommonActions.navigate(route.name, route.params),
                    target: state.key,
                  });
                }
              }}
              renderIcon={({ route, focused, color }) =>
                descriptors[route.key].options.tabBarIcon?.({
                  focused,
                  color,
                  size: 24,
                }) || null
              }
              renderLabel={({ route, focused, color }) => {
                const { options } = descriptors[route.key];
                const label =
                  typeof options.tabBarLabel === 'string'
                    ? options.tabBarLabel
                    : typeof options.title === 'string'
                    ? options.title
                    : route.name;

                return (
                  <Text style={{ color, fontSize: 11, fontWeight: focused ? 'bold' : 'normal', alignSelf: 'center', marginTop: -13 }}>
                    {label}
                  </Text>
                );
              }}
              getLabelText={({ route }) => {
                const { options } = descriptors[route.key];
                const label =
                  typeof options.tabBarLabel === 'string'
                    ? options.tabBarLabel
                    : typeof options.title === 'string'
                    ? options.title
                    : route.name;

                return label;
              }}
              activeColor="#6690ff"
              inactiveColor="#8e8e93"
              style={{
                backgroundColor: '#fff',
                borderTopWidth: 0,
                elevation: 0,
                shadowColor: 'transparent',
              }}
              activeIndicatorStyle={{
                backgroundColor: 'transparent',
              }}
            />
          )}>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home-outline" color={color} size={18} />
              )
            }}
          />
          <Tab.Screen
            name="Saya"
            component={MeScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="account-outline" color={color} size={18} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}