import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BlogForm from './BlogForm';

test('<BlogForm /> inputs have the same content as the submit function', () => {
  const addBlog = jest.fn();

  const component = render(
    <BlogForm createBlog={addBlog} />
  );

  const title = component.container.querySelector('#title');
  const author = component.container.querySelector('#author');
  const url = component.container.querySelector('#url');
  const form = component.container.querySelector('#form');

  fireEvent.change(title, {
    target: { value: 'Blogi' }
  });
  fireEvent.change(author, {
    target: { value: 'Kirjoittaja' }
  });
  fireEvent.change(url, {
    target: { value: 'www' }
  });
  fireEvent.submit(form);

  expect(addBlog.mock.calls).toHaveLength(1);
  expect(addBlog.mock.calls[0][0].title).toBe('Blogi');
  expect(addBlog.mock.calls[0][0].author).toBe('Kirjoittaja');
  expect(addBlog.mock.calls[0][0].url).toBe('www');
});