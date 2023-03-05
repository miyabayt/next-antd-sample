import { style } from '@vanilla-extract/css'

export const styles = {
  form: style({
    position: 'absolute',
    top: '45%',
    left: '50%',
    margin: '-200px 0 0 -200px',
    width: '400px',
    height: '400px',
    padding: '36px',
    boxShadow: '0 0 100px rgba(0, 0, 0, 0.08)',
  }),

  logo: style({
    textAlign: 'center',
    cursor: 'pointer',
    marginBottom: '24px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
}
