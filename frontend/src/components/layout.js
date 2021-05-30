import { theme as styles } from '../../../dashboard/tailwind.config';

export default function Layout({children}){
  return <div className={styles.container}>{children}</div>
}
