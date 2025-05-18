import { render, screen } from '@testing-library/react';
import { Task } from './task';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

jest.mock('axios');

describe('Task', () => {
  it('рендерит имя задачи', () => {
    const store = mockStore({});
    render(
      <Provider store={store}>
        <Task
          taskid="1"
          projectid="1"
          taskname="Тестовая задача"
          executor="user1"
          datestart="2024-01-01"
          dateend="2024-01-02"
          iscomplet={false}
        />
      </Provider>
    );
    expect(screen.getByText(/Тестовая задача/i)).toBeInTheDocument();
  });

  it('рендерит кнопку "Удалить"', () => {
    const store = mockStore({});
    render(
      <Provider store={store}>
        <Task
          taskid="1"
          projectid="1"
          taskname="Тестовая задача"
          executor="user1"
          datestart="2024-01-01"
          dateend="2024-01-02"
          iscomplet={false}
        />
      </Provider>
    );
    expect(screen.getByText(/Удалить/i)).toBeInTheDocument();
  });
});
