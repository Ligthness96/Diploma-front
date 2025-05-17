import { render, screen } from '@testing-library/react';
import Register from './Register';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

jest.mock('axios');

describe('Register', () => {
  it('рендерит все поля формы регистрации', () => {
    const store = mockStore({ auth: { data: null } });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByLabelText(/Имя/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Логин/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Пароль/i)).toBeInTheDocument();
    expect(screen.getByText(/Зарегестрироваться/i)).toBeInTheDocument();
  });
});
