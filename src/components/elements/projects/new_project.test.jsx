import { render, screen } from '@testing-library/react';
import { NewProject } from './new_project';

jest.mock('axios');

describe('NewProject', () => {
  it('рендерит текст "Создать новый проект"', () => {
    render(<NewProject action={() => {}} />);
    expect(screen.getByText(/Создать новый проект/i)).toBeInTheDocument();
  });
});
