import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Swiper from 'react-native-swiper'
import { useRef, useState } from "react";
import { introduction } from "@/constants";
import { Image } from "react-native";
import CustomButton from "@/components/CustomButton";

const Introduction = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === introduction.length - 1;

  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-white">
      <TouchableOpacity onPress={() => {
          router.replace('/(auth)/sign-up')
          }}
          className="w-full flex justify-end items-end p-5"
      >
        <Text className="text-black text-md font-JakartaBold">Skip</Text>
      </TouchableOpacity>

          <Swiper 
          ref={swiperRef}
          loop={false}
          dot={<View className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full"/>}
          activeDot={<View className="w-[32px] h-[4px] mx-1 bg-primary-600 rounded-full"/>}
          onIndexChanged={(index) => setActiveIndex(index)}
          >
            {introduction.map((item) => (
                <View key={item.id} className="flex items-center justify0center p-5">

                  <Image 
                    source={item.image}
                    className="w-full h-[300px]"
                    resizeMode="contain"
                  />
                  <View className="flex flex-row items-center justify-center w-full mt-10">
                    <Text className="text-black text-3xl font-bold mx-10 text-center">
                      {item.title}
                      </Text>
                  </View>
                  <Text className="text-lg font-JakartaSemiBold text-center text-[#858585] mx-10 mt-3">{item.description}</Text>
                </View>
            ))}
          </Swiper>

          <View className="w-full px-5">
            <CustomButton 
                title={isLastSlide ? 'Get Started' : 'Next'}
                onPress={() => isLastSlide ? router.replace('/(auth)/sign-up') : swiperRef.current?.scrollBy(1)}
                className="mt-10"
            />
          </View>
    </SafeAreaView>
  );
};

export default Introduction