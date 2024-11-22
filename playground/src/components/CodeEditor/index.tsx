import FileNameList from './FileNameList.tsx';
import Editor from './Editor.tsx';
import {} from '@dong-ui/animation';

export default function Index() {
  return (
    <div className="h-full">
      <FileNameList />
      <Editor />
    </div>
  );
}
