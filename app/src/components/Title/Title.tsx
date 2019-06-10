import React, { SFC } from 'react';

import styles from './Title.mscss';

interface Props {
  label: string;
  renderAfter?: () => React.ReactElement<any, any>;
}

const Title: SFC<Props> = ({ label, renderAfter }) => (
  <div className={styles.container} >
    <h2 className={styles.title}>{label}</h2>
    { renderAfter && renderAfter() }
  </div>
);

export default Title;
