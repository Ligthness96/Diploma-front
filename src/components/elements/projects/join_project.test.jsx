import { render, screen } from '@testing-library/react';
import { JoinProject } from './join_project';

jest.mock('axios');

describe('JoinProject', () => {
  it('рендерит текст "Присоединиться к проекту"', () => {
    render(<JoinProject action={() => {}} />);
    expect(screen.getByText(/Присоединиться к проекту/i)).toBeInTheDocument();
  });
});
