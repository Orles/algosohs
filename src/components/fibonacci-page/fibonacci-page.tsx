import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import style from './fibonacci.module.css';
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { getFibonacciNumbers } from "./fibonacci-page-utils";

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
    // let array: number[] = [1]
    // await new Promise((resolve) => {
    //   setTimeout(resolve, SHORT_DELAY_IN_MS)
    //   setArr([...array])
    //   setLoader(true)
    // })
    // array.push(1)
    // await new Promise((resolve) => {
    //   setTimeout(resolve, SHORT_DELAY_IN_MS)
    //   setArr([...array])
    // })
    // for (let i = 2; i <= size; i++) {
    //   array.push(array[i - 2] + array[i - 1])
    //   await new Promise((resolve) => {
    //     setTimeout(resolve, SHORT_DELAY_IN_MS)
    //     setArr([...array])
    //   })
    // }
    // setLoader(false)
    setLoader(true)
    for (let i = 0; i <= array.length; i++) {
      await new Promise((resolve) => {
        setTimeout(resolve, SHORT_DELAY_IN_MS)
        setArr(array.slice(0, i + 1));
      })
    }
    setLoader(false)
  }

  const TITLE = "Последовательность Фибоначчи";
  const FORM_CLASSNAME = style.form;
  const FORM_ONSUBMIT = (e: React.FormEvent<HTMLFormElement>) => onSubmit(e);
  const INPUT_PROPS = {
    isLimitText: true,
    type: "number",
    maxLength: 2,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value),
    value: value,
    max: 19
  };

  return (
    <SolutionLayout title={TITLE}>
      <form className={FORM_CLASSNAME} onSubmit={FORM_ONSUBMIT}>
        <Input {...INPUT_PROPS}></Input>
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
