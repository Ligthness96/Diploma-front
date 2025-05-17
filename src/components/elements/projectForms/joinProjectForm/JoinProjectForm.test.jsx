import { render, screen } from '@testing-library/react';
import JoinProjectForm from './JoinProjectForm';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

jest.mock('axios');

describe('JoinProjectForm', () => {
  it('рендерится только при show=true', () => {
    const store = mockStore({});

    const { rerender } = render(
      <Provider store={store}>
        <JoinProjectForm show={false} onClose={() => {}} />
      </Provider>
    );
    expect(screen.queryByText(/Присоединиться к проекту/i)).toBeNull();

    rerender(
      <Provider store={store}>
        <JoinProjectForm show={true} onClose={() => {}} />
      </Provider>
    );
    expect(screen.getByText(/Присоединиться к проекту/i)).toBeInTheDocument();
  });
});
