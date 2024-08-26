import { render } from '@testing-library/react'
import Page from '../../src/app/comments/page'
 
it('renders comments unchanged', () => {
  const { container } = render(<Page />)
  expect(container).toMatchSnapshot()
})