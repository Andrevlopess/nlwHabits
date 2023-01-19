import { Text, View } from "react-native";
import { Header } from "../Components/Header";

export function Home() {
    return (
        <View className="flex-1 bg-background p-9 pt-16">
           <Header/>
        </View>
    )
}