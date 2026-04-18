import React from "react";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import {
  Calendar as CustomCalendar,
  LocaleConfig,
  DateData,
} from "react-native-calendars";

import { generateInterval } from "./generateInterval";
import { ptBR } from "./LocaleConfig";

LocaleConfig.locales["pt-br"] = ptBR;
LocaleConfig.defaultLocale = "pt-br";

interface MarkedDateProps {
  [date: string]: {
    color: string;
    textColor: string;
    disabled?: boolean;
    disableTouchEvents?: boolean;
  };
}

interface DayProps {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
}

interface CalendarProps {
  markedDates: MarkedDateProps;
  onDayPress: (date: DateData) => void;
}

function Calendar({ markedDates, onDayPress }: CalendarProps) {
  const theme = useTheme();

  return (
    <CustomCalendar
      renderArrow={(direction) => (
        <Feather
          size={24}
          color={theme.colors.textHeader}
          name={direction == "left" ? "chevron-left" : "chevron-right"}
        />
      )}
      headerStyle={{
        backgroundColor: theme.colors.background_secondary,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.text_detail,
        paddingBottom: 5,
        marginBottom: 5,
      }}
      theme={{
        textDayFontFamily: theme.fonts.primary_400,
        textDayHeaderFontFamily: theme.fonts.primary_500,
        textDayHeaderFontSize: 12,
        textMonthFontFamily: theme.fonts.secondary_600,
        textMonthFontSize: 20,
        monthTextColor: theme.colors.titleBlack,
        arrowStyle: { marginHorizontal: -15 },
      }}
      firstDay={1}
      minDate={String(new Date())}
      markingType="period"
      markedDates={markedDates}
      onDayPress={onDayPress}
    />
  );
}

export { Calendar, MarkedDateProps, DayProps, generateInterval };
