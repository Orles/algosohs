import { BrowserRouter} from "react-router-dom";
import { StringComponent } from "./string";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { DELAY_IN_MS } from "../../constants/delays";

describe('Тестирование алгоритма разворота строки', () => {
    it('Корректно разворачивает строку с чётным количеством символов', async () => {
        render(<StringComponent />, { wrapper: BrowserRouter });
        const input = screen.getByPlaceholderText('Введите текст');
        const button = screen.getByTestId('button');
        fireEvent.change(input, { target: { value: '9874' } });
        fireEvent.click(button);
        await waitFor(() => {
            expect(screen.getAllByTestId('circle')[0]).toHaveTextContent('4')
        }, { timeout: DELAY_IN_MS })
        await waitFor(() => {
            expect(screen.getAllByTestId('circle')[1]).toHaveTextContent('7')
        }, { timeout: DELAY_IN_MS })
        await waitFor(() => {
            expect(screen.getAllByTestId('circle')[2]).toHaveTextContent('8')
        }, { timeout: DELAY_IN_MS })
        await waitFor(() => {
            expect(screen.getAllByTestId('circle')[3]).toHaveTextContent('9')
        }, { timeout: DELAY_IN_MS })
    });
    it('Корректно разворачивает строку с нечетным количеством символов', async () => {
        render(<StringComponent />, { wrapper: BrowserRouter });
        const input = screen.getByPlaceholderText('Введите текст');
        const button = screen.getByTestId('button');
        fireEvent.change(input, { target: { value: '897' } });
        fireEvent.click(button);
        await waitFor(() => {
            expect(screen.getAllByTestId('circle')[0]).toHaveTextContent('7')
        }, { timeout: DELAY_IN_MS })
        await waitFor(() => {
            expect(screen.getAllByTestId('circle')[1]).toHaveTextContent('9')
        }, { timeout: DELAY_IN_MS })
        await waitFor(() => {
            expect(screen.getAllByTestId('circle')[2]).toHaveTextContent('8')
        }, { timeout: DELAY_IN_MS })
    })
    it('Корректно разворачивает строку с одним символом', () => {
        render(<StringComponent />, { wrapper: BrowserRouter });
        const input = screen.getByPlaceholderText('Введите текст');
        const button = screen.getByTestId('button');
        fireEvent.change(input, { target: { value: '9' } });
        fireEvent.click(button);
        expect(screen.getAllByTestId('circle')[0]).toHaveTextContent('9')
    })
    it('Корректно разворачивает пустую строку', () => {
        render(<StringComponent />, { wrapper: BrowserRouter });
        const input = screen.getByPlaceholderText('Введите текст');
        fireEvent.change(input, { target: { value: '' } });
        expect(screen.getByTestId('button')).toBeDisabled()
    })
});