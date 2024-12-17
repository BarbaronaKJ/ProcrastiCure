import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NameVerificationScreen from './screens/NameVerificationScreen'; // example screen import

const Stack = createNativeStackNavigator();

function MyNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="NameVerification" component={NameVerificationScreen} />
      {/* Add other screens here */}
    </Stack.Navigator>
  );
}
