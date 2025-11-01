import React from 'react';
import NoroffLogo from '@/assets/noroff-logo.png';

/**
 * Displays the Noroff logo centered with a bottom border.
 * Extracted to reuse or update independently of the header markup.
 */
const LogoBanner: React.FC = () => (
  <div className="relative flex justify-center border-b p-6">
    <img src={NoroffLogo} alt="Noroff logo" className="h-8 relative z-10" />
  </div>
);

export default LogoBanner;
