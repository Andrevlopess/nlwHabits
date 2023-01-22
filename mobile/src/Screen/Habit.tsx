import dayjs from 'dayjs';
import { useRoute, useFocusEffect } from '@react-navigation/native'
import { View, ScrollView, Text, Alert } from 'react-native'
import { BackButton } from '../Components/BackButton';
import { ProgressBar } from '../Components/Progressbar';
import { CheckBox } from '../Components/CheckBox';
import { useEffect, useState } from 'react';
import { Loading } from '../Components/Loading';
import { api } from '../lib/axios';
import { generateProgressPercentage } from '../utils/generate-progress-percentage';
import { HabitEmpty } from '../Components/HabitsEmpty';
import clsx from 'clsx';


interface Params {
    date: string;
}

interface DayInfoProps {
    completed: string[];
    possibleHabits: {
        id: string;
        title: string;
    }[]
}

export const Habit = (props: Params) => {

    const [loading, setLoading] = useState(true)
    const [dayInfo, setDayInfo] = useState<DayInfoProps | null>(null)
    const [completedHabits, setCompeletedHabits] = useState<string[]>([])

    const route = useRoute()
    const { date } = route.params as Params

    const parsedDate = dayjs(date);

    const isPastDate = parsedDate.endOf('day').isBefore(new Date())

    const dayOfWeek = parsedDate.format('dddd')
    const dayAndMonth = parsedDate.format('DD/MM')

    const habitsProgress = dayInfo?.possibleHabits.length ?
        generateProgressPercentage(dayInfo.possibleHabits.length, completedHabits.length) : 0

    async function fetch() {
        try {

            setLoading(true)

            const response = await api.get('day', { params: { date } })
            setDayInfo(response.data)
            setCompeletedHabits(response.data.completedHabits)

        } catch (error) {
            Alert.alert("Eita!", "Não foi possivel carregar as informações do hábito")

        } finally {
            setLoading(false)
        }
    }

    async function handleToggleHabit(id: string) {

        try {

            await api.patch(`/habits/${id}/toggle`);

            if (completedHabits.includes(id)) {
                setCompeletedHabits(prev => prev.filter(habit => habit !== id))
            } else {
                setCompeletedHabits(prev => [...prev, id])
            }
        } catch (error) {
            Alert.alert("Não foi possivel mudar o estado do Hábito.")
        }


    }

    useEffect(() => { fetch() }, [])

    if (loading) {
        return <Loading />
    }

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

                <ProgressBar progress={habitsProgress} />
                <View className={clsx('mt-6', {
                    ["opacity-50"]: isPastDate && dayInfo?.possibleHabits.length
                })}>
                    {dayInfo?.possibleHabits.length ?
                        dayInfo?.possibleHabits.map(habit =>
                            <CheckBox
                                key={habit.id}
                                title={habit.title}
                                checked={completedHabits.includes(habit.id)}
                                onPress={() => handleToggleHabit(habit.id)}
                                isPastDate={isPastDate}
                                disabled={isPastDate}
                            />
                        )
                        : <HabitEmpty />


                    }
                </View>
            </ScrollView>

        </View>
    )
}
