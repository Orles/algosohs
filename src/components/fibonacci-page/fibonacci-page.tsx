import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import style from './fibonacci.module.css';

export const FibonacciPage: React.FC = () => {
  const [value, setValue] = React.useState('');
  const [arr, setArr] = React.useState<number[]>([]);
  const [loader, setLoader] = React.useState(false)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    generateFibonaccie(Number(value))
  }

  const generateFibonaccie = async (size: number) => {
    let array: number[] = [1]
    await new Promise((resolve) => {
      setTimeout(resolve, 500)
      setArr([...array])
      setLoader(true)
    })
    array.push(1)
    await new Promise((resolve) => {
      setTimeout(resolve, 500)
      setArr([...array])
    })
    for (let i = 2; i <= size; i++) {
      array.push(array[i - 2] + array[i - 1])
      await new Promise((resolve) => {
        setTimeout(resolve, 500)
        setArr([...array])
      })
    }
    setLoader(false)
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={style.form} onSubmit={e => onSubmit(e)}>
        <Input isLimitText type="number" maxLength={2} onChange={e => setValue(e.currentTarget.value)} value={value} max={19}></Input>
        <Button type="submit" text="Рассчитать" disabled={(Number(value) >= 1 && Number(value) <= 19) ? false : true} isLoader={loader} />
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
