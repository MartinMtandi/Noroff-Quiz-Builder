import React from 'react';
import NoroffLogo from '@/assets/noroff-logo.png';

/**
 * Displays the Noroff logo centered with a bottom border.
 * Extracted to reuse or update independently of the header markup.
 */
const LogoBanner: React.FC = () => (
  <div className={styles.wrapper}>
    <img src={NoroffLogo} alt="Noroff logo" className={styles.logo} />
  </div>
);

const styles = {
  wrapper: "relative flex justify-center border-b p-6",
  logo: "h-8 relative z-10",
};

export default LogoBanner;
