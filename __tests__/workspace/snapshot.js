import { render } from '@testing-library/react'
import Page from '../../src/app/workspace/page'
 
it('renders workspace unchanged', () => {
  const { container } = render(<Page />)
  expect(container).toMatchSnapshot()
})