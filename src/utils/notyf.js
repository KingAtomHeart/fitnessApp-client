import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; 

const notyf = new Notyf({
  duration: 4000,
  position: { x: 'right', y: 'top' },
  types: [
    {
      type: 'error',
      background: 'red',
      icon: {
        className: 'material-icons',
        tagName: 'i',
        text: 'error',
      },
    },
    {
      type: 'success',
      background: 'green',
      icon: {
        className: 'material-icons',
        tagName: 'i',
        text: 'check_circle',
      },
    },
  ],
});

export default notyf;