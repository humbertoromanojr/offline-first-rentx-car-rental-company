import { StatusBar, Text } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";

import { Car } from "@/components/Car";

import { Container, Header, TotalCars, CarList, MyCarsButton } from "./styles";

import Logo from "@/assets/logo.svg";

export function Home() {
  const navigation = useNavigation();

  const carData = {
    brand: "AUDI",
    name: "RS 5 Coupé",
    rent: {
      period: "AO DIA",
      price: 120,
    },
    thumbnail:
      "https://garagem360.com.br/wp-content/uploads/2023/06/Audi-RS5-Sportback-2023-2.jpg",
  };

  function handleCarDetails() {
    navigation.navigate("CarDetails");
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

      <CarList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
        keyExtractor={(item) => String(item)}
        renderItem={({ item }) => (
          <Car data={carData} onPress={handleCarDetails} />
        )}
      />
    </Container>
  );
}
