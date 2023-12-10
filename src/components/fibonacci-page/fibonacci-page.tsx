import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import style from './fibonacci.module.css';
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { getFibonacciNumbers } from "./fibonacci-page-utils";
import { MAX_19, MAX_LENGTH_2, MIN_1 } from "../../constants/numbers";

export const FibonacciPage: React.FC = () => {
  const [value, setValue] = React.useState('');
  const [arr, setArr] = React.useState<number[]>([]);
  const [loader, setLoader] = React.useState(false)
  const array = getFibonacciNumbers(Number(value));

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    generateFibonaccie()
  }

  const generateFibonaccie = async () => {
    setLoader(true)
    for (let i = 0; i <= array.length; i++) {
      await new Promise((resolve) => {
        setTimeout(resolve, SHORT_DELAY_IN_MS)
        setArr(array.slice(0, i + 1));
      })
    }
    setLoader(false)
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={style.form} onSubmit={(e: React.FormEvent<HTMLFormElement>) => onSubmit(e)}>
      <Input isLimitText type="number" maxLength={MAX_LENGTH_2} onChange={e => setValue(e.currentTarget.value)} value={value} max={MAX_19} />
        <Button type="submit" text="Рассчитать" disabled={(Number(value) >= MIN_1 && Number(value) <= MAX_19) ? false : true} isLoader={loader} />
      </form>
      <div className={style.containerUp}>
        <div className={style.containerDown}>
          {arr.map((item, index) => {
            return <Circle letter={item.toString()} key={index} index={index} />
          })}
        </div>
      </div>
    </SolutionLayout>
  );
};
