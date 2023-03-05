import { style } from '@vanilla-extract/css'

export const styles = {
  header: style({
    padding: '0 16px',
    height: '50px',
    backgroundColor: '#fff',
    lineHeight: '50px',
    borderBottom: '1px solid #d9d9d9',
  }),

  trigger: style({
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'color 0.3s',
  }),
}
