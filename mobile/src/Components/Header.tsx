import { Feather } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import colors from "tailwindcss/colors";
import Logo from '../../assets/logo.svg'
import {useNavigation} from '@react-navigation/native'

export const Header = () => {

  const {navigate} = useNavigation();


  return (
    <View className="w-full flex-row items-center justify-between">
      <Logo />
      <TouchableOpacity
        activeOpacity={0.7}
        className="flex-row h-11 px-4 border-violet-500 rounded-lg items-center border-2"
        onPress={() => navigate('new')}
      >
        <Feather name="plus" color={colors.violet[500]} size={30} />
        <Text className="text-white ml-3 font-semibold text-base">Novo</Text>
      </TouchableOpacity>
    </View>
  );
};
