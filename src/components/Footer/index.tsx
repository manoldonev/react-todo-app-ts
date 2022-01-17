import { BottomNavigation } from './BottomNavigation';
import { CtaButton } from '../CtaButton';

const Footer = (): JSX.Element => {
  return (
    <>
      <CtaButton className="fixed z-10 md:bottom-8 bottom-24 right-6" />
      <BottomNavigation className="fixed inset-x-0 bottom-0" />
    </>
  );
};

export { Footer };
