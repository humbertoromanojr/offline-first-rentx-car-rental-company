import React from "react";
import { useTheme } from "styled-components/native";
import { ActivityIndicator } from "react-native";

import { Container, Title } from "./styles";

interface Props {
  title: string;
  color?: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  light?: boolean;
}

export function Button({
  title,
  color,
  onPress,
  loading = false,
  disabled = true,
  light = false,
}: Props) {
  const theme = useTheme();

  return (
    <Container
      onPress={onPress}
      color={color ? color : theme.colors.main}
      disabled={disabled}
      style={{ opacity: disabled === false || loading === true ? 0.5 : 1 }}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors.shape} />
      ) : (
        <Title light={light}>{title}</Title>
      )}
    </Container>
  );
}
