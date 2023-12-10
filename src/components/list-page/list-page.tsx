import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './list.module.css'
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { LinkedList } from "./list";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { MAX_LENGTH_4 } from "../../constants/numbers";


interface ITmp {
  value: string;
  index: number | null;
  head: boolean;
}

export const ListPage: React.FC = () => {

  const [value, setValue] = React.useState('');
  const [inputIndex, setIndex] = React.useState('');
  const listPageRef = React.useRef(new LinkedList([0, 34, 8, 1]))
  const [listPageElement, setlistPageElement] = React.useState(listPageRef.current.toArray())
  const [tmp, setTmp] = React.useState<ITmp>({ value: '', index: null, head: true })
  const [highlighcolor, setHighlighColor] = React.useState(ElementStates.Default);
  const [counter, setCounter] = React.useState(-1);
  const [str, setStr] = React.useState('');
  const [disabled, setDisabled] = React.useState({
    addHead: false,
    addTail: false,
    deleteHead: false,
    deleteTail: false,
    addIndex: false,
    deleteIndex: false
  });
  const [buttonsLoader, setButtonsLoader] = React.useState({
    addHead: false,
    addTail: false,
    deleteHead: false,
    deleteTail: false,
    addIndex: false,
    deleteIndex: false
  });




  const addToHead = async () => {
    setStr('head')
    listPageRef.current.prepend(Number(value))
    setTmp({ value: value, index: 0, head: true })
    setButtonsLoader({ ...buttonsLoader, addHead: true })
    setDisabled({
      ...disabled,
      addTail: true,
      deleteHead: true,
      deleteTail: true,
      addIndex: true,
      deleteIndex: true
    })
    setTimeout(() => {
      setlistPageElement([...listPageRef.current.toArray()])
      setTmp({ value: '', index: 0, head: true })
      setValue('')
      setButtonsLoader({ ...buttonsLoader, addHead: false })
      setDisabled({
        ...disabled,
        addTail: false,
        deleteHead: false,
        deleteTail: false,
        addIndex: false,
        deleteIndex: false
      })
    }, SHORT_DELAY_IN_MS)

    await setTimeout(() => {
      setHighlighColor(ElementStates.Modified)

      setTimeout(() => {
        setHighlighColor(ElementStates.Default)
      }, SHORT_DELAY_IN_MS)

    }, SHORT_DELAY_IN_MS)

  }

  const addToTail = async () => {
    setStr('tail')
    listPageRef.current.append(Number(value))
    setTmp({ value: value, index: listPageRef.current.size - 2, head: true })
    setButtonsLoader({ ...buttonsLoader, addTail: true })
    setDisabled({
      ...disabled, addHead: true,
      deleteHead: true,
      deleteTail: true,
      addIndex: true,
      deleteIndex: true
    })
    await setTimeout(() => {
      setlistPageElement([...listPageRef.current.toArray()])
      setTmp({ value: '', index: listPageRef.current.size - 1, head: true })
      setValue('')
      setButtonsLoader({ ...buttonsLoader, addTail: false })
      setDisabled({
        ...disabled, addHead: false,
        deleteHead: false,
        deleteTail: false,
        addIndex: false,
        deleteIndex: false
      })
      setValue('')
    }, SHORT_DELAY_IN_MS)

    await setTimeout(() => {
      setHighlighColor(ElementStates.Modified)
      setTimeout(() => {
        setHighlighColor(ElementStates.Default)
      }, SHORT_DELAY_IN_MS)
    }, SHORT_DELAY_IN_MS)
  }


  const deleteFromHead = async () => {
    listPageRef.current.deleteHead()
    setTmp({ value: '', index: 0, head: false })
    setButtonsLoader({ ...buttonsLoader, deleteHead: true })
    setDisabled({
      ...disabled, addHead: true,
      addTail: true,
      deleteTail: true,
      addIndex: true,
      deleteIndex: true
    })
    await setTimeout(() => {
      setlistPageElement([...listPageRef.current.toArray()]);
      setTmp({ value: '', index: null, head: false })
      setButtonsLoader({ ...buttonsLoader, deleteHead: false })
      setDisabled({
        ...disabled, addHead: false,
        addTail: false,
        deleteTail: false,
        addIndex: false,
        deleteIndex: false
      })
      setValue('')
    }, SHORT_DELAY_IN_MS)

  }

  const removeFromTail = async () => {
    listPageRef.current.deleteTail()
    setTmp({ value: '', index: listPageRef.current.size, head: false })
    setButtonsLoader({ ...buttonsLoader, deleteTail: true })
    setDisabled({
      ...disabled, addHead: true,
      addTail: true,
      deleteHead: true,
      addIndex: true,
      deleteIndex: true
    })
    await setTimeout(() => {
      setlistPageElement([...listPageRef.current.toArray()])
      setTmp({ value: '', index: null, head: false })
      setButtonsLoader({ ...buttonsLoader, deleteTail: false })
      setDisabled({
        ...disabled, addHead: false,
        addTail: false,
        deleteHead: false,
        addIndex: false,
        deleteIndex: false
      })
      setValue('')
    }, SHORT_DELAY_IN_MS)

  }

  const addByIndex = async () => {
    setStr('index')
    const index = Number(inputIndex)
    listPageRef.current.addByIndex(Number(value), Number(index));
    setButtonsLoader({ ...buttonsLoader, addIndex: true })
    setDisabled({
      ...disabled, addHead: true,
      addTail: true,
      deleteHead: true,
      deleteTail: true,
      deleteIndex: true
    })
    for (let i = 0; i <= index; i++) {
      await new Promise((res) => setTimeout(res, SHORT_DELAY_IN_MS))
      setTmp({ value: value, index: i, head: true })
      setHighlighColor(ElementStates.Changing)
      setCounter(i)
    }
    await new Promise((res) => setTimeout(res, SHORT_DELAY_IN_MS))
    setCounter(-1)
    setStr('')
    setHighlighColor(ElementStates.Modified);
    setTimeout(() => {
      setHighlighColor(ElementStates.Default);
    }, SHORT_DELAY_IN_MS);

    setlistPageElement([...listPageRef.current.toArray()])
    setTmp({ value: '', index: index, head: true })
    setButtonsLoader({ ...buttonsLoader, addIndex: false })
    setDisabled({
      ...disabled, addHead: false,
      addTail: false,
      deleteHead: false,
      deleteTail: false,
      deleteIndex: false
    })
    setValue('')
    setIndex('')


  }

  const deleteByIndex = async () => {
    setStr('index')
    const index = Number(inputIndex);
    listPageRef.current.deleteByIndex(Number(index));
    setButtonsLoader({ ...buttonsLoader, deleteIndex: true })
    setDisabled({
      ...disabled, addHead: true,
      addTail: true,
      addIndex: true,
      deleteHead: true,
      deleteTail: true
    })
    for (let i = 0; i <= index; i++) {
      await new Promise((res) => setTimeout(res, SHORT_DELAY_IN_MS))
      setTmp({ value: value, index: i, head: true })
      setHighlighColor(ElementStates.Changing)
      setCounter(i)
    }
    await new Promise((res) => setTimeout(res, SHORT_DELAY_IN_MS))
    setTmp({ value: '', index: index, head: false })
    await new Promise((res) => setTimeout(res, SHORT_DELAY_IN_MS))
    setlistPageElement([...listPageRef.current.toArray()])
    setTmp({ value: '', index: null, head: true })
    setCounter(-1)
    setStr('')
    setHighlighColor(ElementStates.Modified);
    setTimeout(() => {
      setHighlighColor(ElementStates.Default);
    }, SHORT_DELAY_IN_MS);
    setButtonsLoader({ ...buttonsLoader, deleteIndex: false })
    setDisabled({
      ...disabled, addHead: false,
      addTail: false,
      addIndex: false,
      deleteHead: false,
      deleteTail: false
    })
    setValue('')
    setIndex('')
  }

  const inputValueDisabled = buttonsLoader.addHead || buttonsLoader.addTail || buttonsLoader.addIndex || buttonsLoader.deleteIndex || buttonsLoader.deleteHead || buttonsLoader.deleteTail

  const inputIndexDisabled = buttonsLoader.addHead || buttonsLoader.addTail || buttonsLoader.addIndex || buttonsLoader.deleteIndex || buttonsLoader.deleteHead || buttonsLoader.deleteTail

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.container}>
        <form className={styles.enter_value}>
        <Input disabled={inputValueDisabled} isLimitText type="text" maxLength={MAX_LENGTH_4} extraClass={styles.input} placeholder="Введите значение" value={value} onChange={(e) => {setValue(e.currentTarget.value)}} />
          <div className={styles.buttons_value}>
            <Button extraClass={styles.button_value} isLoader={buttonsLoader.addHead} disabled={value === '' ? true : disabled.addHead} onClick={() => {
              addToHead()
            }} text="Добавить в head" />
            <Button extraClass={styles.button_value} isLoader={buttonsLoader.addTail} disabled={value === '' ? true : disabled.addTail} text="Добавить в tail" onClick={() => {
              addToTail()
            }} />
            <Button extraClass={styles.button_value} isLoader={buttonsLoader.deleteHead} disabled={disabled.deleteHead} text="Удалить из head" onClick={() => {
              deleteFromHead()
            }} />
            <Button extraClass={styles.button_value} isLoader={buttonsLoader.deleteTail} disabled={disabled.deleteTail} text="Удалить из tail" onClick={() => {
              removeFromTail()
            }} />
          </div>
        </form>
        <form className={styles.enter_index}>
          <Input disabled={inputIndexDisabled} type="number" extraClass={styles.input} placeholder="Введите индекс" onChange={(e) => {
            e.preventDefault();
            setIndex(e.currentTarget.value)
          }} value={inputIndex} />
          <div className={styles.buttons_index}>
            <Button extraClass={styles.button_index} isLoader={buttonsLoader.addIndex} disabled={value === '' || inputIndex === '' || Number(inputIndex) > listPageRef.current.getSize() ? true : disabled.addIndex} text="Добавить по индексу" onClick={() => {
              addByIndex()
            }} />
            <Button extraClass={styles.button_index} isLoader={buttonsLoader.deleteIndex} disabled={inputIndex === ''  || Number(inputIndex) > listPageRef.current.getSize() ? true : disabled.deleteIndex} text="Удалить по индексу" onClick={() => {
              deleteByIndex()
            }} />
          </div>
        </form>
      </div>
      <div className={styles.bubble}>
        {listPageElement.map((item, index) => {
          return (
            <div className={styles.list} key={index}>
              <Circle
                letter={!tmp.head && !tmp.value && index === tmp.index ? '' : item.toString()}
                head={tmp.head && tmp.value && index === tmp.index
                  ? (<Circle letter={tmp.value} isSmall state={ElementStates.Changing} />)
                  : index === 0 ? 'head' : null}
                tail={!tmp.head && !tmp.value && index === tmp.index
                  ? (<Circle letter={item.toString()} isSmall state={ElementStates.Changing} />)
                  : index === listPageElement.length - 1
                    ? 'tail'
                    : null}
                index={index}
                state={index < counter ? highlighcolor : index === tmp.index && str !== 'index' ? highlighcolor : ElementStates.Default} />
              {index !== listPageElement.length - 1 ? <ArrowIcon /> : null}
            </div>
          )
        })}
      </div>
    </SolutionLayout>
  );
};
