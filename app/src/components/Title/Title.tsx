import React, { SFC } from 'react';

import styles from './Title.m.scss';

interface Props {
  label: string;
}

const Title: SFC<Props> = ({ label }) => (
  <h2 className={styles.title}>{label}</h2>
);

export default Title;
