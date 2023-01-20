import { Text, View, ScrollView, Alert } from "react-native";
import { DAY_SIZE, HabitDay } from "../Components/HabitDay";
import { Header } from "../Components/Header";
import { generageDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning.ts"
import { useNavigation } from '@react-navigation/native';
import { api } from "../lib/axios";
import { useState, useEffect } from "react";
import { Loading } from "../Components/Loading";
import dayjs from "dayjs";

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

type summaryProps = {
    id: string;
    date: string;
    amount: number;
    completed: number;
}[]

export function Home() {

    const [loading, setLoading] = useState(true)
    const [summary, setSummary] = useState<summaryProps | null>(null)

    const { navigate } = useNavigation()

    async function fecthData() {

        try {
            setLoading(true)

            const response = await api.get('/summary')
            console.log(response.data);
            setSummary(response.data)


        } catch (err) {
            console.log(err);
            Alert.alert('Não foi possivel carregar o sumário de hábitos.')

        } finally {
            setLoading(false)
        }

    }

    useEffect(() => {
        fecthData()
    }, [])

    if (loading) {
        return <Loading />
    }

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
                {summary &&
                    <View className="flex-row flex-wrap">
                        {
                            datesFromYearStart.map(date => {

                                const dayHabits = summary.find(day => {
                                    return dayjs(date).isSame(day.date, 'day')
                                })

                                return (
                                    <HabitDay
                                        key={date.toISOString()}
                                        date={date}
                                        amountOfHabits={dayHabits?.amount}
                                        amoutCompleted={dayHabits?.completed}

                                        onPress={() => navigate('habit', { date: date.toISOString() })} />
                                )
                            })
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
                    </View>}
            </ScrollView>



        </View>
    )
}