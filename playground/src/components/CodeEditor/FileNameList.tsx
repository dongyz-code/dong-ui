import classNames from 'classnames';
import { usePlayground } from '../Playground/PlaygroundContext';

const FileNameList = () => {
  const { files, selectedFileName, setSelectedFileName } = usePlayground();

  const tabs = Object.keys(files);

  return (
    <div className="flex overflow-x-auto shadow-sm p-2 border-b border-g">
      {tabs.map((tab) => (
        <div
          className={classNames('mr-4 cursor-pointer', {
            'text-primary': tab === selectedFileName,
            'border-b-2': tab === selectedFileName,
            'border-primary': tab === selectedFileName,
          })}
          key={tab}
          onClick={() => setSelectedFileName(tab)}
        >
          {tab}
        </div>
      ))}
    </div>
  );
};

export default FileNameList;
