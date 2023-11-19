import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from '../../types/element-states'
import style from "./string.module.css";
import { DELAY_IN_MS } from "../../constants/delays";
import { MAX_LENGTH_11 } from "../../constants/numbers";

export const StringComponent: React.FC = () => {
  const [value, setValue] = React.useState('');
  const [arr, setArr] = React.useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [completed, setCompleted] = React.useState(false);
  const [loader, setLoader] = React.useState(false)

  const nextStep = () => {
    if (currentIndex < Math.floor(arr.length / 2)) {
      const copiedArray = [...arr];
      const temp = copiedArray[currentIndex];
      copiedArray[currentIndex] = copiedArray[arr.length - 1 - currentIndex];
      copiedArray[arr.length - 1 - currentIndex] = temp;
      setLoader(true)
      setArr(copiedArray);
      setCurrentIndex(currentIndex + 1);
    } else {
      setCompleted(true)
      setLoader(false)
    }
  };

  React.useEffect(() => {
    if (currentIndex <= Math.floor(arr.length / 2)) {
      const timeoutId = setTimeout(() => {
        nextStep();
      }, DELAY_IN_MS);
      return () => clearTimeout(timeoutId);
    }
  }, [currentIndex, arr]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const arr = value.split('');
    setArr(arr);
    setValue('');
    setCurrentIndex(0);
    setCompleted(false)
  };

  const setState = (index: number) => {
    if (completed) {
      return ElementStates.Modified;
    } else if ((index === currentIndex || index === arr.length - 1 - currentIndex) && (currentIndex !== arr.length - 1 - currentIndex)) {
      return ElementStates.Changing;
    } else if ((index < currentIndex || index > arr.length - 1 - currentIndex)) {
      return ElementStates.Modified;
    } else if ((currentIndex === arr.length - 1 - currentIndex)) {
      return ElementStates.Modified;
    } else {
      return ElementStates.Default;
    }
  }

  return (
    <SolutionLayout title="Строка">
      <form className={style.form} onSubmit={e => onSubmit(e)}>
      <Input isLimitText type="text" onChange={e => setValue(e.currentTarget.value)} value={value} maxLength={MAX_LENGTH_11} />
        <Button text="Развернуть" type="submit" disabled={value === '' ? true : false} isLoader={loader} />
      </form>
      <div className={style.container}>
      {arr.map((item, index) => {
          return <Circle state={setState(index)} letter={item} key={index} />
      })}
      </div>
    </SolutionLayout>
  );
};