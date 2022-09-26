import { useMemo, useState } from 'react';

interface Props {
  initialMetadata?: { [_: string]: string };
}

const MetadataEditor = ({ initialMetadata }: Props) => {
  const [metadata, setMetadata] = useState<typeof initialMetadata>(initialMetadata ?? {});

  const onMetadataChange = (key: string, value: string) => {
    const changedMetadata = { ...metadata };
    changedMetadata[key] = value;

    setMetadata(changedMetadata);
  };

  const metadataEditors = useMemo(() => {
    return Object.entries(metadata ?? {}).map(([key, value]) => (
      <div key={key} className='flex flex-row space-x-4'>
        <div className='flex-1'>{key}</div>
        <input
          type='text'
          className='grow-[4] border'
          value={value}
          onChange={(event) => onMetadataChange(key, event.target.value)}
        ></input>
      </div>
    ));
  }, [metadata]);

  return (
    <div className='flex flex-col space-y-2 border rounded-md p-2 ml-4 mr-4'>
      {metadataEditors}
    </div>
  );
};

export default MetadataEditor;
