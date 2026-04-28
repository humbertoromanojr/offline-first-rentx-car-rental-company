import React, { useEffect, useState } from "react";
import { StatusBar, Text } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { api } from "@/services/api";
import { CarDTO } from "@/dtos/CarDTO";
import { useTheme } from "styled-components/native";

import { Car } from "@/components/Car";
import { Loading } from "@/components/Loading";

import { Container, Header, TotalCars, CarList, MyCarsButton } from "./styles";

import Logo from "@/assets/logo.svg";

export function Profile() {
  const navigation = useNavigation();
  const theme = useTheme();

  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get("/cars");
        setCars(response.data);
      } catch (error) {
        console.log("== fetchCars ==> ", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, []);

  function handleCarDetails(car: CarDTO) {
    navigation.navigate("CarDetails", { car });
  }

  function handleMyCars() {
    navigation.navigate("MyCars");
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <Logo width={RFValue(108)} height={RFValue(14)} />
        <TotalCars>Total de 12 carros</TotalCars>
      </Header>

      {loading ? (
        <Loading />
      ) : (
        <CarList
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}

      <MyCarsButton onPress={handleMyCars}>
        <Ionicons name="car-sport" size={38} color={theme.colors.shape} />
      </MyCarsButton>
    </Container>
  );
}
