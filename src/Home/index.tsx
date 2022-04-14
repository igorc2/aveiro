import React, { useEffect, useState } from "react";
import { FlatList } from 'react-native';

import { EXPEN } from '../utils/expenses';
import { MONTHS} from '../utils/months';

import { Card, CardProps } from '../components/Card';
import { Header, IMonth } from '../components/Header';
import { Text, VictoryPie, VictoryTooltip } from 'victory-native'

import { Container, Chart } from './styles';

export function Home() {
  const [selected, setSelected] = useState("");
  const [month, setMonth] = useState<IMonth>(MONTHS[0]);
  const [data, setData] = useState<CardProps[]>([])

  function handleCardOnPress(id: string) {
    setSelected(prev => prev === id ? "" : id);
  }

  function checkSelected(datum: { id: string}): boolean {
    return datum.id === selected;
  }

  function getMonth(monthId: string) : IMonth {

    console.log('MONTHS :>> ', MONTHS);
    console.log('monthId :>> ', monthId);
    return MONTHS.find( month => month.id === monthId) as IMonth;
  }

  useEffect(() => {
    setSelected("");
    setData(EXPEN.filter( x => month && x.month == month.id));
  }, [month])

  return (
    <Container>
      <Header
        onValueChange={(monthId) => setMonth(getMonth(monthId))}
        selectedValue={month.id}
      />
      <Chart>
        <Text>
          oi
          {JSON.stringify(month)}
        </Text>
        { data && 
          <VictoryPie
            data={data}
            x="label"
            y="value"
            padAngle={2}
            animate={{
              duration: 400,
              easing: 'cubicIn'
            }}
            style={{
              labels: {
                fill: '#e2dfe7'
              },
              data: {
                fillOpacity: ({datum}) => (datum.id === selected || selected === "") ? 1 : 0.2,
                stroke: ({datum}) => (datum.id === selected) ? datum.color : 'none',
                strokeOpacity: 0.3,
                strokeWidth: 5,
              }
            }}
            innerRadius={70}
            colorScale={data.map(expense => expense.color)}
            labelComponent={
              <VictoryTooltip
                renderInPortal={false}
                active={({datum}) => checkSelected(datum)}
                flyoutStyle={{
                  stroke: 0,
                  fill: ({datum}) => datum.color
                }}
              />
            }
          ></VictoryPie>
        }
      </Chart>

      <FlatList
        data={EXPEN.filter( x => x.month == month.id)}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Card
            data={item}
            selected={false}
            onPress={() => handleCardOnPress(item.id)}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
}
