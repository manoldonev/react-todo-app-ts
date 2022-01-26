import { Todos } from './Todos';
import { CtaButton } from './CtaButton';

const Tasks = (): JSX.Element => {
  return (
    <>
      <Todos />
      <CtaButton className="fixed z-10 md:bottom-8 bottom-24 right-6" />
    </>
  );
};

export { Tasks };
