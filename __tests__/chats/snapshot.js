import { render } from '@testing-library/react'
import Page from '../../src/app/chats/page'
 
it('renders chats unchanged', () => {
  const { container } = render(<Page />)
  expect(container).toMatchSnapshot()
})