import { Text, View, ScrollView } from "react-native";
import { DAY_SIZE, HabitDay } from "../Components/HabitDay";
import { Header } from "../Components/Header";
import { generageDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning.ts"
import { useNavigation } from '@react-navigation/native';



const weekDays = [
    "D",
    "S",
    "T",
    "Q",
    "Q",
    "S",
    "S"
]

const datesFromYearStart = generageDatesFromYearBeginning()
const minimumSummaryDatesSizez = 18 * 5
const amountOfDaysToFill = minimumSummaryDatesSizez - datesFromYearStart.length

export function Home() {


    const {navigate} = useNavigation()

    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <Header />

            <View className="flex-row mt-6 mb-2">

                {weekDays.map((day, i) => (
                    <Text
                        key={`${day}-${i}`}
                        className='text-zinc-400 text-xl font-bold text-center mx-1'
                        style={{ width: DAY_SIZE }}>

                        {day}
                    </Text>
                ))
                }
            </View>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}>
                <View className="flex-row flex-wrap">
                    {
                        datesFromYearStart.map(date => (
                            <HabitDay
                                key={date.toISOString()}
                                onPress={() => navigate('habit',{date:date.toISOString()})} />
                        ))
                    }
                    {
                        amountOfDaysToFill > 0 &&
                        Array.from({ length: amountOfDaysToFill })
                            .map((_, i) => (
                                <View
                                    key={i}
                                    className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                                    style={{ width: DAY_SIZE, height: DAY_SIZE }}
                                />
                            ))
                    }
                </View>
            </ScrollView>



        </View>
    )
}