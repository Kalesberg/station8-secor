import React from 'react'

import styles from './fillSpace.module.scss'

export default ({ handleCloseMenus }) => <span className={styles.default} onMouseOver={handleCloseMenus} />
