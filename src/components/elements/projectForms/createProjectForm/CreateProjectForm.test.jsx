import { render, screen } from '@testing-library/react';
import CreateProjectForm from './CreateProjectForm';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

jest.mock('axios');

describe('CreateProjectForm', () => {
  it('рендерится только при show=true', () => {
    const store = mockStore({});

    const { rerender } = render(
      <Provider store={store}>
        <CreateProjectForm show={false} onClose={() => {}} />
      </Provider>
    );
    expect(screen.queryByText(/Новый проект/i)).toBeNull();

    rerender(
      <Provider store={store}>
        <CreateProjectForm show={true} onClose={() => {}} />
      </Provider>
    );
    expect(screen.getByText(/Новый проект/i)).toBeInTheDocument();
  });
});
