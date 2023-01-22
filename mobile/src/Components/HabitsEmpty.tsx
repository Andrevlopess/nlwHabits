import { useNavigation } from '@react-navigation/native'
import { Text, TouchableOpacity, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'

export function HabitEmpty() {


    const { navigate, } = useNavigation()

    return (
        <View>
            <Text className='text-zinc-400 text-base'>
                Você ainda não está monitorando nenhum hábito
            </Text>
            <TouchableOpacity
                className="w-full h-14 flex-row items-center justify-center bg-violet-600 rounded-md mt-6"
                activeOpacity={0.7}
                onPress={() => navigate('new')}
            >
                <Feather
                    name="plus"
                    size={20}
                    color={colors.white}
                />

                <Text className="font-semibold text-base text-white ml-2">
                    Novo Habito
                </Text>
            </TouchableOpacity>
        </View>

    )
}