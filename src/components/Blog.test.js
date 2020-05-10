import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render,fireEvent } from '@testing-library/react';
import Blog from './Blog';

const blog = {
  author: 'Kirjailija',
  id: '5eae5fc9960d593d7c00119f',
  likes: 4,
  title: 'MunBlogi',
  url: 'www.jepujee',
  user: { blogs: ['5eae5fc9960d593d7c00119f'],
    id: '5eae5f8e960d593d7c00119e',
    name: 'kokeilija',
    username: 'kokeilu' }
};

const user = { name: 'kokeilija' };

test('renders content with blog author and title', () => {

  const component = render(
    <Blog blog={blog} />
  );

  expect(component.container).toHaveTextContent(
    'Kirjailija'
  );
  expect(component.container).toHaveTextContent(
    'MunBlogi'
  );
});

test('clicking the button opens view and includes url and likes', async () => {

  const component = render(
    <Blog blog={blog} user={user} />
  );

  const button = component.getByText('view');
  fireEvent.click(button);

  expect(component.container).toHaveTextContent(
    'www.jepujee'
  );
  expect(component.container).toHaveTextContent(
    '4'
  );
});

test('clicking the like button twice calls event handler twice', async () => {

  const mockHandler = jest.fn();

  const component = render(
    <Blog blog={blog} user={user} addLike={mockHandler} />
  );

  const viewButton = component.getByText('view');
  fireEvent.click(viewButton);

  const likeButton = component.getByText('like');
  fireEvent.click(likeButton);
  fireEvent.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});