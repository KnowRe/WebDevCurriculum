import Notepad from './js/components/Notepad.js'
import { LocalStorageLoader } from './js/Loader.js'

const notepad = new Notepad(document.querySelector(".app"), {
  loader: new LocalStorageLoader(),
});

