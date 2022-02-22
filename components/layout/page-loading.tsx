import styles from '../../styles/page-loading.module.css';
import {useEffect} from 'react';

export const PageLoading = () => {
  useEffect(() => {
    document.body.style.pointerEvents = 'none';
    return () => {
      document.body.style.pointerEvents = 'all';
    };
  }, []);

  return (
    <>
      <div className={styles.opacity}/>
      <div className="pageLoader"/>
    </>);
};
