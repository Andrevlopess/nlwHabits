
import { StatusBar } from 'react-native';
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold
} from '@expo-google-fonts/inter';
import {Loading} from './src/Components/Loading';
import { Home } from './src/Screen/Home';
import { Routes } from './src/Routes';

export default function App() {

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold
  })

  if(!fontsLoaded){
    return (<Loading/>)
  }

  

  return (
    <>
      <Routes/>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent/>
    </>
  );
}
