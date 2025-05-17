import { render, screen } from '@testing-library/react';
import { Project } from './project';
import { MemoryRouter } from 'react-router-dom';

jest.mock('axios');

describe('Project', () => {
  it('рендерит название проекта', () => {
    render(
      <MemoryRouter>
        <Project projectid="1" projectname="Тестовый проект" />
      </MemoryRouter>
    );
    expect(screen.getByText(/Тестовый проект/i)).toBeInTheDocument();
  });

  it('ссылка ведет на страницу /project/main', () => {
    render(
      <MemoryRouter>
        <Project projectid="1" projectname="Тестовый проект" />
      </MemoryRouter>
    );
    expect(screen.getByRole('link')).toHaveAttribute('href', '/project/main');
  });
});
