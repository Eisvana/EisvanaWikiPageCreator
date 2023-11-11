import type { ElementFunctions } from '../../types/elements';
import { addMoon, autoWater } from './planet';

const planetElementFunctions: ElementFunctions = [
  {
    element: 'addMoonButton',
    handler: 'click',
    func: function () {
      addMoon(this as unknown as HTMLButtonElement);
    },
  },
  {
    element: 'terrainInput',
    func: () => autoWater(),
  },
];

export default planetElementFunctions;
