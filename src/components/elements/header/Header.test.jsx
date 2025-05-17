import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

jest.mock('axios');

describe('Header', () => {
  it('показывает кнопки "Вход" и "Регистрация", если не авторизован', () => {
    const store = mockStore({ auth: { data: null } });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Вход/i)).toBeInTheDocument();
    expect(screen.getByText(/Регистрация/i)).toBeInTheDocument();
  });

  it('показывает кнопку "Выход", если авторизован', () => {
    const store = mockStore({ auth: { data: { name: 'test' } } });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Выход/i)).toBeInTheDocument();
  });
});
