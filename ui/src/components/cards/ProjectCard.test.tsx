import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProjectCard from './ProjectCard';
jest.mock('../../hooks/useAuth', () => ({
  __esModule: true,
  default: () => ({ user: { _id: 'user123', email: 'test@example.com' } })
}));

const mockProject = {
  _id: '1',
  title: 'Test Project',
  description: 'Project description',
  version: 'v1.0',
  tag: 'React',
  link: 'https://example.com',
  timestamp: Date.now(),
};

describe('ProjectCard', () => {
  it('renders project title, description, version, and tag', () => {
    render(
      <ProjectCard
        project={mockProject}
        closeButton={jest.fn()}
        updateButton={jest.fn()}
        captionText="Caption"
      />
    );
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('Project description')).toBeInTheDocument();
    expect(screen.getByText('v1.0')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByTestId('caption')).toHaveTextContent('Caption');
  });

  it('renders without captionText', () => {
    render(
      <ProjectCard
        project={mockProject}
        closeButton={jest.fn()}
        updateButton={jest.fn()}
      />
    );
    expect(screen.getByTestId('caption')).toHaveTextContent('');
  });

  it('renders link with correct href', () => {
    render(
      <ProjectCard
        project={mockProject}
        closeButton={jest.fn()}
        updateButton={jest.fn()}
      />
    );
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', mockProject.link);
  });
});
