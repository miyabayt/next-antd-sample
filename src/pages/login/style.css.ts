import { style } from '@vanilla-extract/css'

export const styles = {
  form: style({
    position: 'absolute',
    top: '50%',
    left: '50%',
    margin: '-220px 0 0 -220px',
    width: '440px',
    height: '400px',
    padding: '36px',
    boxShadow: '0 0 100px rgba(0, 0, 0, 0.08)',
    border: '1px solid #f0f0f0',
    borderRadius: '4px',
  }),

  logo: style({
    fontSize: '1.6em',
    textAlign: 'center',
    cursor: 'pointer',
    marginBottom: '24px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
}
