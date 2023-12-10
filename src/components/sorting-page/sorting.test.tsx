import { SortingPage } from "./sorting-page";
import { BrowserRouter } from "react-router-dom";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { DELAY_IN_MS } from "../../constants/delays";

describe('Тестирование алгоритмов сортировки выбором и пузырьком', () => {
    it('Корректно сортирует пустой массив', () => {
        render(<SortingPage minLength={0} maxLength={0} />, { wrapper: BrowserRouter });
        const buttonDescending = screen.getByTestId('descending');
        const buttonAscending = screen.getByTestId('ascending');
        const columns = screen.queryAllByTestId('column')
        fireEvent.click(buttonAscending)
        expect(columns).toHaveLength(0)
        fireEvent.click(buttonDescending)
        expect(columns).toHaveLength(0)
    })
    it('Корректно сортирует массив из одного элемента', () => {
        render(<SortingPage minLength={1} maxLength={1} />, { wrapper: BrowserRouter });
        const buttonAscending = screen.getByTestId('ascending');
        const buttonDescending = screen.getByTestId('descending');
        const columns = screen.queryAllByTestId('column')
        fireEvent.click(buttonAscending)
        expect(columns).toHaveLength(1)
        fireEvent.click(buttonDescending)
        expect(columns).toHaveLength(1)
    })
    it('Корректно сортирует массив из нескольких элементов', async () => {
        render(<SortingPage minLength={2} maxLength={1} />, { wrapper: BrowserRouter });
        const buttonAscending = screen.getByTestId('ascending');
        const buttonDescending = screen.getByTestId('descending');
        fireEvent.click(buttonAscending)
        await waitFor(() => {
            const columns = screen.getAllByTestId('column');
            const arr = columns.map((column) => Number(column.textContent))
            const sortedArr = [...arr].sort((a, b) => a - b)
            waitFor(() => {
                expect(arr).toEqual(sortedArr)
            }, {timeout: DELAY_IN_MS} )
        })
        fireEvent.click(buttonDescending)
        await waitFor(() => {
            const columns = screen.getAllByTestId('column');
            const arr = columns.map((column) => Number(column.textContent))
            const sortedArr = [...arr].sort((a, b) => a + b)
            waitFor(() => {
                expect(arr).toEqual(sortedArr)
            }, {timeout: DELAY_IN_MS})
        })
    })
})