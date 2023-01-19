import dayjs from 'dayjs';
import { useRoute } from '@react-navigation/native'
import { View, ScrollView, Text } from 'react-native'
import { BackButton } from '../Components/BackButton';
import { ProgressBar } from '../Components/Progressbar';
import { CheckBox } from '../Components/CheckBox';


interface Params {
    date: string;
}
export const Habit = (props: Params) => {

    const route = useRoute()
    const { date } = route.params as Params

    const parsedDate = dayjs(date);
    const dayOfWeek = parsedDate.format('dddd')
    const dayAndMonth = parsedDate.format('DD/MM')

    return (
        <View className='flex-1 bg-background px-8 pt-16'>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}>

                <BackButton />

                <Text className='mt-6 text-zinc-400 font-semibold txet-base lowercase'>
                    {dayOfWeek}
                </Text>
                <Text className='text-white font-extrabold text-3xl'>
                    {dayAndMonth}
                </Text>

                <ProgressBar progress={30}/>
                <View className='mt-6'>
                    <CheckBox title='beber agua' checked={false}/>
                    <CheckBox title='comer' checked={true}/>
                </View>
            </ScrollView>

        </View>
    )
}
