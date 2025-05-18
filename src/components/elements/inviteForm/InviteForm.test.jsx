import { render, screen } from '@testing-library/react';
import InviteForm from './InviteForm';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

jest.mock('axios');

describe('InviteForm', () => {
  it('рендерится только при show=true', () => {
    const store = mockStore({});

    const { rerender } = render(
      <Provider store={store}>
        <InviteForm show={false} onClose={() => {}} />
      </Provider>
    );
    expect(screen.queryByText(/Новое приглашение/i)).toBeNull();

    rerender(
      <Provider store={store}>
        <InviteForm show={true} onClose={() => {}} />
      </Provider>
    );
    expect(screen.getByText(/Новое приглашение/i)).toBeInTheDocument();
  });
});
