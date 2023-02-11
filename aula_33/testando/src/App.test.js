import { render, screen } from '@testing-library/react';
import App from './App';
import React from "react";
import '@testing-library/jest-dom';

test('teste titulo', () => {
  render(<App/>);
  const testCase = document.querySelector('.App h1');
  expect(testCase).toHaveTextContent(/meu painel de controle/i);
});