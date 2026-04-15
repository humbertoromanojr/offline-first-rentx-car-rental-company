import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
  width: 100%;
  height: 113px;
  justify-content: start;

  background-color: ${({ theme }) => theme.colors.header};
`;

export const MyCarsButton = styled(TouchableOpacity)`
  width: 60px;
  height: 60px;

  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.main};

  border-radius: 30px;

  position: absolute;
  bottom: 13px;
  right: 22px;

  box-shadow: 5px 5px 10px rgba(0, 0, 0, 1);
`;
