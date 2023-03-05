import { style } from '@vanilla-extract/css'

export const styles = {
  trigger: style({
    paddingLeft: '16px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'color 0.3s',
  }),

  logo: style({
    height: '50px',
    backgroundColor: '#fff',
  }),
}
