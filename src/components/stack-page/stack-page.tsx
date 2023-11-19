import React, { useState, useRef, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from './stack.module.css';
import { Circle } from "../ui/circle/circle";
import { Stack } from "./stack";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { MAX_LENGTH_4 } from "../../constants/numbers";

export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const stackRef = useRef(new Stack<number>());
  const [stackElements, setStackElements] = useState<number[]>([]);
  const [highlightColor, setHighlightColor] = useState<boolean>(false);
  const [loader, setLoader] = React.useState({
    add: false,
    remov: false,
  });
  const [disabled, setDisabled] = React.useState({
    add: false,
    remov: false,
    celect: false
  })

  useEffect(() => {
    setStackElements([...stackRef.current.elements]);
  }, []);

  const handleAddClick = (e: React.FormEvent<HTMLFormElement>) => {
    setLoader({...loader, add: true})
    setDisabled({...disabled, remov: true, celect: true})
    e.preventDefault();
    setHighlightColor(true);
    stackRef.current.push(Number(inputValue));
    setStackElements([...stackRef.current.elements]);
    setInputValue('');
    setTimeout(() => {
      setHighlightColor(false);
      setLoader({...loader, add: false})
      setDisabled({...disabled, remov: false, celect: false})
    }, SHORT_DELAY_IN_MS);
  };

  return (
    <SolutionLayout title="Стек">
      <form className={styles.content} onSubmit={(e) => {
        if (inputValue !== '') {
          handleAddClick(e);
        } else {
          e.preventDefault();
        }
      }}>
        <div className={styles.container}>
        <Input isLimitText type="text" maxLength={MAX_LENGTH_4} value={inputValue} extraClass={styles.input} onChange={(e) => {
            setInputValue(e.currentTarget.value);
          }} />
          <Button disabled={inputValue === '' || disabled.add ? true : false} type="submit" text="Добавить" isLoader={loader.add}/>
          <Button disabled={stackElements.length === 0 || disabled.remov ? true : false} text="Удалить" isLoader={loader.remov} onClick={() => {
            setLoader({...loader, remov: true})
            setDisabled({...disabled, add: true, celect: true})
            stackRef.current.pop();
            setStackElements([...stackRef.current.elements]);
            setHighlightColor(true);
            setTimeout(() => {
              setHighlightColor(false);
              setLoader({...loader, remov: false})
              setDisabled({...disabled, remov: false, celect: false})
            }, SHORT_DELAY_IN_MS);
          }} />
        </div>
        <Button disabled={stackElements.length === 0 || disabled.celect ? true : false} text="Очистить" onClick={() => {
          stackRef.current.clear();
          setStackElements([...stackRef.current.elements]);
        }} />
      </form>
      <div className={styles.bubble}>
        {stackElements.map((item, index) => (
          <Circle
            key={index}
            letter={item.toString()}
            head={index === stackRef.current.size - 1 ? 'top' : null}
            tail={`${index}`}
            state={
              highlightColor && index === stackRef.current.size - 1
                ? ElementStates.Changing
                : ElementStates.Default
            }
          />
        ))}
      </div>
    </SolutionLayout>
  );
};