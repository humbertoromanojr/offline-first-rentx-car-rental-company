import React, { useState } from "react";
import {
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Yup from "yup";

import { api } from "@/services/api";

import { Button } from "@/components/Button";
import { PasswordInput } from "@/components/PasswordInput";
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

interface Params {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  };
}

export function SignUpSecondStep() {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const navigation = useNavigation();
  const theme = useTheme();
  const route = useRoute();

  const { user } = route.params as Params;

  function handleBack() {
    navigation.goBack();
  }

  async function handleRegister() {
    try {
      const schema = Yup.object().shape({
        password: Yup.string().required("Senha obrigatório"),
        passwordConfirm: Yup.string().required("Confirme a senha obrigatório"),
      });
      await schema.validate({ password, passwordConfirm });

      if (password != passwordConfirm) {
        return Alert.alert("As senhas não são iguais");
      }

      await api
        .post("/users", {
          name: user.name,
          email: user.email,
          driver_license: user.driverLicense,
          password,
        })
        .then(() => {
          // send params to API and register
          navigation.navigate("Confirmation", {
            nextScreenRoute: "SignIn",
            title: "Conta criada!",
            message: `Agora é só fazer login\ne aproveitar`,
          });
        });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert("Ops: ", error.message);
      } else {
        Alert.alert("Erro ao cadastrar: ", "Verifique as credenciais");
      }
    }
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
            <FormTitle>2. Senha</FormTitle>
            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              placeholderTextColor={theme.colors.text_detail}
              keyboardType="default"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={setPassword}
              value={password}
            />

            <PasswordInput
              iconName="lock"
              placeholder="Repetir senha"
              placeholderTextColor={theme.colors.text_detail}
              keyboardType="default"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            />
          </Form>

          <Footer>
            <Button
              title="Cadastrar"
              onPress={handleRegister}
              color={theme.colors.success}
              enabled={true}
              loading={false}
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
