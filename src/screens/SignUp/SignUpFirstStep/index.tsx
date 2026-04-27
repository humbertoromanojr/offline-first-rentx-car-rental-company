import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import * as Yup from "yup";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { BackButton } from "@/components/BackButton";
import { Bullet } from "@/components/Bullet";

import { useTheme } from "styled-components/native";
import {
  Container,
  Header,
  Steps,
  Form,
  Footer,
  Title,
  SubTitle,
  FormTitle,
} from "./styles";

export function SignUpFirstStep() {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const theme = useTheme();

  const navigation = useNavigation();

  async function handleSigUp() {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required("Email obrigatório")
          .email("Digite um email válido"),
        password: Yup.string().required("Senha obrigatório"),
      });

      await schema.validate({ email, password });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert("Ops: ", error.message);
      } else {
        Alert.alert("Erro na autenticação: ", "Verifique as credenciais");
      }
    }
  }

  function handleBack() {
    navigation.goBack();
  }

  function handleLogin() {
    navigation.navigate("SignIn");
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
          />
          <Header>
            <BackButton onPress={handleBack} />
            <Steps>
              <Bullet />
              <Bullet />
            </Steps>
          </Header>

          <Title>Crie sua{"\n"}conta</Title>
          <SubTitle>Faça seu cadastro de{"\n"}forma rápida e fácil</SubTitle>

          <Form>
            <FormTitle>1. Dados</FormTitle>
            <Input
              iconName="user"
              placeholder="Name"
              placeholderTextColor={theme.colors.text_detail}
              keyboardType="default"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={setUser}
              value={user}
            />

            <Input
              iconName="mail"
              placeholder="E-mail"
              placeholderTextColor={theme.colors.text_detail}
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={setEmail}
              value={email}
            />

            <Input
              iconName="credit-card"
              placeholder="CNH"
              placeholderTextColor={theme.colors.text_detail}
              autoCorrect={false}
              keyboardType="numeric"
              autoCapitalize="none"
              onChangeText={setPassword}
              value={password}
            />
          </Form>

          <Footer>
            <Button
              title="Cadastrar"
              onPress={handleSigUp}
              enabled={true}
              loading={false}
            />

            <Button
              title="Já possuo conta"
              onPress={handleLogin}
              enabled={false}
              loading={false}
              color={theme.colors.background_secondary}
              light
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
