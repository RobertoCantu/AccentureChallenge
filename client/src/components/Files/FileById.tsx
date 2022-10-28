import React, {Component} from 'react';
import MyEditor from './editor'
import './editor.css'

class FileById extends Component{
    render() {
        return (
          <div className="ed">
            <MyEditor />
          </div>
        );
      }
}

export default FileById;