import React, { useState, useRef } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from './queue.module.css'
import { Queue } from "./queue";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const QueuePage: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const queueRef = useRef(new Queue<number>(7));
  const [queueElements, setQueueElements] = useState<(number | null | string)[]>(Array(7).fill(''));
  const [highlightHead, setHighlightHead] = useState(false);
  const [highlightTail, setHighlightTail] = useState(false);
  const [loader, setLoader] = React.useState({
    add: false,
    remov: false,
  });
  const [disabled, setDisabled] = React.useState({
    add: false,
    remov: false,
    celect: false
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader({...loader, add: true})
    setDisabled({...disabled, remov: true, celect: true})
    queueRef.current.enqueue(Number(inputValue));
    setQueueElements([...queueRef.current.elements]);
    setInputValue('');
    setHighlightHead(true);
    setTimeout(() => {
      setHighlightHead(false);
      setLoader({...loader, add: false})
      setDisabled({...disabled, remov: false, celect: false})
    }, SHORT_DELAY_IN_MS);
  }

  return (
    <SolutionLayout title="Очередь">
      <form className={styles.form} onSubmit={(e) => {handleSubmit(e)}}>
        <div className={styles.content}>
          <Input extraClass={styles.input} maxLength={4} isLimitText value={inputValue} onChange={(e) => {
            e.preventDefault();
            setInputValue(e.currentTarget.value);
          }}/>
          <Button disabled={inputValue === '' || disabled.add ? true : false} type="submit" text="Очередь" isLoader={loader.add} />
          <Button disabled={queueRef.current.peak() === null  || disabled.remov ? true : false } text="Удалить"  isLoader={loader.remov} onClick={() => {
            setLoader({...loader, remov: true})
            setDisabled({...disabled, add: true, celect: true})
            setHighlightTail(true);
            setTimeout(() => {
              queueRef.current.dequeue();
              setQueueElements([...queueRef.current.elements]);
              setHighlightTail(false);
              setLoader({...loader, remov: false})
              setDisabled({...disabled, remov: false, celect: false})
            }, SHORT_DELAY_IN_MS);
          }}/>
        </div>
        <Button disabled={queueRef.current.peak() === null  || disabled.celect ? true : false} text="Очистить" onClick={() => {
          queueRef.current.clear();
          setQueueElements(Array(7).fill(''));
        }}/>
      </form>

      <div className={styles.bubble}>
        {queueElements.map((item, index) => (
          <Circle
            key={index}
            letter={item?.toString()}
            index={index}
            head={item !== '' && index === queueRef.current.headIndex ? 'head' : ''}
            tail={item !== '' && index === queueRef.current.tailIndex ? 'tail' : ''}
            state={
              (highlightHead && index === queueRef.current.tailIndex) ||
              (highlightTail && index === queueRef.current.headIndex)
                ? ElementStates.Changing
                : ElementStates.Default
            }
          />
        ))}
      </div>
    </SolutionLayout>
  );
};