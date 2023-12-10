import { render, screen, fireEvent } from "@testing-library/react";
import renderer from 'react-test-renderer'
import { Button } from "./button";

describe('Тест кнопки', () => {
    it('кнопка с текстом', () => {
        const button = renderer.create(<Button text="text" />)
        expect(button).toMatchSnapshot()
    })
    it('кнопка без текста', () => {
        const button = renderer.create(<Button />)
        expect(button).toMatchSnapshot()
    })
    it('заблокированная кнопка', () => {
        const button = renderer.create(<Button disabled={true} />)
        expect(button).toMatchSnapshot()
    })
    it('кнопка с индикацией загрузки', () => {
        const button = renderer.create(<Button isLoader={true} />)
        expect(button).toMatchSnapshot()
    })
    it('Корректность вызова колбека при клике на кнопку', () => {
        const click = jest.fn();
        render(<Button text="button" onClick={click} />)
        const button = screen.getByText("button");
        fireEvent.click(button)
        expect(click).toHaveBeenCalled()
    })
})