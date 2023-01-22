import { TouchableOpacity, View, Text, TouchableOpacityProps, Alert} from "react-native";
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'
import Animated , {ZoomIn, ZoomInDown, ZoomInEasyUp, ZoomInRotate, ZoomOutEasyUp, ZoomOutRotate} from "react-native-reanimated";

interface Props extends TouchableOpacityProps {
    checked?: boolean;
    title: string
    isPastDate?: boolean
}

export function CheckBox({ title, checked = false, isPastDate, ...rest }: Props) {


    function handleLongPress(){
        if(isPastDate){
            return Alert.alert('Você não pode completar um hábito passado.')
        }else{
            return Alert.alert('Complete seus hábitos.')
        }
    }

    return (
        <TouchableOpacity
            onLongPress={handleLongPress}
            activeOpacity={.7}
            className="flex-row mb-2 items-center"
            {...rest}>
            {checked ?
                <Animated.View
                 className="h-8 w-8 bg-green-500 rounded-lg justify-center items-center"
                 entering={ZoomInRotate}
                 exiting={ZoomOutRotate}>
                    <Feather
                        name="check"
                        size={20}
                        color={colors.white} />
                </Animated.View>
                :
                isPastDate ?
                    <View className="h-8 w-8 bg-zinc-900 rounded-lg justify-center items-center">
                        <Feather
                            name="slash"
                            size={20}
                            color={colors.white} />
                    </View>
                    : <View className="h-8 w-8 bg-zinc-900 rounded-lg" />

            }
            <Text className="text-white text-base ml-3 text-semibold">
                {title}
            </Text>

        </TouchableOpacity>
    )
}