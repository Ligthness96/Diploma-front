import { render, screen } from '@testing-library/react';
import Login from './Login';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

jest.mock('axios');

describe('Login', () => {
  it('рендерит поля логина и пароля', () => {
    const store = mockStore({ auth: { data: null } });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByLabelText(/Логин/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Пароль/i)).toBeInTheDocument();
  });

  it('рендерит кнопку "Войти"', () => {
    const store = mockStore({ auth: { data: null } });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/Войти/i)).toBeInTheDocument();
  });
});
