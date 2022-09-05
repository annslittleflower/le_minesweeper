import styles from './button.module.css'

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  children: React.ReactNode
}

export const Button = ({ children, ...rest }: ButtonProps) => {
  return (
    <button className={styles.button} {...rest}>{children}</button>
  )
}