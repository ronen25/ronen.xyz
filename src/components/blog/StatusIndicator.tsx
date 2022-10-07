import { isArray } from 'lodash';

interface Props {
  status: 'ok' | 'error';
  message: string;
}

const StatusIndicator = ({ status, message }: Props) => {
  const getBgStyle = () => {
    if (status === 'error') {
      return 'bg-amber-800 text-white';
    }

    return 'bg-slate-200';
  };

  // If it's an array we display it in <details>
  return status === 'error' ? (
    <details className={`cursor-pointer border rounded-md p-1 ${getBgStyle()}`}>
      <summary>Error(s)</summary>
      <div className='cursor-auto'>{message}</div>
    </details>
  ) : (
    <div className={`border rounded-md p-1 ${getBgStyle()}`}>{message}</div>
  );
};

export default StatusIndicator;
