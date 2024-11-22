import Playground from '../../components/Playground';
import { PlaygroundProvider } from '../../components/Playground/PlaygroundContext';

function App() {
  return (
    <PlaygroundProvider>
      <Playground />
    </PlaygroundProvider>
  );
}

export default App;
