import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Loader, { LoaderProps } from './Loader';

describe('Loader component', () => {
  it('renders the message', () => {
    render(<Loader message="Cargando..." />);
    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });

  it('renders the image with correct alt', () => {
    render(<Loader message="Cargando..." />);
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('alt', 'Cargando...');
  });

  it('renders with different messages', () => {
    render(<Loader message="Loading data" />);
    expect(screen.getByText('Loading data')).toBeInTheDocument();
    render(<Loader message="Espere por favor" />);
    expect(screen.getByText('Espere por favor')).toBeInTheDocument();
  });

  it('has correct DOM structure', () => {
    render(<Loader message="Test" />);
    const wrapper = screen.getByText('Test').parentElement?.parentElement;
    expect(wrapper).toHaveStyle('display: flex');
    expect(wrapper).toHaveStyle('align-items: center');
    expect(wrapper).toHaveStyle('justify-content: center');
  });
});
