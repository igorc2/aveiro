import React from "react";
import { Picker } from '@react-native-picker/picker';

import { Container, Title } from './styles';

import { MONTHS } from '../../utils/months';

// export type MonthsProps = "Janeiro" | "Fevereiro" | "Março";
export interface IMonth {
  label: string
  id: string
}

type Props = {
  selectedValue: string;
  onValueChange: (value: string) => void;
}

export function Header({ selectedValue, onValueChange }: Props) {
  return (
    <Container>
      <Title>{JSON.stringify(selectedValue)}</Title>

      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue: string) => onValueChange(itemValue)}
        style={{
          backgroundColor: '#FFF',
          height: 50,
          flex: 1,
          marginLeft: 50
        }}
      >
        {
          MONTHS.map(item => (
            <Picker.Item
              key={item.id}
              label={item.label}
              value={item.id}
            />
          ))
        }
      </Picker>
    </Container>
  );
}
