import { style, globalStyle } from '@vanilla-extract/css'

export const styles = {
  errorPage: style({}),
}

// .errorPage h1
globalStyle(`${styles.errorPage} h1`, {
  fontSize: '2rem',
})
