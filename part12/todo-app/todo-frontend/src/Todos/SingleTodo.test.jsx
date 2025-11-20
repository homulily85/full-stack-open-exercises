import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import SingleTodo from './SingleTodo.jsx'

const todo = {
  text: 'dsdasdasdasd',
  done: true,
}

const onClickDelete = vi.fn()
const onClickComplete = vi.fn()

describe('<SingleTodo/>', () => {
  beforeEach(() => {
    render(<SingleTodo todo={todo} onClickDelete={onClickDelete}
                       onClickComplete={onClickComplete}/>)
  })

  test(
    'display a single todo',
    () => {

      const todoText = screen.getByText(
        `${todo.text}`,
        { exact: false })
      expect(todoText).toBeVisible()

      const todoDone = screen.getByText(`This todo is done`,
        { exact: false })
      expect(todoDone).toBeVisible()
    }
  )
})
