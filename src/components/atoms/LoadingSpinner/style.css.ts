import { style } from '@vanilla-extract/css'

export const styles = {
  spinner: style({
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1200,
    backgroundColor: 'white',
  }),
}
