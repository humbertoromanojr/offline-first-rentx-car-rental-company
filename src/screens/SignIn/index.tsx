import React from "react";
import { StatusBar, Text } from "react-native";

import { Button } from "@/components/Button";

import { useTheme } from "styled-components/native";
import { Container, Header, Title, SubTitle, Footer } from "./styles";

export function SignIn() {
  const theme = useTheme();

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <Title>Estamos {"\n"}quase lá.</Title>
        <SubTitle>
          Faça seu login para começar{"\n"}uma experiência incrível.
        </SubTitle>
      </Header>

      <Footer>
        <Button
          title="Login"
          onPress={() => {}}
          disabled={false}
          loading={false}
        />

        <Button
          title="Criar conta gratuita"
          onPress={() => {}}
          disabled={false}
          loading={false}
          color={theme.colors.background_secondary}
          light
        />
      </Footer>
    </Container>
  );
}
