import React, { useState, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";
import styles from './sorting.module.css';
import { DELAY_IN_MS } from "../../constants/delays";

interface ISortingPage {
  minLength?: number;
  maxLength?: number;
}

export const SortingPage: React.FC<ISortingPage> = ({minLength=3, maxLength=15}) => {
  const [elements, setElements] = useState<{ value: number; status: ElementStates }[]>([]);
  const [selectedType, setSelectedType] = useState<string>('select');
  const [loader, setLoader] = React.useState({
    ascending: false,
    descending: false,
  });
  const [disabled, setDisabled] = React.useState({
    ascending: false,
    descending: false,
    newArray: false
  })

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedType(e.target.value);
  };

  const generateRandomArray = () => {
    const length = Math.floor(Math.random() * maxLength) + minLength;
    const min = 0;
    const max = 100;
    const newArray = [];
    for (let i = 0; i < length; i++) {
      const value = Math.floor(Math.random() * (max - min + 1)) + min;
      newArray.push({ value, status: ElementStates.Default });
    }
    setElements(newArray);
  };

  useEffect(() => {
    generateRandomArray();
  }, []);

  const sortSelect = async (type: string) => {
    const array = [...elements];
    for (let i = 0; i < array.length; i++) {
      let min = i;
      array[min].status = ElementStates.Changing;
      setElements([...array]);
      await new Promise((resolve) => setTimeout(resolve, DELAY_IN_MS));
      for (let j = i + 1; j < array.length; j++) {
        array[j].status = ElementStates.Changing;
        setElements([...array]);
        await new Promise((resolve) => setTimeout(resolve, DELAY_IN_MS));
        if (
          (type === 'ascending' && array[j].value < array[min].value) ||
          (type === 'descending' && array[j].value > array[min].value)
        ) {
          min = j;
        }
        array[j].status = ElementStates.Default;
        setElements([...array]);
      }
      const temp = array[i];
      array[i] = array[min];
      array[min] = temp;
      array[min].status = ElementStates.Default;
      array[i].status = ElementStates.Modified;
      setElements([...array]);
    }
    setDisabled({...disabled,ascending: false, descending: false, newArray: false})
    setLoader({...loader, ascending: false, descending: false})
  };

  const sortBubble = async (type: string) => {
    const array = [...elements];
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - 1 - i; j++) {
        array[j].status = ElementStates.Changing;
        array[j + 1].status = ElementStates.Changing;
        setElements([...array]);
        await new Promise((resolve) => setTimeout(resolve, DELAY_IN_MS));
        if (
          (type === 'ascending' && array[j].value > array[j + 1].value) ||
          (type === 'descending' && array[j].value < array[j + 1].value)
        ) {
          const temp = array[j].value;
          array[j].value = array[j + 1].value;
          array[j + 1].value = temp;
        }
        array[j].status = ElementStates.Default;
        if (array[j + 1]) {
          array[j + 1].status = ElementStates.Default;
        }
        setElements([...array]);
      }
      array[array.length - i - 1].status = ElementStates.Modified;
      setElements([...array]);
    }
    setDisabled({...disabled,ascending: false, descending: false, newArray: false})
    setLoader({...loader, ascending: false, descending: false})
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.content}>
        <div className={styles.radio}>
          <RadioInput checked={selectedType === 'select'} label="Выбор" name="sortingType" value='select' onChange={handleRadioChange} />
          <RadioInput checked={selectedType === 'bubble'} label="Пузырёк" name="sortingType" value='bubble' onChange={handleRadioChange} />
        </div>
        <div className={styles.sorting}>
          <Button data-testid='ascending' isLoader={loader.ascending} disabled={disabled.ascending} sorting={Direction.Ascending} text="По возростанию" onClick={() => {
            setDisabled({...disabled, descending: true, newArray: true})
            setLoader({...loader, ascending: true})
            if (selectedType === 'select') {
              sortSelect('ascending');
            } else {
              sortBubble('ascending');
            }
          }} />
          <Button data-testid='descending' isLoader={loader.descending} disabled={disabled.descending} sorting={Direction.Descending} text="По убыванию" onClick={() => {
          setDisabled({...disabled, ascending: true, newArray: true})
          setLoader({...loader, descending: true})
          if (selectedType === 'select') {
              sortSelect('descending');
            } else {
              sortBubble('descending');
            }
          }} />
        </div>
        <Button disabled={disabled.newArray} text="Новый массив" onClick={() => { generateRandomArray(); }} />
      </div>
      <div className={styles.column}>
        {elements.map((item, index) => (
          <Column index={item.value} key={index} state={item.status} />
        ))}
      </div>
    </SolutionLayout>
  );
};
